import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ChakraProvider,
  Flex,
  Spinner,
  StylesProvider,
  useBreakpointValue,
} from "@chakra-ui/react";
import SidebarContext, { useSidebar } from "../util/SidebarContext";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Router, useRouter } from "next/router";

const StyledSpinner = () => (
  <Flex h="100vh" w="100%" align="center" justify="center" background="#1f1f1e">
    <Spinner color="#fbd000" />
  </Flex>
);

function MyApp({ Component, pageProps }: AppProps) {
  const sidebar = useSidebar();
  const router = useRouter();

  const [queryClient] = React.useState(() => new QueryClient());
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 1484 && sidebar.collapsed === false)
          sidebar.setCollapsed(true);
      };
      window.addEventListener("resize", handleResize);
    }
  }, [sidebar]);

  React.useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url !== router.asPath && setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <SidebarContext.Provider value={{ ...sidebar }}>
            {loading ? <StyledSpinner /> : <Component {...pageProps} />}
          </SidebarContext.Provider>
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
