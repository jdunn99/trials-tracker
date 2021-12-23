import { useQuery } from "react-query";

const search = async (value: string): Promise<any> => {
  const response = await fetch(
    `http://localhost:4000/destiny/users/${encodeURIComponent(value)}`
  );
  const json = await response.json();
  return json.data;
};

export const useSearchQuery = (value: string) => {
  return useQuery(["searchQuery", value], () => search(value), {
    enabled: value.length > 0,
  });
};
