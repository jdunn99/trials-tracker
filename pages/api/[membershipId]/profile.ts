import { NextApiRequest, NextApiResponse } from "next";
import BungieClient, { bungieAPIFetch } from "../../../util/bungie/client";

const calculateLastPlayed = (lastPlayed: string): string => {
  console.log(lastPlayed);
  const diff = new Date(
    new Date(Date.now()).getTime() - new Date(lastPlayed).getTime()
  );
  const years = diff.getUTCFullYear() - 1970;
  const months = diff.getUTCMonth();
  const days = diff.getUTCDate() - 1;

  console.log(diff);
  let parsed = "";

  if (years > 0) parsed += `${years}y `;
  if (months > 0) parsed += `${months}m `;
  if (days > 0) parsed += `${days}d `;
  else {
    const hours = diff.getUTCHours();
    const minutes = diff.getUTCMinutes();
    const seconds = diff.getUTCSeconds();

    if (hours > 0) parsed += `${hours}h `;
    if (minutes > 0) parsed += `${minutes}m `;
    if (seconds > 0) parsed += `${seconds}s `;
    else parsed += "now";
  }

  return "Last played " + (parsed += `ago`);
};

const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const membershipId = req.query.membershipId as string;

    const { Response: platform } = await BungieClient.getMembershipType(
      membershipId
    );

    if (platform === undefined) throw new Error("Something went wrong!");

    const { Response, Errors } = await BungieClient.getProfile<any>(
      platform,
      membershipId,
      [100, 200]
    );

    console.log(Response);
    if (Response === undefined || Errors)
      throw Errors ?? "Something went wrong!";

    const profile: any = {};
    profile.membershipId = membershipId;
    profile.membershipType = platform;

    const code =
      Response.profile.data.userInfo.bungieGlobalDisplayNameCode.toString();
    profile.bungieName =
      Response.profile.data.userInfo.bungieGlobalDisplayName +
      "#" +
      (code.length === 4 ? code : `0${code}`);

    const characters = Response.characters.data;

    profile.avatarUrl = (Object.values(characters) as any[]).reduce(
      (a: any, b: any) => {
        return new Date(a.dateLastPlayed).getTime() >
          new Date(b.dateLastPlayed).getTime()
          ? a
          : b;
      }
    ).emblemPath;

    const lastPlayed = calculateLastPlayed(
      Response.profile.data.dateLastPlayed
    );

    profile.status = lastPlayed;
    profile.platforms =
      Response.profile.data.userInfo.applicableMembershipTypes;

    res.status(200).json({ Response: profile });
  } catch (e: any) {
    res.status(400).json({ Errors: e.toString() });
  }
};

export default getProfile;
