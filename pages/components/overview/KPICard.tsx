import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface KPICardProps {
  value: string;
  text: string;
  color?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  value,
  text,
  color = "white",
}) => {
  return (
    <Box flex={1} px={8} py={4} rounded="lg" background="#171717">
      <Heading color={color}>{value}</Heading>
      <Text textTransform="uppercase" color="white" mb={1} ml={1}>
        {text}
      </Text>
    </Box>
  );
};
