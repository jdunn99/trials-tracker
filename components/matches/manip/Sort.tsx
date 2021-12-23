import { MenuItem } from "@chakra-ui/react";
import { ManipulationContainer } from "./ManipulationContainer";

interface SortProps {
  heading: string;
  values: string[];
  selected: string;
  callback: (key: string, value: string) => void;
}

export const Sort: React.FC<SortProps> = ({
  callback,
  heading,
  values,
  selected,
}) => {
  return (
    <ManipulationContainer heading={heading}>
      {values.map((i) => (
        <MenuItem
          iconSpacing={0}
          _hover={{ background: "#1d1d1d" }}
          _focus={{ background: "transparent" }}
          color="white"
          fontWeight={selected === i ? "bold" : "normal"}
          key={i}
          onClick={() => {
            callback(heading, i);
          }}>
          {selected === i ? "✓" : ""} {i}
        </MenuItem>
      ))}
    </ManipulationContainer>
  );
};
