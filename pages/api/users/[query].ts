import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import BungieClient from "../../../util/bungie/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const response = await axios.get(
    `${process.env.SEARCH_ENDPOINT}${encodeURIComponent(
      query.toString()
    )}&autocomplete=true`
  );

  res.status(200).json(response.data);
}
