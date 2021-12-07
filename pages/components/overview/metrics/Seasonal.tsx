import { Flex, Box, Heading } from "@chakra-ui/react";
import { useDataContext } from "../../../../util/DataContext";
import { Value } from "../../Containers";

export const Seasonal: React.FC = () => {
  const { overviewData: data } = useDataContext();

  return (
    <Flex align="center" justify="space-between" gridGap={2} px={8} wrap="wrap">
      <Value
        flex={1}
        value={data!.season.kills}
        heading="Kills"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.season.deaths}
        heading="Deaths"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.season.assists}
        heading="Assists"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.season.wins}
        heading="Wins"
        size="xl"
        textSize="12px"
      />
      <Value
        value={data!.season.losses}
        heading="Lossses"
        size="xl"
        textSize="12px"
      />
    </Flex>
  );
};
