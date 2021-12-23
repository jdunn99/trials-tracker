import { Flex, Box, Heading, Text, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { useOverviewQuery } from "../../../util/queries/useOverviewQuery";
import { Subclass, Weapon } from "../../../util/types";
import { WeaponItem } from "../../Weapon";

interface ClassProps {
  subclass: Subclass;
}

interface WeaponsProps {
  weapons: Weapon[];
}

interface BuildContainerProps {
  size: string;
  src: string;
  key?: any;
}

const BuildContainer: React.FC<BuildContainerProps> = ({
  size,
  src,
  key,
  children,
}) => {
  return (
    <Flex align="center" gridGap={2} key={key}>
      <Image width={size} height={size} src={src} rounded="md" alt={src} />
      <Box>{children}</Box>
    </Flex>
  );
};

const ClassBuild: React.FC<ClassProps> = ({ subclass }) => {
  return (
    <BuildContainer src={subclass.imageUrl} size="56px">
      <Heading size="md" color="white">
        {subclass.name}
      </Heading>
      <Flex align="center" gridGap={2}>
        {subclass.perks.map((perk) => (
          <Text color="white" fontSize="13px" key={perk.name}>
            {perk.name}
          </Text>
        ))}
      </Flex>
    </BuildContainer>
  );
};

const WeaponsBuild: React.FC<WeaponsProps> = ({ weapons }) => {
  return (
    <Stack spacing={2} mt={4}>
      {weapons.map((weapon) => (
        <WeaponItem {...weapon} key={weapon.hash} />
      ))}
    </Stack>
  );
};

export const Build: React.FC = () => {
  const { data } = useOverviewQuery();

  return (
    <Box px={8}>
      {data && <ClassBuild subclass={data.Response.subclass} />}
      {data && <WeaponsBuild weapons={data.Response.weapons} />}
    </Box>
  );
};
