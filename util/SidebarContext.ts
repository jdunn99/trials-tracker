import React from "react";

type SidebarContextType = {
  active: string;
  collapsed: boolean;
  hasData: boolean;
  setHasData: (hasData: boolean) => void;
  setActive: (active: string) => void;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextType>({
  hasData: false,
  setHasData: (hasData: boolean) => {},
  active: "Overview",
  setActive: (active: string) => {},
  collapsed: false,
  setCollapsed: (collapsed: boolean) => {},
});

export const useSidebar = () => {
  const [active, setActive] = React.useState<string>("Overview");
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [hasData, setHasData] = React.useState<boolean>(false);

  return {
    hasData,
    setHasData,
    active,
    setActive,
    collapsed,
    setCollapsed,
  };
};
export const useSidebarContext = () => React.useContext(SidebarContext);

export default SidebarContext;
