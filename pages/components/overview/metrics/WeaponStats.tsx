import { Stack, Flex, Box, Heading, Image } from "@chakra-ui/react";
import { useDataContext } from "../../../../util/DataContext";
import { Value } from "../../Containers";

interface WeaponStatsProps {
  isSmall?: boolean;
}

export const WeaponStats: React.FC<WeaponStatsProps> = ({ isSmall }) => {
  const { overviewData: data } = useDataContext();

  return (
    <Stack spacing={2} px={8}>
      {data!.weaponsStats.data.map((weapon) => (
        <Flex
          align="center"
          gridGap={2}
          flexDir={isSmall ? "column" : "row"}
          justify={isSmall ? "center" : "space-between"}
          key={weapon.hash}>
          <Flex align="center" gridGap={2} flexDir={isSmall ? "column" : "row"}>
            <Image w="44px" h="44px" src={weapon.iconUrl} alt="" rounded="md" />
            <Heading size="md" color="white">
              {weapon.name}
            </Heading>
          </Flex>
          <Flex
            align="center"
            justify={isSmall ? "center" : "flex-end"}
            gridGap={8}
            textAlign="center">
            <Value
              value={weapon.kills}
              size="md"
              heading="Kills"
              textAlign="center"
            />
            <Value
              value={weapon.precisionKills}
              size="md"
              heading="Precision Kills"
              textAlign="center"
            />
            <Value
              value={weapon.accuracy}
              size="md"
              heading="Accuracy"
              textAlign="center"
            />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};
