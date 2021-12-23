import React from "react";

export const useHover = () => {
  const [hovered, setHovered] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener("mouseover", () => setHovered(true));
      node.addEventListener("mouseout", () => setHovered(false));

      return () => {
        node.removeEventListener("mouseover", () => setHovered(true));
        node.removeEventListener("mouseout", () => setHovered(false));
      };
    }
  }, []);

  return { ref, hovered };
};
