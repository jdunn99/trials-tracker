import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";

export const fetchOverview = async (value: string): Promise<any> => {
  const response = await fetch(
    `http://localhost:4000/destiny/overview/${value}`
  );
  const json = await response.json();
  return json;
};

export const handleOverviewSSG = async (
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

export const useOverviewQuery = () => {
  const { query } = useRouter();

  const membershipId = typeof query.id === "string" ? query.id : "";
  const path = typeof query.path === "string" ? query.path : "overview";

  const enabled = membershipId.length > 0 && path === "overview";

  // if it's undefined we ignore this condition so if it's undefined this is faslse

  return useQuery(
    ["overviewQuery", membershipId],
    () => fetchOverview(membershipId),
    {
      enabled,
    }
  );
};
