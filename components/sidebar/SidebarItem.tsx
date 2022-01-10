import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useHover } from "../../util/hooks/handlers/useHover";
import { useRouterQuery } from "../../util/hooks/router/useRouterQuery";
import { useSidebarContext } from "../../util/SidebarContext";

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  id: string;
  isOpen?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  id,
  isOpen,
}) => {
  const [overlay, setOverlay] = React.useState<boolean>(false);

  const { path } = useRouterQuery(["path"]);
  const { push } = useRouter();

  const { active, setActive, collapsed: tempCollapsed } = useSidebarContext();
  const { ref, hovered } = useHover();

  const collapsed = React.useMemo(() => {
    return isOpen === undefined ? tempCollapsed : !isOpen;
  }, [isOpen, tempCollapsed]);

  const parsedRoute = React.useMemo(() => {
    if (path === "") return "Overview";
    return path[0].toLocaleUpperCase() + path.slice(1);
  }, [path]);

  React.useEffect(() => {
    if (parsedRoute !== label) setActive(parsedRoute);
  }, [label, parsedRoute, setActive]);

  React.useEffect(() => {
    if (!hovered) setOverlay(false);
    const debounce = setTimeout(() => {
      if (hovered && collapsed) setOverlay(true);
    }, 500);

    return () => clearTimeout(debounce);
  }, [collapsed, hovered]);

  const isActive = active === label;

  const conditionalStyles = React.useMemo(
    () => ({
      background: isActive ? "#1F1F1E" : "transparent",
      opacity: isActive ? 1 : 0.6,
      onClick: () => {
        if (isActive) return;
        setActive(label);
        push(
          { pathname: `/${id}/`, query: { path: label.toLocaleLowerCase() } },
          undefined,
          {
            shallow: true,
          }
        );
      },
      _hover: isActive ? {} : { opacity: 1, background: "#1F1F1E" },
      color: isActive ? (collapsed ? "#FBD000" : "white") : "white",
      px: collapsed ? 0 : 4,
      justify: collapsed ? "center" : "flex-start",
    }),
    [collapsed, id, isActive, label, push, setActive]
  );

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
