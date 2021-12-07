import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useDataContext } from "../../../../util/DataContext";

interface CharacterCardProps {
  isSmall?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ isSmall }) => {
  const { profileData } = useDataContext();

  return (
    <Box
      p={4}
      flex={0.5}
      backgroundRepeat="no-repeat"
      backgroundPosition={isSmall ? "center" : "initial"}
      backgroundSize={isSmall ? "cover" : "initial"}
      backgroundImage={profileData!.character.backgroundImage}>
      <Flex align="center" justify="space-between" p="8px 34px 24px 80px">
        <Box>
          <Heading color="white" size="md">
            {profileData!.character.class}
          </Heading>
          <Text color="white">{profileData!.character.race}</Text>
        </Box>
        <Heading size="md" color="#F4DC57">
          ✦{profileData!.character.lightLevel}
        </Heading>
      </Flex>
    </Box>
  );
};
