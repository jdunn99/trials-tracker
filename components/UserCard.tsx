import {
  Flex,
  Box,
  Heading,
  Badge,
  Img,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useProfileQuery } from "../util/queries/useProfileQuery";
import Link from "next/link";

function truncate(str: string, n: number) {
  return str.length > n ? str.substring(0, n - 1) : str;
}

interface UserCardProps {
  id: string;
  avatarUrl: string;
  parsed: string[];
  status: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  id,
  avatarUrl,
  parsed,
  status,
}) => {
  return (
    <Link href={`/${id}/`} passHref>
      <Flex
        boxShadow="md"
        border="1px solid rgb(255, 255, 255, 0.01)"
        key={id}
        _hover={{ background: "#2c270c" }}
        align="center"
        cursor="pointer"
        p={3}
        my={1}
        rounded="md"
        color="white"
        background="#16181C">
        <Img src={avatarUrl} width="40px" mr={2} alt="" />
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
    </Link>
  );
};
