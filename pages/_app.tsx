import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, useBreakpointValue } from "@chakra-ui/react";
import SidebarContext, { useSidebar } from "../util/SidebarContext";
import React from "react";
import DataContext, { useData } from "../util/DataContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { active, setActive, collapsed, setCollapsed } = useSidebar();
  const { ...rest } = useData();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 1484 && collapsed === false) setCollapsed(true);
      };
      window.addEventListener("resize", handleResize);
    }
  }, [collapsed, setCollapsed]);

  return (
    <ChakraProvider>
      <DataContext.Provider value={{ ...rest }}>
        <SidebarContext.Provider
          value={{ active, setActive, collapsed, setCollapsed }}>
          <Component {...pageProps} />
        </SidebarContext.Provider>
      </DataContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
