import { useQuery } from "react-query";
import { SERVER_URL } from "../constants";

const search = async (value: string): Promise<any> => {
  const response = await fetch(
    `${SERVER_URL}/users/${encodeURIComponent(value)}`
  );
  const json = await response.json();
  return json.data;
};

export const useSearchQuery = (value: string) => {
  return useQuery(["searchQuery", value], () => search(value), {
    enabled: value.length > 0,
  });
};
