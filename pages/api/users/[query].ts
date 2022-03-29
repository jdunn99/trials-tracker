import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import BungieClient from "../../../util/bungie/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const result = await BungieClient.searchByGlobalNamePost(query as string);

  res.status(200).json({ Response: result.Response.searchResults });
}
