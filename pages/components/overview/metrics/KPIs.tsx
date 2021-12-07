import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useDataContext } from "../../../../util/DataContext";
import {
  calculateKd,
  calculateWinLoss,
  color,
} from "../../../../util/functions";

import { KPICard } from "../KPICard";

export const KPIs: React.FC = ({}) => {
  const { overviewData: data } = useDataContext();

  const killsRatio = React.useMemo(
    () => (data ? calculateKd(data.kills, data.deaths) : ""),
    [data]
  );

  const winLossRatio = React.useMemo(
    () => (data ? calculateWinLoss(data.wins, data.matches) : ""),
    [data]
  );

  return data ? (
    <Box my={4}>
      <Flex align="center" flex={1} my={2} wrap="wrap" gridGap={4}>
        <KPICard
          value={killsRatio}
          text="K/D"
          color={color(parseFloat(killsRatio), 1)}
        />
        <KPICard
          value={data.efficiency.toFixed(2).toString()}
          color={color(data.efficiency, 1)}
          text="Efficiency"
        />
        <KPICard
          value={winLossRatio + "%"}
          text="Win %"
          color={color(parseFloat(winLossRatio), 50)}
        />
        <KPICard value={data.flawless + "x"} text="Flawless" />
        <KPICard value={data.matches.toString()} text="Matches" />
      </Flex>
    </Box>
  ) : null;
};
