import { NextApiRequest, NextApiResponse } from "next";
import { bungieAPIFetch } from "../../../util/bungie/client";
import hash from "../../../util/bungie/manifest/hash.json";
import itemHash from "../../../util/bungie/manifest/inventory.json";

const getMatch = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;

    const postGameResponse = await bungieAPIFetch<any>(
      `Stats/PostGameCarnageReport/${id}`
    );

    const hashed =
      hash[
        postGameResponse.Response.activityDetails
          .referenceId as keyof typeof hash
      ];

    res.status(200).json({
      Response: {
        referenceId: postGameResponse.Response.activityDetails.referenceId,
        displayProperties: hashed.displayProperties,
        instanceId: id,
        characters: postGameResponse.Response.entries
          .map((entry: any) => {
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

            let displayName =
              entry.player.destinyUserInfo.bungieGlobalDisplayName;
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
              standing: entry.standing,
            };
          })
          .sort((a: any, b: any) => {
            return a.standing - b.standing;
          }),
      },
    });
  } catch (e: any) {
    res.status(400).json({ Errors: e.toString() });
  }
};
export default getMatch;
