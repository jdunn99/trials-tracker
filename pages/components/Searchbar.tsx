import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useOutsideClick } from "../../util/hooks/useOutsideClick";
import { UserCard } from "./UserCard";

interface SearchbarInputProps {
  onFocus: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roundedBottom: string;
  value: string;
}

const SearchbarInput: React.FC<SearchbarInputProps> = ({
  onFocus,
  onChange,
  roundedBottom,
  value,
}) => {
  return (
    <InputGroup w="334px" pl="1px">
      <InputLeftElement pointerEvents="none" color="white">
        <BsSearch />
      </InputLeftElement>
      <Input
        _focus={{
          border: "none",
          borderBottom: "1px solid #171717",
          background: "#171717",
        }}
        border="none"
        onFocus={onFocus}
        placeholder="Search"
        background="#171717"
        rounded="md"
        roundedBottom={roundedBottom}
        value={value}
        size="md"
        color="white"
        onChange={onChange}
        width="100%"
      />
    </InputGroup>
  );
};

interface SearchResultProps {
  active: boolean;
  result: any[];
  clearInput: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  active,
  result,
  clearInput,
}) => {
  return active ? (
    <Flex
      position="relative"
      flexDir="column"
      zIndex={99}
      border="1px solid #171717">
      <Flex
        flexDir="column"
        maxH="70vh"
        zIndex={99}
        background="#171717"
        w={result.length > 9 ? "333px" : "333px"}
        overflow="auto"
        roundedBottom="md"
        position="absolute"
        align="center">
        {result.map((item: any) => {
          const parsed = item.platformUserHandle.split("#");
          return (
            <Box key={item.platformUserId} flex={1} w="100%" px={2}>
              <UserCard
                setData={clearInput}
                id={item.platformUserId}
                avatarUrl={item.avatarUrl}
                parsed={parsed}
                status={item.status}
              />
            </Box>
          );
        })}
      </Flex>
    </Flex>
  ) : null;
};

interface OverlayProps {
  active: boolean;
}
const Overlay: React.FC<OverlayProps> = ({ active }) => {
  return active ? (
    <Box
      w="100%"
      h="100%"
      position="absolute"
      top={0}
      left={0}
      right={-20}
      opacity={0.55}
      background="black"
    />
  ) : null;
};

export const Searchbar: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [active, setActive] = React.useState<boolean>(false);

  const overlay = useBreakpointValue({ base: true, lg: false });

  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (active === false) return;
    setInput("");
    setActive(false);
  });

  React.useEffect(() => {
    const debounce = setTimeout(async () => {
      if (input === "") return; // avoid unncessary initial query
      setActive(true);
      const response = await fetch(
        `http://localhost:4000/destiny/users/${encodeURIComponent(input)}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      const json = await response.json();

      setSearchResult(json.data);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [input]);

  return (
    <React.Fragment>
      <Box ref={ref} zIndex={1}>
        <SearchbarInput
          onFocus={() => setActive(true)}
          onChange={(event) => setInput(event.target.value)}
          roundedBottom={active && searchResult.length > 0 ? "none" : "md"}
          value={input}
        />
        <SearchResult
          active={!!active && searchResult.length > 0}
          result={searchResult}
          clearInput={() => setInput("")}
        />
      </Box>
      <Overlay active={!!active && searchResult.length > 0 && !!overlay} />
    </React.Fragment>
  );
};
