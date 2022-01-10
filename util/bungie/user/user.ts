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

/**
 * Returns the Trials response from the API
 * @param membershipId
 * @returns
 */
const getTrialsResponse = async (
  membershipId: string
): Promise<BungieAPIResponse<TrialsResponse>> => {
  try {
    const { data } = await axios.get(
      `https://api.tracker.gg/api/v1/destiny-2/stats/trials/bungie/${membershipId}`
    );

    // handle trials api errors
    if (data.errors)
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
      `http://api.trialsofthenine.com/player/${membershipId}`
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
};
