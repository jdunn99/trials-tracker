import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { calculateKd, calculateWinLoss, color } from "../../../util/functions";
import { KPICard } from "../KPICard";

interface KPIProps {
  kills: number;
  deaths: number;
  wins: number;
  matches: number;
  efficiency: number;
  flawless: number;
}

export const KPIs: React.FC<KPIProps> = ({
  kills,
  deaths,
  wins,
  matches,
  flawless,
  efficiency,
}) => {
  const killsRatio = React.useMemo(
    () => calculateKd(kills, deaths),
    [deaths, kills]
  );

  const winLossRatio = React.useMemo(
    () => calculateWinLoss(wins, matches),
    [matches, wins]
  );

  return (
    <Box my={4}>
      <Flex align="center" flex={1} my={2} wrap="wrap" gridGap={4}>
        <KPICard
          value={killsRatio}
          text="K/D"
          color={color(parseFloat(killsRatio), 1)}
        />
        <KPICard
          value={efficiency.toFixed(2).toString()}
          color={color(efficiency, 1)}
          text="Efficiency"
        />
        <KPICard
          value={winLossRatio + "%"}
          text="Win %"
          color={color(parseFloat(winLossRatio), 50)}
        />
        <KPICard value={flawless + "x"} text="Flawless" />
        <KPICard value={matches.toString()} text="Matches" />
      </Flex>
    </Box>
  );
};
