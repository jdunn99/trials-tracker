import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebarContext } from "../../util/SidebarContext";

export const SidebarHeading: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
}) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const router = useRouter();
  return (
    <Box py={4} px={2}>
      <Flex
        py={4}
        borderBottom="1px solid rgba(255, 255, 255, 0.05)"
        align="center"
        justify="center">
        {!collapsed && (
          <Heading
            size="md"
            cursor="pointer"
            color="#fbd000"
            mr={4}
            onClick={() => router.push("/")}>
            Trials Tracker
          </Heading>
        )}
        {collapsed && (
          <Heading
            size="md"
            color="white"
            mr={collapsed ? 0 : 4}
            cursor="pointer"
            onClick={onClick}>
            <GiHamburgerMenu />
          </Heading>
        )}
      </Flex>
    </Box>
  );
};
