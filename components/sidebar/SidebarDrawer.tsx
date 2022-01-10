import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsGlobe, BsPersonFill } from "react-icons/bs";
import { IoLogoGameControllerB } from "react-icons/io";
import { SidebarHeading } from "./SidebarHeading";
import { SidebarItem } from "./SidebarItem";

export const SidebarDrawer: React.FC<{
  onClose: () => void;
  id: string;
}> = ({ id, onClose, children }) => {
  const { push } = useRouter();
  return (
    <Drawer isOpen={true} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent background="#171717" w="30vw">
        <DrawerCloseButton color="#fbd000" />
        <DrawerHeader>
          <Heading
            size="md"
            cursor="pointer"
            color="#fbd000"
            mr={4}
            onClick={() => push("/")}>
            Trials Tracker
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="12px" my={2} px={1}>
            <SidebarItem icon={<BsGlobe />} label="Overview" id={id} isOpen />
            <SidebarItem
              icon={<IoLogoGameControllerB />}
              label="Matches"
              isOpen
              id={id}
            />
            <SidebarItem
              icon={<BsPersonFill />}
              label="Guardians"
              id={id}
              isOpen
            />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
