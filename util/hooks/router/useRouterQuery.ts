import { useRouter } from "next/router";
import React from "react";

type QueryType = {
  [key: string]: string;
};

export const useRouterQuery = (queries: string[]) => {
  const { query } = useRouter();

  const queryResult = React.useMemo<QueryType>(() => {
    const result: QueryType = {};
    queries.forEach((queryKey) => {
      const queryValue = query[queryKey];
      result[queryKey] =
        typeof queryValue === "string" ? (queryValue as string) : "";
    });
    return result;
  }, [queries, query]);

  return queryResult;
};
