import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";
import { useRouterQuery } from "../hooks/router/useRouterQuery";
import { fetchOverview } from "./useOverviewQuery";

type Profile = {
  membershipId: string;
  membershipType: string;
  bungieName: string;
  status: string;
  platforms: number[];
  avatarUrl: string;
};

export const fetchProfile = async (value: string): Promise<Profile> => {
  console.log("fetching profile: ", value);
  const response = await fetch(
    `http://localhost:4000/destiny/profile/${value}`
  );
  const json = await response.json();
  return json;
};

export const handleProfileSSR = async (
  client: QueryClient,
  membershipId: string
): Promise<void> => {
  try {
    await client.prefetchQuery(["overviewQuery", membershipId], () =>
      fetchOverview(membershipId)
    );
  } catch (error) {
    console.log(error);
  }
};

export const useProfileQuery = () => {
  const { id: membershipId } = useRouterQuery(["id"]);

  return useQuery<Profile>(
    ["profileQuery", membershipId],
    () => fetchProfile(membershipId!),
    {
      enabled: !!membershipId && membershipId.length > 0,
    }
  );
};
