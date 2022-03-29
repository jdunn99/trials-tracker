import { NextApiRequest, NextApiResponse } from "next";
import BungieClient from "../../../util/bungie/client";
import {
  ActiveCharacter,
  Stats,
  TrialsProfile,
} from "../../../util/bungie/user/types";
import hash from "../../../util/bungie/manifest/hash.json";
import itemHash from "../../../util/bungie/manifest/inventory.json";
import { ActivityReport } from "../../../util/bungie/activities/types";
import axios from "axios";

/**
 * Get the overall stats of a user from a Trials response in a parsed format
 * @param stats
 */
const parseOverallStats = (stats: Stats | undefined) => {
  return {
    assists: stats?.assists.value ?? 0,
    wins: stats?.activitiesWon.value ?? 0,
    deaths: stats?.deaths.value ?? 0,
    flawless: stats?.flawless.value ?? 0,
    kills: stats?.kills.value ?? 0,
    efficiency: stats?.efficiency.value ?? 0,
    matches: stats?.activitiesEntered.value ?? 0,
  };
};

const parseWeeklyStats = (stats: Stats | undefined, flawless: number) => {
  const matches = stats?.ActivitiesEntered.value ?? 0;
  const kills = stats?.kills.value ?? 0;
  const kd = stats?.kd.value ?? 0;
  const Wl = stats?.Wl.value ?? 0;
  const kad = stats?.kad.value ?? 0;

  const wins = matches * (Wl / 100) ?? 0;

  return {
    currentStats: {
      matches,
      kills,
      deaths: kills / kd,
      flawless,
      wins,
      losses: matches - wins,
      assists: (kills / kd) * kad - kills,
    },
  };
};

const parseActiveCharacter = (activeCharacter: ActiveCharacter) => {
  const subclass = activeCharacter.gear
    .filter((gear: any) => {
      return gear.isSubClass;
    })
    .map((subclass: any) => {
      return {
        imageUrl: subclass.metadata.imageUrl,
        hash: subclass.metadata.hash,
        name: subclass.metadata.name,
        path: subclass.metadata.path,
        perks: subclass.perks,
      };
    });

  const primaryWeapons = activeCharacter.gear.slice(0, 3);
  const exoticWeapons = activeCharacter.gear
    .slice(3, 7)
    .filter(
      (weapon: any) => weapon.metadata.subTitle.split(" ")[0] === "Exotic"
    );
  const parsedGear = [...primaryWeapons, ...exoticWeapons].map((gear: any) => {
    return {
      hash: gear.itemHash,
      name: gear.metadata.name,
      subTitle: gear.metadata.subTitle,
      imageUrl: gear.metadata.imageUrl,
      perks: gear.perks,
    };
  });

  return {
    avatarUrl: activeCharacter.metadata.emblemImage,
    subclass: subclass[0],
    weapons: parsedGear,
    character: {
      id: (activeCharacter as any).id,
      backgroundImage: activeCharacter.metadata.backgroundImage,
      lightLevel: activeCharacter.metadata.lightLevel,
      race: activeCharacter.metadata.race,
      class: activeCharacter.metadata.class,
    },
  };
};

const parseSeason = (season: Stats | null) => {
  return {
    kills: season?.kills.value ?? 0,
    deaths: season?.deaths.value ?? 0,
    assists: season?.assists.value ?? 0,
    wins: season?.activitiesWon.value ?? 0,
    losses: season?.activitiesLost.value ?? 0,
  };
};

const parsePostGameCarnageReport = (match: ActivityReport) => {
  const hashed =
    hash[match.activityDetails.referenceId.toString() as keyof typeof hash];

  return {
    bestGame: {
      referenceId: match.activityDetails.referenceId,
      displayProperties: hashed.displayProperties,
      instanceId: match.activityDetails.instanceId,
      characters: match.entries.map((entry) => {
        const bestWeapon = entry.extended.weapons
          ? entry.extended.weapons.reduce((a: any, b: any) =>
              a.values.uniqueWeaponKills.basic.value >
              b.values.uniqueWeaponKills.basic.value
                ? a
                : b
            )
          : null;

        const weapon = bestWeapon
          ? {
              information:
                itemHash[bestWeapon.referenceId as keyof typeof itemHash],
              kills: bestWeapon.values.uniqueWeaponKills.basic.value,
            }
          : null;

        let displayName = entry.player.destinyUserInfo.bungieGlobalDisplayName;
        if (displayName === "")
          displayName = entry.player.destinyUserInfo.displayName;
        return {
          characterId: entry.characterId,
          kills: entry.values.kills.basic.value,
          deaths: entry.values.deaths.basic.value,
          imageUrl: entry.player.destinyUserInfo.iconPath,
          displayName,
          membershipId: entry.player.destinyUserInfo.membershipId,
          membershipType: entry.player.destinyUserInfo.membershipType,
          weapon,
        };
      }),
    },
  };
};

const parseProfileData = (profile: TrialsProfile) => {
  const characters = Object.keys(profile.characters)
    .filter((character: string) => {
      return profile.characters[character].matches !== 0;
    })
    .map((character: string) => {
      return {
        ...profile.characters[character],
        characterId: character,
      };
    });

  const platforms = Object.keys((profile as any).displayNames).map((key) =>
    parseInt(key)
  );

  const weaponsStats = {
    data: profile.weapons.map((item) => {
      return {
        name: item.name,
        kills: item.kills,
        precisionKills: item.headshots,
        iconUrl: item.image,
        accuracy: (item.headshots / item.kills) * 100,
      };
    }),
  };

  return {
    membershipID: profile.membershipId,
    membershipType: profile.membershipType,
    bungieName: profile.bungieName,
    characters,
    platforms,
    weaponsStats,
  };
};

const getUserOverview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const membershipId = req.query.membershipId as string;
    // get the trials stats response
    const trialsResponse = await axios
      .get(`${process.env.TRIALS_RESPONSE_ENDPOINT}/${membershipId}`)
      .then(({ data }) => {
        console.log(data);
        if (data.errors)
          // const { data } = result;

          // handle trials api errors
          throw {
            Errors: data.errors.map((error: any) => {
              return {
                ErrorCode: 404,
                ErrorStatus: error.code,
                ErrorMessage: error.message,
              };
            }),
          };

        if (data === undefined || data.data === undefined) throw new Error();

        return { Response: data };
      });

    // since he handled errors earlier, data is always defined @ this point
    const data = trialsResponse.Response!.data!;

    // get destiny trials profile
    const trialsProfile = await BungieClient.getTrialsProfile(membershipId);
    if (trialsProfile.Errors) throw trialsProfile.Errors;

    const profileData = trialsProfile.Response!.results![0];

    // get the best game stats
    let bestGameReport: any = { bestGame: null };
    if (profileData.mostKills.length > 0) {
      const bestGameStats = await BungieClient.getPostGameCarnageReport(
        profileData.mostKills[0].instanceId
      );
      if (bestGameStats.Errors) throw bestGameStats.Errors;

      bestGameReport = parsePostGameCarnageReport(bestGameStats.Response!);
    }

    res.status(200).json({
      Response: {
        ...parseProfileData(profileData),
        ...parseOverallStats(data.overall?.stats),
        ...parseWeeklyStats(data.thisWeek?.stats, data.flawlessThisWeek),
        ...parseActiveCharacter(data.activeCharacter),
        season: parseSeason(data.season),
        ...bestGameReport,
        activties: data.matches.slice(0, 25),
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export default getUserOverview;
