import React from "react";

type SidebarContextType = {
  active: string;
  setActive: (active: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextType>({
  active: "Overview",
  setActive: (active: string) => {},
  collapsed: false,
  setCollapsed: (collapsed: boolean) => {},
});

export const useSidebar = () => {
  const [active, setActive] = React.useState<string>("Overview");
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  return {
    active,
    setActive,
    collapsed,
    setCollapsed,
  };
};
export const useSidebarContext = () => React.useContext(SidebarContext);

export default SidebarContext;
