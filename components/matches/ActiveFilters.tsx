import { Flex, Badge, Heading, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Filter } from "../../pages/[id]/matches";

type Callback = (key: string, value: string) => void;

interface ActiveFiltersProps {
  filters: Filter;
  callback: Callback;
}

interface FilterProps {
  k: string;
  index: number;
  value: string;
  callback: Callback;
}

const ActiveFilter: React.FC<FilterProps> = ({ k, value, callback, index }) => {
  return (
    <Flex align="center" gridGap={1}>
      <Badge
        py={1}
        textTransform="initial"
        color="white"
        px={2}
        background="#171717">
        {index === 0 ? `${k}:` : null} {value}
      </Badge>
      <Heading
        size="xs"
        color="white"
        onClick={() => callback(k, value)}
        cursor="pointer"
        opacity={0.6}
        _hover={{ opacity: 1 }}>
        x
      </Heading>
    </Flex>
  );
};

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  callback,
}) => {
  return (
    <Box>
      <Text fontSize="sm" color="white">
        Filters
      </Text>
      <Flex align="center" gridGap={4} flexWrap="wrap">
        {Object.keys(filters).map((k) =>
          filters[k].map(
            (filter, index) =>
              filter !== "All" && (
                <ActiveFilter
                  k={k}
                  index={index}
                  key={filter}
                  value={filter}
                  callback={callback}
                />
              )
          )
        )}
      </Flex>
    </Box>
  );
};
