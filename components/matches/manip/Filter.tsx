import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { ManipulationContainer } from "./ManipulationContainer";

interface FilterProps {
  heading: string;
  values: string[];
  active: string[];
  callback: (key: string, value: string[]) => void;
}

export const Filter: React.FC<FilterProps> = ({
  heading,
  callback,
  values,
  active,
}) => {
  const [temp, setTemp] = React.useState<string[]>(active);

  // easier to handle state this way
  React.useEffect(() => {
    setTemp(active);
  }, [active]);

  const handleCheck = (value: string) => {
    if (value === "All") {
      callback(heading, ["All"]);
      return;
    }

    let parsed = [...temp];
    if (temp.includes(value)) parsed = parsed.filter((x) => x !== value);
    else parsed = [...parsed.filter((x) => x !== "All"), value];

    callback(heading, parsed);
  };

  React.useEffect(() => {
    if (
      (temp.length === values.length - 1 && !temp.includes("All")) ||
      temp.length === 0
    ) {
      callback(heading, ["All"]);
    }
  }, [callback, heading, temp, values]);

  return (
    <ManipulationContainer heading={heading}>
      {values.map((i) => (
        <MenuItem
          iconSpacing={0}
          _hover={{ background: "#1d1d1d" }}
          _focus={{ background: "transparent" }}
          color="white"
          fontWeight={temp.includes(i) ? "bold" : "normal"}
          key={i}
          onClick={() => {
            handleCheck(i);
          }}>
          {temp.includes(i) ? "✓" : ""} {i}
        </MenuItem>
      ))}
    </ManipulationContainer>
  );
};
