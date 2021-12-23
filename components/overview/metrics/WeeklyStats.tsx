import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { useOverviewQuery } from "../../../util/queries/useOverviewQuery";
import { Value } from "../../Containers";

export const WeeklyStats: React.FC = () => {
  const { data } = useOverviewQuery();

  return data && data.Response ? (
    <Flex align="center" justify="center" gridGap={4}>
      <Value
        size="lg"
        textAlign="center"
        heading="Kills"
        value={data.Response.currentStats.kills}
      />
      <Value
        size="lg"
        heading="Deaths"
        value={Math.round(data.Response.currentStats.deaths) || 0}
      />
      <Value
        textAlign="center"
        size="lg"
        heading="Wins"
        value={data.Response.currentStats.wins}
      />
      <Value
        textAlign="center"
        size="lg"
        heading="Losses"
        value={data.Response.currentStats.losses}
      />
      <Value
        textAlign="center"
        size="lg"
        heading="Flawless"
        value={data.Response.currentStats.flawless}
      />
    </Flex>
  ) : null;
};
