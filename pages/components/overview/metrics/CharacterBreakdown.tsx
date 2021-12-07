import { Stack, Flex, Heading, Box } from "@chakra-ui/react";
import { useDataContext } from "../../../../util/DataContext";
import { Value } from "../../Containers";

interface CharacterBreakdownProps {
  isSmall?: boolean;
}
export const CharacterBreakdown: React.FC<CharacterBreakdownProps> = ({
  isSmall,
}) => {
  const { overviewData: data } = useDataContext();

  return (
    <Stack spacing={2}>
      {data!.characters.map((character) => (
        <Flex
          _hover={{ background: "#1f1f1e" }}
          cursor="pointer"
          align="center"
          py={2}
          px={8}
          wrap="wrap"
          gridGap={2}
          justify={isSmall ? "center" : "space-between"}
          key={character.characterId}>
          <Flex align="center" gridGap={2}>
            <Heading size="md" color="white">
              {character.class}
            </Heading>
          </Flex>
          <Flex
            wrap="wrap"
            align="center"
            justify={isSmall ? "center" : "space-between"}
            gridGap={8}
            textAlign="center">
            <Value
              size="md"
              textAlign="center"
              heading="Matches"
              value={character.matches}
            />

            <Value
              size="md"
              textAlign="center"
              heading="Losses"
              value={character.losses}
            />
            <Value
              size="md"
              textAlign="center"
              heading="Kills"
              value={character.kills}
            />
            <Value
              size="md"
              textAlign="center"
              heading="Deaths"
              value={character.deaths}
            />
            <Value
              size="md"
              textAlign="center"
              heading="Assists"
              value={character.assists}
            />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};
