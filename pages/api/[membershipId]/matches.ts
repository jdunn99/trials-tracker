import hash from "../../../util/bungie/manifest/hash.json";
import { NextApiRequest, NextApiResponse } from "next";
import BungieClient, { bungieAPIFetch } from "../../../util/bungie/client";
import { CLASS_HASH } from "../../../util/bungie/types";
type Pagination = {
  page: number;
  count: number;
  class: "Titan" | "Hunter" | "Warlock";
};

type PaginatedCharacter = { [key: string]: Pagination };

type Destiny2GetCharacters = {
  characters: {
    data: {
      [key: string]: {
        membershipId: string;
        membershipTye: number;
        characterId: string;
        dateLastPlayed: string;
        minutesPlayedThisSession: number;
        minutesPlayedToal: number;
        light: number;
        stats: {
          [key: string]: number;
        };
        raceHash: number;
        genderHash: number;
        classHash: number;
        raceType: number;
        classType: number;
        genderType: number;
        emblemPath: string;
        emblemColor: {
          [key: string]: number;
        };
        levelProgression: {
          progressionHash: number;
          dailyProgress: number;
          dailyLimit: number;
          weeklyProgress: number;
          weeklyLimit: number;
          currentProgress: number;
          level: number;
          levelCap: number;
          stepIndex: number;
          progressToNextLevel: number;
          nextLevelAt: number;
        };
        baseCharacterLevel: number;
        percentToNextLevel: number;
      };
    };
  };
};

const getCharacters = async (
  paginationParams: any,
  id: string,
  platform: number
): Promise<PaginatedCharacter> => {
  const characters: PaginatedCharacter = {};
  const keys = Object.keys(paginationParams);

  if (keys.length === 0) {
    const { Response, Errors } =
      await BungieClient.getProfile<Destiny2GetCharacters>(platform, id, [200]);

    if (Errors) throw Errors;

    Object.keys(Response!.characters.data).forEach((key) => {
      characters[key] = {
        page: 0,
        count: 0,
        class: CLASS_HASH[Response!.characters.data[key].classHash].className,
      };
    });
  } else {
    keys.forEach((key) => {
      const parsed = paginationParams[key].split(",");

      characters[key] = {
        page: parseInt(parsed[0]),
        count: parseInt(parsed[1]),
        class: parsed[2],
      };
    });
  }
  return characters;
};

const getMatchesForCharacter = async (
  membershipType: number,
  membershipId: string,
  characterId: string,
  paginationData: Pagination
): Promise<any> => {
  try {
    const { Response } = await bungieAPIFetch<any>(
      `/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?mode=84&page=${
        paginationData.page
      }&count=${25 + paginationData.count}`
    );

    if (Response.activities === undefined) return null;

    let filteredMatches = Response.activities;

    if (paginationData.count !== 0)
      filteredMatches = filteredMatches.slice(paginationData.count);

    if (filteredMatches.length > 0) {
      const matches = filteredMatches.map((match: any) => {
        return {
          matchId: match.activityDetails.instanceId,
          period: match.period,
          displayProperties: {
            ...hash[match.activityDetails.referenceId as keyof typeof hash]
              .displayProperties,
          },
          kills: match.values.kills.basic.value,
          deaths: match.values.deaths.basic.value,
          killsDeathsRatio: match.values.killsDeathsRatio.basic.value,
          standing: match.values.standing.basic.value,
          character: characterId,
        };
      });
      return matches;
    }
  } catch (errors) {
    throw errors;
  }
};

const paginateResults = (
  matches: { [key: string]: any },
  characters: PaginatedCharacter
) => {
  console.log(characters);

  const temp = { ...characters };

  const filtered: any[] = Object.values(matches).filter(
    (match: any) => match !== null
  );

  // parse our 2d array into a single sorted array
  const paginatedResults: any[] = []
    .concat(...filtered)
    .sort((a: any, b: any) => {
      return new Date(b.period).getTime() - new Date(a.period).getTime();
    })
    .splice(0, 25);

  paginatedResults.forEach((match: any) => {
    const page = temp[match.character];
    console.log(page);
    if (page.count !== 0) {
      const result = (page.count + 1) % 25;
      if (result === 0) page.page++;
    }

    temp[match.character] = {
      page: page.page,
      count: (page.count + 1) % 25,
      class: characters[match.character].class,
    };
  });

  return { pages: temp, results: paginatedResults };
};

const getUserMatches = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // store the params to see if we are making a paginated request or not
    const { membershipId: _, ...rest } = req.query;
    const membershipId = req.query.membershipId as string;

    const paginationParams = rest;
    const matches: { [key: string]: any } = {};

    // get the platform from either the params or by the API
    const { Response: platform } = await BungieClient.getMembershipType(
      membershipId,
      !!paginationParams.platform
        ? parseInt(paginationParams.platform?.toString())
        : undefined
    );

    // don't need anymore and we need to parse the characters later
    if (!!paginationParams.platform) delete paginationParams.platform;

    const characters = await getCharacters(
      paginationParams,
      membershipId,
      platform!
    );

    for (const character of Object.keys(characters)) {
      const paginationData = characters[character];
      try {
        matches[character] = await getMatchesForCharacter(
          platform!,
          membershipId,
          character,
          paginationData
        );
      } catch (e) {
        throw e;
      }
    }

    const { pages, results } = paginateResults(matches, characters);

    res.status(200).json({
      Response: {
        matches: results,
      },
      pages,
    });
  } catch (error: any) {
    console.log(error.toString() || JSON.stringify(error));
    res.status(400).json({ Error: error });
  }
};

export default getUserMatches;
