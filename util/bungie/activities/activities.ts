import { bungieAPIFetch } from "../client";
import { BungieAPIResponse } from "../types";
import { ActivityReport, PostGameCarnageReport } from "./types";

const getPostGameCarnageReport = async (
  matchId: string
): Promise<BungieAPIResponse<ActivityReport>> => {
  const response = await bungieAPIFetch<PostGameCarnageReport>(
    `Stats/PostGameCarnageReport/${matchId}/`
  );

  if (response.Errors) return response;

  return { Response: response.Response };
};

export const BungieMatches = {
  getPostGameCarnageReport,
};
