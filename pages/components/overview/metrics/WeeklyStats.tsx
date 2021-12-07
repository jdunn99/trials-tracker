import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { useDataContext } from "../../../../util/DataContext";
import { Value } from "../../Containers";

export const WeeklyStats: React.FC = () => {
  const { overviewData: data } = useDataContext();

  return data ? (
    <Flex align="center" justify="center" gridGap={4}>
      <Value
        size="lg"
        textAlign="center"
        heading="Kills"
        value={data.currentStats.kills}
      />
      <Value
        size="lg"
        heading="Deaths"
        value={Math.round(data.currentStats.deaths) || 0}
      />
      <Value
        textAlign="center"
        size="lg"
        heading="Wins"
        value={data.currentStats.wins}
      />
      <Value
        textAlign="center"
        size="lg"
        heading="Losses"
        value={data.currentStats.losses}
      />
      <Value
        textAlign="center"
        size="lg"
        heading="Flawless"
        value={data.currentStats.flawless}
      />
    </Flex>
  ) : null;
};
