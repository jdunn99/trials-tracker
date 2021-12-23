import { Flex, Box, Heading } from "@chakra-ui/react";
import { useOverviewQuery } from "../../../util/queries/useOverviewQuery";
import { Value } from "../../Containers";

export const Seasonal: React.FC = () => {
  const { data } = useOverviewQuery();

  return data ? (
    <Flex align="center" justify="space-between" gridGap={2} px={8} wrap="wrap">
      <Value
        flex={1}
        value={data!.Response.season.kills}
        heading="Kills"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.Response.season.deaths}
        heading="Deaths"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.Response.season.assists}
        heading="Assists"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.Response.season.wins}
        heading="Wins"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.Response.season.losses}
        heading="Lossses"
        size="xl"
        textSize="12px"
      />
    </Flex>
  ) : null;
};
