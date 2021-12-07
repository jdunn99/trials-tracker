import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { AiFillEye } from "react-icons/ai";
import { BsGlobe, BsPersonFill } from "react-icons/bs";
import { IoLogoGameControllerB } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebarContext } from "../../util/SidebarContext";
import React from "react";
import { useHover } from "../../util/hooks/useHover";

const SidebarHeading = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Box py={4} px={2}>
      <Flex
        py={4}
        borderBottom="1px solid rgba(255, 255, 255, 0.05)"
        align="center"
        justify="center">
        {!collapsed && (
          <Heading size="md" color="#fbd000" mr={4}>
            Trials Tracker
          </Heading>
        )}
        {collapsed && (
          <Heading
            size="md"
            color="white"
            mr={collapsed ? 0 : 4}
            cursor="pointer"
            onClick={() => setCollapsed(!collapsed)}>
            <GiHamburgerMenu />
          </Heading>
        )}
      </Flex>
    </Box>
  );
};

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
  const { active, setActive, collapsed } = useSidebarContext();
  const { ref, hovered } = useHover();

  const [overlay, setOverlay] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!hovered) setOverlay(false);
    const debounce = setTimeout(() => {
      if (hovered && collapsed) setOverlay(true);
    }, 500);

    return () => clearTimeout(debounce);
  }, [collapsed, hovered]);

  const isActive = active === label;

  const conditionalStyles = {
    background: isActive ? "#1F1F1E" : "transparent",
    opacity: isActive ? 1 : 0.6,
    onClick: () => (isActive ? null : setActive(label)),
    _hover: isActive ? {} : { opacity: 1, background: "#1F1F1E" },
    color: isActive ? (collapsed ? "#FBD000" : "white") : "white",
    px: collapsed ? 0 : 4,
    justify: collapsed ? "center" : "flex-start",
  };

  return (
    <Flex
      ref={ref}
      rounded="md"
      align="center"
      height="48px"
      cursor="pointer"
      {...conditionalStyles}>
      <Heading size="md" mr={collapsed ? 0 : 5}>
        {icon}
      </Heading>
      {!collapsed && <Text size="sm">{label}</Text>}
      {overlay && (
        <Flex
          background="#171717"
          position="absolute"
          left="55px"
          rounded="md"
          color="white"
          h="44px"
          px={2}
          justify="center"
          align="center">
          <Heading size="sm">{label}</Heading>
        </Flex>
      )}
    </Flex>
  );
};

export const Sidebar = () => {
  const { collapsed } = useSidebarContext();

  const SidebarContainer: React.FC = ({ children }) => (
    <Box
      minW={collapsed ? "54px" : "14%"}
      h="100vh"
      background="#171717"
      borderRight="1px solid rgba(255, 255, 255, 0.01)">
      {children}
    </Box>
  );

  return (
    <SidebarContainer>
      <Flex h="100%" direction="column" justify="space-between">
        <Box>
          <SidebarHeading />
          <Stack spacing="12px" my={2} px={collapsed ? 1 : 4}>
            <SidebarItem icon={<BsGlobe />} label="Overview" />
            <SidebarItem icon={<IoLogoGameControllerB />} label="Matches" />
            <SidebarItem icon={<BsPersonFill />} label="Guardians" />
          </Stack>
        </Box>
      </Flex>
    </SidebarContainer>
  );
};
