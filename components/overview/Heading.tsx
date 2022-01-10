import { Flex, Box, Badge, Text, Img, Heading } from "@chakra-ui/react";
import { mapIcon } from "../../util/functions";
import { useProfileQuery } from "../../util/queries/useProfileQuery";
import { Searchbar } from "../Searchbar";

interface HeadingProps {
  isSmall?: boolean;
}

export const Header: React.FC<HeadingProps> = ({ isSmall }) => {
  const { data } = useProfileQuery();

  const temp = data as any;

  const parsed =
    temp && temp.Response ? temp.Response.bungieName.split("#") : "";

  return data && temp.Response ? (
    <Flex
      align="center"
      flex={1}
      mb={1}
      flexDir={{ base: "column", lg: "row" }}>
      <Img
        src={`https://bungie.net/${temp.Response.avatarUrl}`}
        mr={4}
        rounded="md"
        alt=""
        w="64px"
      />

      <Box textAlign={{ base: "center", lg: "left" }}>
        <Flex align="center">
          <Heading color="white">{parsed[0]}</Heading>
          <Badge background="#FBD000" color="#1F1F1E" mx={2}>
            #{parsed[1]}
          </Badge>
        </Flex>
        {temp.Response.status && (
          <Text opacity={0.6} color="white">
            {temp.Response.status}
          </Text>
        )}
      </Box>
      <Box mb={{ base: "2rem", lg: 0 }} flex={1}>
        {isSmall ? null : (
          <Flex justify="flex-end" pt="1.5rem">
            <Searchbar />
          </Flex>
        )}
        <Flex gridGap={2} ml={{ base: 0, lg: 4 }} mt={2} justify="flex-end">
          {temp.Response.platforms.map((item: number) => (
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
