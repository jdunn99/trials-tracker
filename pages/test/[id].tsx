import {
  dehydrate,
  FetchNextPageOptions,
  QueryClient,
  QueryFunction,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { Flex, Box, Spinner, Heading, Button } from "@chakra-ui/react";

import React from "react";
import { NextPage } from "next";

import { Page } from "../../util/queries/useMatchesQuery";

const fetchMatches = async (membershipId: string, pageParams: Page) => {
  const response = await fetch(
    `http://localhost:4000/destiny/matches/${membershipId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pages: pageParams,
      }),
    }
  );

  const json = await response.json();
  return {
    items: json,
    page: pageParams,
  };
};

const Overview: NextPage = () => {
  const { query } = useRouter();
  const membershipId = typeof query?.id === "string" ? query.id : "";

  const items = useInfiniteQuery(
    ["matchesQuery", membershipId],
    ({ pageParam = undefined }) => fetchMatches(membershipId, pageParam),
    {
      getNextPageParam: ({ items, page }) => {
        console.log("GETTING NEXT PAGE OF:", items);
        if (items.Response.matches.length > 0) return items.pages;
        return false;
      },
    }
  );

  if (items.isLoading) return <p>Loading</p>;
  if (items.isError) return <p>IDK</p>;
  return (
    <div style={{ maxHeight: "100vh", overflow: "auto" }}>
      <button onClick={() => items.fetchNextPage()}>Fetch more</button>
      <p>
        {JSON.stringify(
          items.data?.pageParams[items.data.pageParams.length - 1]
        )}
      </p>
    </div>
  );
};

export default Overview;
