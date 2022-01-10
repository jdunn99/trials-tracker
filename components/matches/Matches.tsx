import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Img,
  Spinner,
} from "@chakra-ui/react";
import { match } from "assert";
import React from "react";
import { CLASS_IMAGES } from "../../util/constants";
import { sortMatchesCallback } from "../../util/functions";
import { usePostGameReportQuery } from "../../util/queries/usePostGameReportQuery";
import { Match, MatchesResponse } from "../../util/types";
import { Value } from "../Containers";
import { Game } from "../Game";

const Match: React.FC<{ match: Match; pages: any }> = ({ match, pages }) => {
  const [matchId, setMatchId] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { data, isLoading } = usePostGameReportQuery(matchId);

  // onclick setmatchid to match.matchid and open
  const handleClick = (id: string) => {
    if (matchId !== id) setMatchId(id);
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <Box key={match.matchId}>
      <Flex
        py={2}
        align="center"
        onClick={() => {
          handleClick(match.matchId);
        }}
        cursor="pointer"
        borderBottom="1px solid rgba(255,255,255,0.1)"
        background="#171717"
        roundedTop="md">
        <Flex align="center" justify="center" flex={0.5}>
          <Box
            ml={6}
            w="16px"
            h="16px"
            rounded="50%"
            background={match.standing === 0 ? "green.500" : "red.500"}
          />
        </Flex>

        <Flex
          align="center"
          flex={2}
          gridGap={2}
          flexDir={{ base: "column", md: "row" }}>
          <Box flex={4}>
            <Heading size="md" color="white">
              {match.displayProperties.name}
            </Heading>
            <Text color="white">{new Date(match.period).toLocaleString()}</Text>
          </Box>
          <Flex flex={3} align="center" gridGap={2}>
            <Box flex={1}>
              <Value size="md" heading="Kills" value={match.kills} />
            </Box>
            <Box flex={1}>
              <Value size="md" heading="Deaths" value={match.deaths} />
            </Box>

            <Box flex={1}>
              <Value
                size="md"
                heading="Ratio"
                value={parseFloat(match.killsDeathsRatio.toString() + ".00")}
              />
            </Box>
            <Box flex={1}>
              <Img
                w="40px"
                src={
                  CLASS_IMAGES[
                    pages[match.character as keyof typeof pages]
                      .class as keyof typeof CLASS_IMAGES
                  ]
                }
                alt=""
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box w="100%" background="#16181C" px={8} py={4}>
          {isLoading ? (
            <Flex py={2} align="center" justify="center">
              <Spinner color="#fbd000" />
            </Flex>
          ) : (
            data && <Game data={data.Response} />
          )}
        </Box>
      ) : null}
    </Box>
  );
};

export const Matches: React.FC<{ matches: Match[]; pages: any }> = ({
  matches,
  pages,
}) => {
  return (
    <Box w="100%">
      {matches.length > 0 ? (
        <Stack>
          {matches.map((match) => (
            <Match key={match.matchId} match={match} pages={pages} />
          ))}
        </Stack>
      ) : (
        <Flex align="center" justify="center">
          <Text color="white">No available matches.</Text>
        </Flex>
      )}
    </Box>
  );
};
