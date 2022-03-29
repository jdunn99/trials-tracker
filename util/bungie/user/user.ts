import axios from "axios";
import { bungieAPIFetch } from "../client";
import { BungieAPIResponse } from "../types";
import {
  LinkedProfile,
  Profile,
  TrialsProfileResponse,
  TrialsResponse,
} from "./types";

/**
 * Gets the membership type of a user.
 * @param membershipId - the ID of the user
 * @param code - might be unnecessary but gonna keep it just in case
 * @returns - either the code or errors
 */
const getMembershipType = async (
  membershipId: string | number,
  code?: number
): Promise<BungieAPIResponse<number>> => {
  if (!!code) return { Response: code };
  const { Response, Errors } = await bungieAPIFetch<LinkedProfile>(
    `-1/Profile/${membershipId}/LinkedProfiles/?getAllMemberships=false`
  );

  if (Errors) return { Errors };

  return { Response: Response!.profiles[0].membershipType };
};

const searchByGlobalNamePost = async (prefix: string) => {
  const result = await fetch(
    `https://bungie.net/Platform/User/Search/Prefix/${prefix}/0/`,
    {
      headers: {
        "X-Api-Key": process.env.API_KEY!,
      },
    }
  );
  const json = await result.json();
  return json;
};

/**
 * Returns the Trials response from the API
 * @param membershipId
 * @returns
 */
const getTrialsResponse = async (
  membershipId: string
): Promise<BungieAPIResponse<TrialsResponse>> => {
  try {
    return axios
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
      })
      .catch((e) => {
        throw {
          Errors: [
            {
              ErrorCode: 5,
              ErrorStatus: "Maintenance",
              ErrorMessage:
                "Destiny 2 is currently under maintenance. API is disabled.",
            },
          ],
        };
      });
  } catch (error) {
    return error as any;
  }
};

/**
 * Get stats for a user based on Trials of Osiris
 * @param membershipId - the id of the user
 * @returns
 */
const getTrialsProfile = async (
  membershipId: string
): Promise<BungieAPIResponse<TrialsProfileResponse>> => {
  try {
    const trialsProfile = await axios.get<TrialsProfileResponse>(
      `${process.env.TRIALS_PROFILE_ENDPOINT!}/${membershipId}`
    );

    if (trialsProfile.data === undefined) throw new Error();

    return { Response: trialsProfile.data };
  } catch (error) {
    return error as any;
  }
};

const getProfile = async <T>(
  membershipType: number,
  membershipId: string,
  components: number[]
): Promise<BungieAPIResponse<T>> => {
  try {
    const { Response, Errors } = await bungieAPIFetch<T>(
      `/${membershipType}/Profile/${membershipId}/?components=${components.join()}`
    );

    if (Errors) throw Errors;

    return { Response };
  } catch (error: any) {
    return error;
  }
};

export const BungieUser = {
  getMembershipType,
  getTrialsProfile,
  getProfile,
  getTrialsResponse,
  searchByGlobalNamePost,
};
