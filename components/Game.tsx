import { Box, Heading, Stack, Flex, Text, Img, Grid } from "@chakra-ui/react";
import { OverviewResponse, PostGameReport } from "../util/types";
import { Value } from "./Containers";

interface CharacterProps {
  character: any;
  variant: "sm" | "lg";
}

const styles = {
  sm: {
    imgProps: {
      height: "30px",
      width: "30px",
    },
  },
  lg: {
    imgProps: {
      height: "44px",
      width: "44px",
    },
  },
};

const Character: React.FC<CharacterProps> = ({ character, variant }) => {
  return (
    <Flex
      justify={{ base: "center", lg: "space-between" }}
      wrap="wrap"
      flexDir={{ base: "column", lg: "row" }}>
      <Flex
        align="center"
        justify={{ base: "center", lg: "initial" }}
        gridGap={2}>
        <Img
          src={`https://bungie.net/${character.imageUrl}`}
          alt=""
          {...styles[variant].imgProps}
        />
        <Box>
          <Heading size="sm" color="white">
            {character.displayName}
          </Heading>

          {character.weapon && (
            <Flex align="center" gridGap={2} opacity={0.6}>
              <Img
                src={`https://bungie.net/${character.weapon?.information?.displayProperties?.icon}`}
                alt=""
                w="24px"
                h="24px"
                rounded="sm"
              />
              <Text color="white" fontSize="12px">
                {character.weapon?.information?.displayProperties?.name}
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
  variant?: "lg" | "sm";
}

export const Game: React.FC<GameProps> = ({ data, variant = "lg" }) => {
  return (
    <Box color="white" px={8} flex={1} w="100%">
      <Heading size="md" color="white">
        {data.displayProperties.name}
      </Heading>

      <Flex
        align="center"
        gridGap={4}
        pt={4}
        flexDir={{ base: "column", lg: "row" }}>
        {variant === "lg" && (
          <Box h="16px" w="16px" rounded="50%" background="green.500" />
        )}

        <Grid
          flex={1}
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          gridTemplateRows={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          gridAutoFlow={{ base: "row", lg: "column" }}
          gridGap={4}>
          {data.characters.map((character) => (
            <Character
              character={character}
              key={character.characterId}
              variant={variant}
            />
          ))}
        </Grid>

        {variant === "lg" && (
          <Box h="16px" w="16px" rounded="50%" background="red.500" />
        )}
      </Flex>
    </Box>
  );
};
