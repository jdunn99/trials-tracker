import { Box, Heading, Stack, Flex, Text, Image } from "@chakra-ui/react";
import { useDataContext } from "../../../../util/DataContext";
import { OverviewResponse } from "../../../../util/types";
import { Value } from "../../Containers";

interface CharacterProps {
  index: number;
  data: OverviewResponse;
  offset?: number;
}

const Character: React.FC<CharacterProps> = ({ index, data, offset }) => {
  const item = offset !== undefined ? offset : index;

  console.log(data!.bestGame.characters[item]);
  return (
    <Flex justify="space-between" flex={1} pr={4}>
      <Flex align="center" gridGap={2}>
        <Image
          src={`https://bungie.net/${data!.bestGame.characters[item].imageUrl}`}
          alt=""
          w="30px"
          h="30px"
        />
        <Box>
          <Heading size="sm" color="white">
            {data!.bestGame.characters[item].displayName}
          </Heading>

          {data!.bestGame.characters[item].weapon && (
            <Flex align="center" gridGap={2} opacity={0.6}>
              <Image
                src={`https://bungie.net/${
                  data!.bestGame.characters[item].weapon!.information
                    .displayProperties.icon
                }`}
                alt=""
                w="24px"
                h="24px"
                rounded="sm"
              />
              <Text color="white" fontSize="12px">
                {
                  data!.bestGame.characters[item].weapon!.information
                    .displayProperties.name
                }
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
      <Flex align="center" gridGap={2}>
        <Value value={data!.bestGame.characters[item].kills} heading="Kills" />
        <Value
          value={data!.bestGame.characters[item].deaths}
          heading="Deaths"
        />
      </Flex>
    </Flex>
  );
};

export const BestGame: React.FC = () => {
  const { overviewData: data } = useDataContext();

  return (
    <Box px={8}>
      <Heading size="md" color="white">
        {data!.bestGame.displayProperties.name}
      </Heading>
      <Stack spacing={5} my={2}>
        {[0, 1, 2].map((item) => (
          <Flex key={item} justify="space-between">
            <Character data={data!} index={item} />
            <Character data={data!} index={item} offset={5 - item} />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
