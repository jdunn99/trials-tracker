import { Flex, Box, Spinner } from "@chakra-ui/react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Router from "next/dist/server/router";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { Sidebar } from "../components/Sidebar";
import { handleMatchesSSG } from "../util/queries/useMatchesQuery";
import {
  fetchOverview,
  handleOverviewSSG,
  useOverviewQuery,
} from "../util/queries/useOverviewQuery";
import { useProfileQuery } from "../util/queries/useProfileQuery";
import { Overview } from "./[id]/overview";
import styles from "../styles/Home.module.css";
import { MatchesPage } from "./[id]/matches";
import { handleGuardiansSSSG } from "../util/queries/useGuardiansQuery";
import { Guardians } from "./[id]/guardians";
import { useRouterQuery } from "../util/hooks/router/useRouterQuery";

const Page: NextPage = ({
  pathFromSSR,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { path } = useRouterQuery(["path"]);

  // dynamically SSR one page and then render it, build other pages on client.
  const renderPath = React.useMemo(() => {
    return path || pathFromSSR;
  }, [pathFromSSR, path]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Trials Tracker</title>
      </Head>
      <Flex w="100%">
        <Sidebar />
        <Box w="100%" maxH="100vh" overflow="auto">
          {renderPath === "overview" && <Overview />}
          {renderPath === "matches" && <MatchesPage />}
          {renderPath === "guardians" && <Guardians />}
        </Box>
      </Flex>
    </div>
  );
};

const handleSSR = async (
  queryClient: QueryClient,
  id: string,
  path: "overview" | "matches" | "guardians"
): Promise<void> => {
  switch (path) {
    case "overview":
      handleOverviewSSG(queryClient, id);
      return;
    case "matches":
      handleMatchesSSG(queryClient, id);
      return;
    case "guardians":
      handleGuardiansSSSG(queryClient, id);
      return;
  }
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let { path, id } = query;
  console.log(query);
  path = typeof path === "string" ? path : "overview";
  id = typeof id === "string" ? id : "";

  console.log("SSR FOR: ", path);

  const queryClient = new QueryClient();
  await handleSSR(
    queryClient,
    id,
    path as "overview" | "matches" | "guardians"
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      pathFromSSR: path,
    },
  };
};

export default Page;
