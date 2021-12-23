import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { Searchbar } from "../components/Searchbar";

const Content: React.FC = () => {
  return (
    <Flex
      w="100%"
      h="calc(100vh - 120px)"
      overflow="hidden"
      align="center"
      justify={"flex-start"}
      py={"8rem"}
      flexDir="column">
      <React.Fragment>
        <Heading size="md" color="white" my={2}>
          Welcome to <span style={{ color: "#FBD000" }}>Trials Tracker</span>
        </Heading>
        <Text color="white" mb={4}>
          To get started, enter a Bungie account name below.
        </Text>
        <Searchbar />
      </React.Fragment>
    </Flex>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Destiny 2 Trials Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="100%">
        <Box w="100%" maxH="100vh" overflow="auto">
          <Content />
        </Box>
      </Flex>
    </div>
  );
}
