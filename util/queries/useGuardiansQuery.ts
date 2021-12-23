import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";

const fetchGuardians = async (membershipId: string) => {
  console.log(membershipId);
  const response = await fetch(
    `http://localhost:4000/destiny/guardians/${membershipId}`
  );

  return await response.json();
};

export const handleGuardiansSSSG = async (
  client: QueryClient,
  membershipId: string
): Promise<void> => {
  try {
    await client.prefetchQuery(["matchesQuery", membershipId], () =>
      fetchGuardians(membershipId)
    );
  } catch (error) {
    console.log(error);
  }
};

export const useGuardiansQuery = () => {
  const { query } = useRouter();
  const membershipId = typeof query.id === "string" ? query.id : "";

  return useQuery(["guardiansQuery", membershipId], () =>
    fetchGuardians(membershipId)
  );
};
