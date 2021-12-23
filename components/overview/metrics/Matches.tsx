import { Stack, Flex, Box, Heading, Text } from "@chakra-ui/react";

interface MatchesProps {
  activities: any[];
}

export const Matches: React.FC<MatchesProps> = ({ activities }) => {
  return (
    <Stack spacing={2}>
      {activities.map((activity: any) => (
        <Flex
          px={8}
          py={2}
          cursor="pointer"
          _hover={{ background: "#1f1f1e" }}
          align="center"
          justify="space-between"
          key={activity.id}>
          <Box
            w="16px"
            h="16px"
            rounded="50%"
            background={activity.victory ? "green.500" : "red.500"}
          />
          <Box>
            <Heading size="sm" color="white">
              {activity.kills}
            </Heading>
            <Text fontSize="12px" color="white">
              Kills
            </Text>
          </Box>
          <Box>
            <Heading size="sm" color="white">
              {activity.deaths}
            </Heading>
            <Text fontSize="12px" color="white">
              Deaths
            </Text>
          </Box>
          <Box>
            <Heading size="sm" color="white">
              {activity.kdRatio.toFixed(2)}
            </Heading>
            <Text fontSize="12px" color="white">
              Ratio
            </Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};
