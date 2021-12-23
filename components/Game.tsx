import { Box, Heading, Stack, Flex, Text, Image, Grid } from "@chakra-ui/react";
import { OverviewResponse, PostGameReport } from "../util/types";
import { Value } from "./Containers";

interface CharacterProps {
  character: any;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  return (
    <Flex
      justify={{ base: "center", lg: "space-between" }}
      flexDir={{ base: "column", lg: "row" }}
      wrap="wrap"
      pr={4}>
      <Flex
        align="center"
        justify={{ base: "center", lg: "initial" }}
        gridGap={2}>
        <Image
          src={`https://bungie.net/${character.imageUrl}`}
          alt=""
          w="44px"
          h="44px"
        />
        <Box>
          <Heading size="sm" color="white">
            {character.displayName}
          </Heading>

          {character.weapon && (
            <Flex align="center" gridGap={2} opacity={0.6}>
              <Image
                src={`https://bungie.net/${
                  character.weapon!.information.displayProperties.icon
                }`}
                alt=""
                w="24px"
                h="24px"
                rounded="sm"
              />
              <Text color="white" fontSize="12px">
                {character.weapon!.information.displayProperties.name}
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
      <Flex
        align="center"
        gridGap={2}
        justify={{ base: "center", lg: "initial" }}>
        <Value value={character.kills} heading="Kills" />
        <Value value={character.deaths} heading="Deaths" />
      </Flex>
    </Flex>
  );
};

interface GameProps {
  data: PostGameReport;
  heading?: string;
  score?: number[];
}
export const Game: React.FC<GameProps> = ({ data, heading, score }) => {
  const mid = data.characters.length / 2;
  return (
    <Box px={{ base: "4rem", lg: "6rem" }} color="white">
      <Heading size="md" color="white">
        {heading}
      </Heading>

      <Flex align="center" gridGap={8} flexDir={{ base: "column", lg: "row" }}>
        <Box w="16px" h="16px" rounded="50%" background="green.500" />

        <Grid
          flex={1}
          w="100%"
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          gridTemplateRows={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          gridAutoFlow={{ base: "row", lg: "column" }}
          gridGap={8}>
          {data.characters.map((character) => (
            <Character character={character} key={character.characterId} />
          ))}
        </Grid>

        <Box w="16px" h="16px" rounded="50%" background="red.500" />
      </Flex>
    </Box>
  );
};
