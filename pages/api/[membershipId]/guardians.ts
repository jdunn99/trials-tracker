import BungieClient from "../../../util/bungie/client";
import { CLASS_HASH } from "../../../util/bungie/types";
import perksHash from "../../../util/bungie/manifest/perks.json";
import talentsHash from "../../../util/bungie/manifest/talents.json";
import itemHash from "../../../util/bungie/manifest/inventory.json";
import { NextApiRequest, NextApiResponse } from "next";
import { STATS_HASH } from "../../../util/constants";

/**
 * Fetches user profile from Bungie API and returns desired data
 * @param membershipType
 * @param membershipId
 * @returns
 */
const getUserProfile = async (membershipType: number, membershipId: string) => {
  const { Response, Errors } = await BungieClient.getProfile<any>(
    membershipType,
    membershipId,
    [100, 200, 205, 302, 306]
  );

  if (Errors) throw Errors;

  return Response;
};

const parsePerks = (perks: any[]) => {
  const filtered = perks.filter((data: any) => {
    const hashed = perksHash[data.perkHash as keyof typeof perksHash] as any;

    if (hashed === undefined) return false;

    return (
      data.isActive && hashed.displayProperties.name !== "Landfall" // temp fix to a weird bungie API bug
    );
  });

  return filtered.map((data: any) => {
    return perksHash[data.perkHash as keyof typeof perksHash].displayProperties;
  });
};

const parseSubclassInformation = (talentGrid: { [key: string]: any }) => {
  const perks: any[] = [];
  talentGrid.nodes.forEach((node: { [key: string]: any }) => {
    if (node.isActivated && !node.hidden)
      perks.push(
        talentsHash[talentGrid.talentGridHash as keyof typeof talentsHash][
          node.nodeIndex
        ].displayProperties
      );
  });
  return perks;
};

/**
 * Parse user profile and also determine the itemInstanceId of the user's
 * subclass for later use
 * @param profile
 * @returns
 */

/** TODO: Clean Up */
const parseUserProfile = (profile: any) => {
  return Object.values(profile.characters.data).map((character: any) => {
    return {
      characterId: character.characterId,
      backgroundImage: "https://bungie.net/" + character.emblemBackgroundPath,
      class: CLASS_HASH[character.classHash],
      race: "", // TODO: Race Hash conversion -> character.raceHash
      lightLevel: character.light,
      equipment: profile.characterEquipment.data[character.characterId].items
        .map((item: any) => {
          const hashed = itemHash[
            item.itemHash as keyof typeof itemHash
          ] as any;

          if (hashed === undefined) return null;

          let perks: any[] = [];
          if (hashed.itemTypeAndTierDisplayName.includes("Subclass")) {
            const talentGrid =
              profile.itemComponents.talentGrids.data[item.itemInstanceId];
            const isStasis = !!talentGrid;

            perks = !!isStasis
              ? parseSubclassInformation(
                  profile.itemComponents.talentGrids.data[item.itemInstanceId]
                )
              : [];
          } else {
            const hasPerks =
              !!profile.itemComponents.perks.data[item.itemInstanceId];
            if (hasPerks)
              perks = parsePerks(
                profile.itemComponents.perks.data[item.itemInstanceId].perks
              );
          }

          return {
            perks,
            itemHash: item.itemHash,
            ...hashed,
          };
        })
        .filter((item: any) => item !== null),
      stats: Object.keys(character.stats)
        .map((stat: any) => {
          return {
            value: character.stats[stat],
            ...STATS_HASH[stat],
          };
        })
        .filter((stat: any) => stat.name !== "Power"),
    };
  });
};

const getUserGuardians = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response: { [key: string]: any } = {};

    const { membershipId: _, ...rest } = req.query;
    const membershipId = req.query.membershipId as string;

    const { Response: membershipType } = await BungieClient.getMembershipType(
      membershipId,
      !!req.query.platform ? parseInt(req.query.platform.toString()) : undefined
    );

    const userProfile = await getUserProfile(membershipType!, membershipId);
    response.characters = parseUserProfile(userProfile);

    res.status(200).json({ Response: response });
  } catch (errors: any) {
    console.log(errors.toString() || JSON.stringify(errors));
    res.status(400).json({ Errors: errors });
  }
};

export default getUserGuardians;
