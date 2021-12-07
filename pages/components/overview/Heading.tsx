import { Flex, Box, Badge, Text, Image, Heading } from "@chakra-ui/react";
import { useDataContext } from "../../../util/DataContext";
import { mapIcon } from "../../../util/functions";
import { User } from "../../../util/UserContext";
import { Searchbar } from "../Searchbar";

interface HeadingProps {
  isSmall?: boolean;
}

export const Header: React.FC<HeadingProps> = ({ isSmall }) => {
  const { profileData: data } = useDataContext();

  const parsed = data ? data.bungieName.split("#") : "";

  return data ? (
    <Flex align="center" flex={1} flexDir={{ base: "column", lg: "row" }}>
      <Image src={data.avatarUrl} mr={4} rounded="md" alt="" w="64px" />

      <Box textAlign={{ base: "center", lg: "left" }}>
        <Flex align="center">
          <Heading color="white">{parsed[0]}</Heading>
          <Badge background="#FBD000" color="#1F1F1E" mx={2}>
            #{parsed[1]}
          </Badge>
        </Flex>
        <Text opacity={0.6} color="white">
          {data.status}
        </Text>
      </Box>
      <Box mb={{ base: "2rem", lg: 0 }} flex={1}>
        {isSmall ? null : (
          <Flex justify="flex-end" pt="1.5rem">
            <Searchbar />
          </Flex>
        )}
        <Flex gridGap={2} ml={{ base: 0, lg: 4 }} mt={2} justify="flex-end">
          {data.platforms.map((item: number) => (
            <Heading
              size="md"
              color="white"
              key={item}
              p={2}
              rounded="50%"
              background="#171717">
              {mapIcon(parseInt(item.toString()))}
            </Heading>
          ))}
        </Flex>
      </Box>
    </Flex>
  ) : null;
};
