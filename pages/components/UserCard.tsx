import {
  Flex,
  Box,
  Heading,
  Badge,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useData, useDataContext } from "../../util/DataContext";
import { BungieResponse, OverviewResponse, Profile } from "../../util/types";
import { useUserContext } from "../../util/UserContext";

function truncate(str: string, n: number) {
  return str.length > n ? str.substring(0, n - 1) : str;
}

interface UserCardProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  id: string;
  avatarUrl: string;
  parsed: string[];
  status: string;
}
export const UserCard: React.FC<UserCardProps> = ({
  setData,
  id,
  avatarUrl,
  parsed,
  status,
}) => {
  const { setLoading, setOverviewData, setProfileData } = useDataContext();
  const toast = useToast();

  return (
    <Flex
      boxShadow="md"
      border="1px solid rgb(255, 255, 255, 0.01)"
      key={id}
      _hover={{ background: "#2c270c" }}
      align="center"
      cursor="pointer"
      p={3}
      onClick={async () => {
        setOverviewData(null);
        setLoading(true);

        const result = await fetch(`http://localhost:4000/destiny/gear/${id}`);
        const json: BungieResponse<
          OverviewResponse & Pick<Profile, "platforms" | "character">
        > = await result.json();

        if (json.Errors || json.Response === undefined) {
          // TODO: Toast
        } else {
          setProfileData({
            membershipId: id,
            status,
            avatarUrl,
            bungieName: parsed[0] + "#" + parsed[1],
            platforms: json.Response.platforms,
            character: json.Response.character,
          });
          setLoading(false);
          setOverviewData({
            ...json.Response,
          });
        }
      }}
      my={1}
      rounded="md"
      color="white"
      background="#16181C">
      <Image src={avatarUrl} width="40px" mr={2} alt="" />
      <Flex align="center" justify="space-between" flex={1}>
        <Box>
          <Heading fontSize="14px">{truncate(parsed[0], 16)}</Heading>

          <Text opacity={0.5} fontSize="12">
            {status}
          </Text>
        </Box>
        <Badge background="#fbd000" color="#1F1F1E" ml={1} fontSize="12px">
          #{parsed[1]}
        </Badge>
      </Flex>
    </Flex>
  );
};
