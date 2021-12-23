import { Menu, MenuButton, Button, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

export const ManipulationContainer: React.FC<{ heading: string }> = ({
  heading,
  children,
}) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        size="sm"
        _hover={{ background: "#171717" }}
        _active={{ background: "#171717" }}
        background="#171717"
        color="white"
        rightIcon={<BsChevronDown />}>
        {heading}
      </MenuButton>
      <MenuList background="#171717" maxH="60vh" color="white" overflow="auto">
        {children}
      </MenuList>
    </Menu>
  );
};
