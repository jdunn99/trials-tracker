import {
  Box,
  Flex,
  Heading,
  Text,
  Img,
  styled,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
  useQuery,
} from "react-query";
import { CharacterCard } from "../../components/CharacterCard";
import { Header } from "../../components/overview/Heading";
import { Searchbar } from "../../components/Searchbar";
import { Sidebar } from "../../components/Sidebar";
import { WeaponItem } from "../../components/Weapon";
import { useGuardiansQuery } from "../../util/queries/useGuardiansQuery";

const Stat: React.FC<{ value: string; imgSrc: string }> = ({
  value,
  imgSrc,
}) => {
  return (
    <Flex align="center" gridGap={1}>
      <Text color="white" fontWeight="bold" fontSize="18px">
        {value}
      </Text>
      <Img src={imgSrc} alt={value} w="2rem" />
    </Flex>
  );
};

const Equipment: React.FC<{
  perks: any[];
  displayProperties: any;
  itemTypeAndTierDisplayName: string;
  index: number;
}> = ({ perks, displayProperties, itemTypeAndTierDisplayName, index }) => {
  return (
    <Box
      p={4}
      background={index % 2 !== 0 ? "transparent" : "#16181C"}
      borderBottom="1px solid rgba(255, 255, 255, 0.1)">
      <WeaponItem
        name={displayProperties.name}
        perks={perks}
        subTitle={itemTypeAndTierDisplayName}
        imageUrl={"http://bungie.net/" + displayProperties.icon}
      />
    </Box>
  );
};

export const Guardians: NextPage = () => {
  const isSmall = useBreakpointValue({ base: true, lg: false });
  const { data } = useGuardiansQuery();

  return (
    <Box maxH="100vh" zIndex={1} background="#1F1F1E">
      {data && (
        <Box w="100%" py={4} h="100vh" overflow="auto">
          {isSmall ? (
            <Flex align="center" justify="center" mb={8}>
              <Searchbar />
            </Flex>
          ) : null}
          <Box px={14}>
            <Header isSmall={isSmall} />
          </Box>
          <Flex
            flexDir={isSmall ? "column" : "row"}
            align="center"
            justify={
              data.Response.characters.length < 3 ? "center" : "space-around"
            }
            gridGap={4}
            px={14}
            w="100%"
            mx="auto">
            {data.Response.characters.map((character: any) => (
              <Box key={character.characterId} flex={1} w="100%" pt={2}>
                <CharacterCard
                  isSmall={true}
                  {...character}
                  className={character.class.className}
                />
                <Box w="100%" background="#171717">
                  <Flex
                    align="center"
                    gridGap={4}
                    p={2}
                    wrap="wrap"
                    justify="center"
                    borderBottom="1px solid rgba(255,255,255,0.1)">
                    {character.stats.map((stat: any) => (
                      <Stat
                        key={stat.name}
                        value={stat.value}
                        imgSrc={"https://bungie.net/" + stat.imgSrc}
                      />
                    ))}
                  </Flex>
                  <Stack spacing={0} pt={2} maxH="70vh" overflow="auto">
                    {character.equipment.map(
                      (equipment: any, index: number) => (
                        <Equipment
                          {...equipment}
                          index={index}
                          key={equipment.itemHash}
                        />
                      )
                    )}
                  </Stack>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

const GuardiansRoute = () => {
  const router = useRouter();
  const membershipId =
    typeof router.query.id === "string" ? router.query.id : "";

  React.useEffect(() => {
    router.push({
      pathname: `/${membershipId}`,
      query: { path: "guardians" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membershipId]);

  return null;
};

export default GuardiansRoute;
