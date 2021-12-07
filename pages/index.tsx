import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { Searchbar } from "./components/Searchbar";
import { Sidebar } from "./components/Sidebar";

import {
  ClassType,
  DestinyRace,
  OverviewResponse,
  Profile,
} from "../util/types";
import { Header } from "./components/overview/Heading";
import { useDataContext } from "../util/DataContext";
import { KPIs } from "./components/overview/metrics/KPIs";
import { WeeklyStats } from "./components/overview/metrics/WeeklyStats";
import { Build } from "./components/overview/metrics/Build";
import { CharacterCard } from "./components/overview/metrics/CharacterCard";
import { Matches } from "./components/overview/metrics/Matches";
import { MetricContainer, MetricHeading, Value } from "./components/Containers";
import { Seasonal } from "./components/overview/metrics/Seasonal";
import { WeaponStats } from "./components/overview/metrics/WeaponStats";
import { CharacterBreakdown } from "./components/overview/metrics/CharacterBreakdown";
import { BestGame } from "./components/overview/metrics/BestGame";

interface CharacterCardProps {
  id: string;
  setData: React.Dispatch<React.SetStateAction<any>>;
  emblemBackgroundPath: string;
  classType: number;
  raceType: number;
  light: number;
}

interface InactiveUserContentProps {
  loading: boolean;
}

const InactiveUserContent: React.FC<InactiveUserContentProps> = ({
  loading,
}) => {
  return (
    <Flex
      w="100%"
      h="calc(100vh - 120px)"
      align="center"
      justify={loading ? "center" : "flex-start"}
      py={loading ? 0 : "8rem"}
      flexDir="column">
      {loading ? (
        <Spinner color="#FBD000" />
      ) : (
        <React.Fragment>
          <Heading size="md" color="white" my={2}>
            Welcome to <span style={{ color: "#FBD000" }}>Trials Tracker</span>
          </Heading>
          <Text color="white" mb={4}>
            To get started, enter a Bungie account name below.
          </Text>
          <Searchbar />
        </React.Fragment>
      )}
    </Flex>
  );
};

const ActiveUserContent: React.FC = () => {
  const isSmall = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex flexDir="column" py={4}>
      {isSmall ? (
        <Flex align="center" justify="center" mb={8}>
          <Searchbar />
        </Flex>
      ) : null}

      <Box px={14}>
        <Header isSmall={isSmall} />
        <KPIs />
      </Box>

      <Box px={14}>
        <Flex
          wrap={isSmall ? "nowrap" : "wrap"}
          flexDir={{ base: "column", lg: "row" }}
          justify={{ base: "center", lg: "flex-start" }}
          align={{ base: "stretch", lg: "flex-start" }}
          gridGap={4}>
          <Flex flexDir="column" flex={1} gridGap={isSmall ? 4 : 0}>
            <CharacterCard isSmall={isSmall} />
            <Flex flex={1} gridGap={4}>
              <MetricContainer flex={1} maxH="310px">
                <MetricHeading>Recent Matches</MetricHeading>
                <Matches />
              </MetricContainer>
            </Flex>
          </Flex>
          <Flex flexDir="column" flex={2} gridGap={4}>
            <MetricContainer flex={1}>
              <MetricHeading>Season 15 Stats</MetricHeading>
              <Seasonal />
            </MetricContainer>
            <MetricContainer flex={1} maxH="285px">
              <MetricHeading>Best Game</MetricHeading>
              <BestGame />
            </MetricContainer>
          </Flex>

          <MetricContainer flex={2} maxH="425px" minWidth="33%">
            <MetricHeading>This Week</MetricHeading>
            <WeeklyStats />
            <MetricHeading mt={1}>Last Used Build</MetricHeading>
            <Build />
          </MetricContainer>
        </Flex>
      </Box>

      <Flex gridGap={4} px={14} mt={4} flexDir={{ base: "column", lg: "row" }}>
        <MetricContainer flex={1} h="260px">
          <MetricHeading>Weapon Stats</MetricHeading>
          <WeaponStats isSmall={isSmall} />
        </MetricContainer>
        <MetricContainer flex={1} h="260px">
          <MetricHeading>Character Breakdown</MetricHeading>
          <CharacterBreakdown isSmall={isSmall} />
        </MetricContainer>
      </Flex>
    </Flex>
  );
};

export default function Home() {
  const { overviewData, loading, profileData } = useDataContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Destiny 2 Trials Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="100%">
        <Sidebar />
        <Box w="100%" maxH="100vh" overflow="auto">
          {overviewData && profileData ? (
            <ActiveUserContent />
          ) : (
            <InactiveUserContent loading={loading} />
          )}
        </Box>
      </Flex>
    </div>
  );
}
