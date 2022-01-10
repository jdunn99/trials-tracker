import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsGlobe, BsPersonFill } from "react-icons/bs";
import { IoLogoGameControllerB } from "react-icons/io";
import { useSidebarContext } from "../util/SidebarContext";
import React from "react";
import { SidebarHeading } from "./sidebar/SidebarHeading";
import { SidebarItem } from "./sidebar/SidebarItem";
import { useRouterQuery } from "../util/hooks/router/useRouterQuery";
import { SidebarDrawer } from "./sidebar/SidebarDrawer";

export const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const { id } = useRouterQuery(["id"]);

  const SidebarContainer: React.FC = ({ children }) => (
    <Box
      minW={collapsed ? "54px" : "14%"}
      h="100vh"
      background="#171717"
      borderRight="1px solid rgba(255, 255, 255, 0.01)">
      {children}
    </Box>
  );

  const isSmall = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(isSmall, collapsed);
  const openSidebar = () => {
    if (isSmall) {
      // open drawer
      onOpen();
    } else {
      setCollapsed(false);
    }
  };

  return id.length > 0 ? (
    <React.Fragment>
      {isOpen && <SidebarDrawer onClose={onClose} id={id} />}
      <SidebarContainer>
        <Flex h="100%" direction="column" justify="space-between">
          <Box>
            <SidebarHeading onClick={openSidebar} />
            <Stack spacing="12px" my={2} px={collapsed ? 1 : 4}>
              <SidebarItem icon={<BsGlobe />} label="Overview" id={id} />
              <SidebarItem
                icon={<IoLogoGameControllerB />}
                label="Matches"
                id={id}
              />
              <SidebarItem icon={<BsPersonFill />} label="Guardians" id={id} />
            </Stack>
          </Box>
        </Flex>
      </SidebarContainer>
    </React.Fragment>
  ) : null;
};
