import { BungieMatches } from "./activities/activities";
import { BungieAPIResponse, BungieError, BungieResponse } from "./types";
import { BungieUser } from "./user/user";

/**
 * API request handler to pass requests to the Bungie API.
 * @param endpoint - the target enpoint to request
 * @returns
 */
export const bungieAPIFetch = async <T>(
  endpoint: string
): Promise<BungieAPIResponse<T>> => {
  const response = await fetch(
    `https://bungie.net/Platform/Destiny2/${endpoint}`,
    {
      headers: {
        "X-Api-Key": "7a4df634f00a42e79c67304a559812a0",
      },
    }
  );

  const json: BungieResponse<T> = await response.json();

  return handleErrors(json);
};

/**
 * Handle Bungie API errors.
 * @param response - the response from calling the bungie API
 * @returns - either a Response or an Error
 */
const handleErrors = <T>(response: BungieResponse<T>): BungieAPIResponse<T> => {
  const { Response, ErrorCode, ...rest } = response;

  if (ErrorCode !== 1 || Response === undefined) {
    return { Errors: { ErrorCode, ...rest } };
  }

  return { Response };
};

const BungieClient = {
  ...BungieUser,
  ...BungieMatches,
};

export default BungieClient;
