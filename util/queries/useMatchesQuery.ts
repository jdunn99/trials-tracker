import { useRouter } from "next/router";
import { QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { MatchesResponse } from "../types";

export type Page =
  | {
      [key: string]: {
        page: number;
        count: number;
        class: string;
      };
    }
  | undefined;

export type MatchKey = {
  membershipId: string;
  pages: Page;
};

const fetchMatches = async (
  membershipId: string,
  pageParams: Page | boolean
) => {
  // build the query params from the page results
  if (pageParams === false)
    return {
      items: {
        matches: [],
      },
      page: false,
    };

  let pageQuery = "";
  if (pageParams !== undefined && typeof pageParams === "object") {
    pageQuery += "?";
    const keys = Object.keys(pageParams);
    keys.map((key, index) => {
      pageQuery += `${key}=${pageParams[key].page},${pageParams[key].count}`;
      if (index < keys.length - 1) pageQuery += "&";
    });
  }

  const response = await fetch(
    `http://localhost:4000/destiny/matches/${membershipId}/${pageQuery}`
  );

  console.log(response);

  const json = await response.json();
  return {
    items: json.Response,
    page: json.pages,
  };
};

export const handleMatchesSSG = async (
  client: QueryClient,
  membershipId: string
): Promise<void> => {
  try {
    await client.prefetchInfiniteQuery(["matchesQuery", membershipId], () =>
      fetchMatches(membershipId, undefined)
    );
  } catch (error) {
    console.log(error);
  }
};

export const useMatchesQuery = () => {
  const { query } = useRouter();

  const membershipId = typeof query.id === "string" ? query.id : "";

  return useInfiniteQuery(
    ["matchesQuery", membershipId],
    ({ pageParam = undefined }) => fetchMatches(membershipId, pageParam),
    {
      staleTime: Infinity,
      getNextPageParam: ({ items, page }) => {
        if (items === undefined) return {};
        if (items.matches.length > 0) return page;
        return false;
      },
    }
  );
};
