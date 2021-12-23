import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useHover } from "../util/hooks/handlers/useHover";
import { BuildContainer, Value } from "./Containers";

interface WeaponsProps {
  imageUrl: string;
  name: string;
  subTitle: string;
  perks?: any[];
}

interface PerksProps {
  name: string;
  icon: string;
  description: string;
}

const Perk: React.FC<PerksProps> = ({ name, icon, description }) => {
  const { ref, hovered } = useHover();

  const [overlay, setOverlay] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!hovered) setOverlay(false);
    const debounce = setTimeout(() => {
      if (hovered) setOverlay(true);
    }, 500);

    return () => clearTimeout(debounce);
  }, [hovered]);

  return (
    <React.Fragment>
      <Flex align="center" gridGap={1} ref={ref}>
        <Image
          w="1.25rem"
          src={"https://bungie.net/" + icon}
          alt={name}
          rounded="md"
        />
        <Text color="white" opacity={hovered ? 1 : 0.6} fontSize="12px">
          {name}
        </Text>
      </Flex>
      {overlay && (
        <Box position="relative">
          <Box
            fontSize="14px"
            px={2}
            zIndex={99}
            color="white"
            position="relative"
            background="#1f1f1e"
            rounded="md">
            <span style={{ fontWeight: "bold" }}>{name}</span>: {description}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export const WeaponItem: React.FC<WeaponsProps> = ({
  imageUrl,
  name,
  subTitle,
  perks,
}) => {
  return (
    <BuildContainer src={imageUrl} size="44px">
      <Box flex={1}>
        <Heading size="sm" color="white">
          {name}
        </Heading>
        <Text fontSize="14px" color="white">
          {subTitle}
        </Text>
      </Box>
      <Flex align="center" flex={1} gridGap={1} wrap="wrap">
        {perks &&
          perks.map((perk: any, index) =>
            perk.hasIcon && typeof perk.name === "string" ? (
              <Perk {...perk} key={index} />
            ) : null
          )}
      </Flex>
    </BuildContainer>
  );
};
