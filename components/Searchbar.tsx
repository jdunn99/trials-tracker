import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useDebounce } from "../util/hooks/handlers/useDebounce";
import { useOutsideClick } from "../util/hooks/handlers/useOutsideClick";
import { useSearchQuery } from "../util/queries/useSearchQuery";
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
  isLoading: boolean;
  result: any[];
}

const SearchResult: React.FC<SearchResultProps> = ({
  active,
  result,
  isLoading,
}) => {
  return active && result && result.length > 0 ? (
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
        w={result && result.length > 9 ? "333px" : "333px"}
        overflow={isLoading ? "hidden" : "auto"}
        roundedBottom="md"
        position="absolute"
        align="center">
        {isLoading ? (
          <Box py={2}>
            <Spinner color="#fbd000" />
          </Box>
        ) : (
          result &&
          result.map((item: any) => {
            const parsed = item.platformUserHandle.split("#");
            return (
              <Box key={item.platformUserId} flex={1} w="100%" px={2}>
                <UserCard
                  id={item.platformUserId}
                  avatarUrl={item.avatarUrl}
                  parsed={parsed}
                  status={item.status}
                />
              </Box>
            );
          })
        )}
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
  const debouncedInput = useDebounce(input, 300);

  const [active, setActive] = React.useState<boolean>(false);
  const overlay = useBreakpointValue({ base: true, lg: false });
  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (active === false) return;
    setInput("");
    setActive(false);
  });

  const { isLoading, data } = useSearchQuery(debouncedInput);

  const shouldRender = data && data.length > 0;
  return (
    <React.Fragment>
      <Box ref={ref} zIndex={1}>
        <SearchbarInput
          onFocus={() => setActive(true)}
          onChange={(event) => setInput(event.target.value)}
          roundedBottom={!!active && shouldRender > 0 ? "none" : "md"}
          value={input}
        />
        <SearchResult active={!!active} isLoading={isLoading} result={data} />
      </Box>
      <Overlay active={!!active && shouldRender > 0 && !!overlay} />
    </React.Fragment>
  );
};
