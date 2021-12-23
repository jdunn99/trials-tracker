import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useDataContext } from "../util/DataContext";
import { useOverviewQuery } from "../util/queries/useOverviewQuery";
import { Character } from "../util/types";

interface CharacterCardProps {
  isSmall?: boolean;
  backgroundImage: string;
  className: string;
  race: string;
  lightLevel: number;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  isSmall,
  backgroundImage,
  className,
  race,
  lightLevel,
}) => {
  return (
    <Box
      p={4}
      flex={0.5}
      backgroundRepeat="no-repeat"
      backgroundPosition={isSmall ? "center" : "initial"}
      backgroundSize={isSmall ? "cover" : "initial"}
      backgroundImage={backgroundImage}>
      <Flex align="center" justify="space-between" p="8px 34px 24px 80px">
        <Box>
          <Heading color="white" size="md">
            {className}
          </Heading>
          <Text color="white">{race}</Text>
        </Box>
        <Heading size="md" color="#F4DC57">
          ✦{lightLevel}
        </Heading>
      </Flex>
    </Box>
  );
};
