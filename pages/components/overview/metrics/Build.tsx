import { Flex, Box, Heading, Text, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { useDataContext } from "../../../../util/DataContext";
import { Subclass, Weapon } from "../../../../util/types";

interface ClassProps {
  subclass: Subclass;
}

interface WeaponsProps {
  weapons: Weapon[];
}

interface BuildContainerProps {
  size: string;
  src: string;
}

const BuildContainer: React.FC<BuildContainerProps> = ({
  size,
  src,
  children,
}) => {
  return (
    <Flex align="center" gridGap={2}>
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
        <BuildContainer src={weapon.imageUrl} size="44px" key={weapon.hash}>
          <Box>
            <Heading size="sm" color="white">
              {weapon.name}
            </Heading>
            <Text fontSize="13px" color="white">
              {weapon.subTitle}
            </Text>
          </Box>
        </BuildContainer>
      ))}
    </Stack>
  );
};

export const Build: React.FC = () => {
  const { overviewData: data } = useDataContext();

  return (
    <Box px={8}>
      {data && <ClassBuild subclass={data.subclass} />}
      {data && <WeaponsBuild weapons={data.weapons} />}
    </Box>
  );
};
