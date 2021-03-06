import {
  Text,
  Box,
  BoxProps,
  Heading,
  FlexProps,
  Flex,
  Img,
} from "@chakra-ui/react";

export const MetricHeading: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Text
    px={8}
    color="white"
    textAlign={{ base: "center", lg: "left" }}
    mb={1}
    {...rest}>
    {children}
  </Text>
);

export const MetricContainer: React.FC<BoxProps> = ({ children, ...rest }) => {
  const { overflow } = rest;
  return (
    <Box
      {...rest}
      py={4}
      rounded="lg"
      background="#171717"
      overflow={overflow ?? "auto"}>
      {children}
    </Box>
  );
};

interface ValueProps extends FlexProps {
  heading: string;
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  textSize?: "12px" | "14px" | "16px";
  textAlign?: "center" | "left" | "right";
  color?: string;
}

export const Value: React.FC<ValueProps> = ({
  heading,
  value,
  color = "white",
  size = "md",
  textSize = "14px",
  textAlign = "left",
}) => {
  return (
    <Box textAlign={textAlign}>
      <Heading size={size} color={color}>
        {Number.isSafeInteger(value) ? value : value.toFixed(2)}
      </Heading>
      <Text fontSize={textSize} color="white">
        {heading}
      </Text>
    </Box>
  );
};

interface BuildContainerProps {
  size: string;
  src: string;
  key?: any;
}

export const BuildContainer: React.FC<BuildContainerProps> = ({
  size,
  src,
  key,
  children,
}) => {
  return (
    <Flex align="center" gridGap={2} key={key}>
      <Img width={size} height={size} src={src} rounded="md" alt={src} />
      <Box>{children}</Box>
    </Flex>
  );
};
