import {
  Box,
  Flex,
  Spinner,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Head from "next/head";
import router, { useRouter } from "next/router";
import React from "react";
import { QueryClient, dehydrate } from "react-query";
import { MetricContainer, MetricHeading } from "../../components/Containers";
import { Header } from "../../components/overview/Heading";
import { BestGame } from "../../components/overview/metrics/BestGame";
import { Build } from "../../components/overview/metrics/Build";
import { CharacterBreakdown } from "../../components/overview/metrics/CharacterBreakdown";
import { CharacterCard } from "../../components/CharacterCard";
import { KPIs } from "../../components/overview/metrics/KPIs";
import { Matches } from "../../components/overview/metrics/Matches";
import { Seasonal } from "../../components/overview/metrics/Seasonal";
import { WeaponStats } from "../../components/overview/metrics/WeaponStats";
import { WeeklyStats } from "../../components/overview/metrics/WeeklyStats";
import { Searchbar } from "../../components/Searchbar";
import { Sidebar } from "../../components/Sidebar";
import styles from "../../styles/Home.module.css";
import {
  useOverviewQuery,
  handleOverviewSSG,
} from "../../util/queries/useOverviewQuery";
import { useProfileQuery } from "../../util/queries/useProfileQuery";
import { useError } from "../../util/hooks/useError";
import { Game } from "../../components/Game";

interface ContentProps {
  loading: boolean;
}

const Content: React.FC<ContentProps> = ({ loading }) => {
  const isSmall = useBreakpointValue({ base: true, lg: false });
  const { data } = useOverviewQuery();

  useError<any>(data);

  return data && data.Response ? (
    <Flex flexDir="column" py={4}>
      {isSmall ? (
        <Flex align="center" justify="center" mb={8}>
          <Searchbar />
        </Flex>
      ) : null}

      <Box px={14}>
        <Header isSmall={isSmall} />
        <KPIs {...data.Response} />
      </Box>

      {!loading && (
        <Box px={14}>
          <Flex
            wrap={isSmall ? "nowrap" : "wrap"}
            flexDir={{ base: "column", lg: "row" }}
            justify={{ base: "center", lg: "flex-start" }}
            align={{ base: "stretch", lg: "flex-start" }}
            gridGap={4}>
            <Flex flexDir="column" flex={1} gridGap={isSmall ? 4 : 0}>
              <CharacterCard
                isSmall={isSmall}
                {...data.Response.character}
                className={data.Response.character.class}
              />
              <Flex flex={1} gridGap={4}>
                <MetricContainer
                  flex={1}
                  maxH="310px"
                  h={
                    data?.Response?.activities?.length > 0 ? "initial" : "310px"
                  }>
                  <MetricHeading>Recent Matches</MetricHeading>
                  <Matches activities={data.Response.activties} />
                </MetricContainer>
              </Flex>
            </Flex>
            <Flex flexDir="column" flex={2} gridGap={4}>
              <MetricContainer flex={1}>
                <MetricHeading>Season 15 Stats</MetricHeading>
                <Seasonal />
              </MetricContainer>
              <MetricContainer maxH="290px" h="290px">
                <MetricHeading>Best Game</MetricHeading>
                {data.Response.bestGame && (
                  <Game data={data.Response.bestGame} variant="sm" />
                )}
              </MetricContainer>
            </Flex>

            <MetricContainer flex={2} h="425px" minWidth="33%">
              <MetricHeading>This Week</MetricHeading>
              <WeeklyStats />
              <MetricHeading mt={1}>Last Used Build</MetricHeading>
              <Build />
            </MetricContainer>
          </Flex>
        </Box>
      )}

      {!loading && (
        <Flex
          gridGap={4}
          px={14}
          mt={4}
          flexDir={{ base: "column", lg: "row" }}>
          <MetricContainer flex={1} h="260px">
            <MetricHeading>Weapon Stats</MetricHeading>
            <WeaponStats isSmall={isSmall} />
          </MetricContainer>
          <MetricContainer flex={1} h="260px">
            <MetricHeading>Character Breakdown</MetricHeading>
            <CharacterBreakdown isSmall={isSmall} />
          </MetricContainer>
        </Flex>
      )}

      {loading && (
        <Flex align="center" justify="center" h="80vh">
          <Spinner color="#fbd000" />
        </Flex>
      )}
    </Flex>
  ) : null;
};

export const Overview = () => {
  const { isLoading, isError, data } = useOverviewQuery();
  const { isLoading: loading } = useProfileQuery();

  return (
    <Box w="100%" maxH="100vh" overflow="auto">
      {loading ? (
        <Flex align="center" justify="center" w="100%" h="100vh">
          <Spinner color="#fbd000" />
        </Flex>
      ) : (
        <Content loading={isLoading} />
      )}
    </Box>
  );
};

const OverviewRoute = () => {
  const router = useRouter();
  const membershipId =
    typeof router.query.id === "string" ? router.query.id : "";

  React.useEffect(() => {
    router.push({
      pathname: `/${membershipId}`,
      query: { path: "overview" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membershipId]);

  return null;
};

export default OverviewRoute;
