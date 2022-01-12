import { Flex, Box, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ActiveFilters } from "../../components/matches/ActiveFilters";
import { Filter } from "../../components/matches/manip/Filter";
import { Sort } from "../../components/matches/manip/Sort";
import { Matches } from "../../components/matches/Matches";
import { Header } from "../../components/overview/Heading";
import { Searchbar } from "../../components/Searchbar";
import { CLASSES, SORT_BY, STATUS, TRIALS_MAPS } from "../../util/constants";
import { sortMatchesCallback } from "../../util/functions";
import { useObserver } from "../../util/hooks/handlers/useObserver";
import { useMatchesQuery } from "../../util/queries/useMatchesQuery";
import { useProfileQuery } from "../../util/queries/useProfileQuery";
import { Match } from "../../util/types";

export type Filter = {
  [key: string]: string[];
};

const hasNoFilters = (filters: Filter) => {
  return (
    Object.values(filters).filter(
      (filter) => filter.length === 1 && filter[0] === "All"
    ).length === Object.keys(filters).length
  );
};

const Content: React.FC<{ loading: boolean }> = ({ loading }) => {
  const isSmall = useBreakpointValue({ base: true, lg: false });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useMatchesQuery();
  const [filteredMatches, setFilteredMatches] = React.useState<Match[]>([]);

  const target = React.useRef<any>(null);

  const [filters, setFilters] = React.useState<Filter>({
    Map: ["All"],
    Character: ["All"],
    Status: ["All"],
    "Sort By": ["All"],
  });

  useObserver(target, fetchNextPage, !!hasNextPage && hasNoFilters(filters));

  const changeFilter = (key: string, value: string) => {
    let parsed = [...filters[key].filter((x) => x !== value)];
    if (parsed.length === 0) parsed = ["All"];
    console.log(parsed);
    setFilters({
      ...filters,
      [key]: parsed,
    });
  };

  const changeFilterArray = (key: string, values: string[]) => {
    setFilters({ ...filters, [key]: values });
  };

  const changeSort = (key: string, value: string) => {
    setFilters({
      ...filters,
      "Sort By": [value],
    });
  };

  console.log(data);

  React.useEffect(() => {
    if (data === undefined) return;
    const cached: any[] = [].concat(
      ...data.pages.map((x: any) => x.items.matches)
    );
    if (cached === undefined || cached.length === 0) return;
    // determine which filters are not all
    const temp = { ...filters };

    const result = cached.filter((match) => {
      const parsed = temp.Status.includes("All")
        ? -1
        : temp.Status.includes("Win")
        ? 0
        : 1;
      const statusCondition = parsed === -1 ? true : match.standing === parsed;

      const mapCondition =
        temp.Map.includes("All") ||
        temp.Map.includes(match.displayProperties.name);
      const characterCondition =
        temp.Character.includes("All") ||
        temp.Character.includes(data.pages[0].page[match.character].class);

      return mapCondition && characterCondition && statusCondition;
    });

    setFilteredMatches(sortMatchesCallback(filters["Sort By"][0], result));
  }, [data, filters]);

  return (
    <Flex flexDir="column" py={4} align="center" justify="center">
      <Flex flexDir="column" w={{ base: "100%", md: "80%" }}>
        {isSmall ? (
          <Flex align="center" justify="center" mb={8}>
            <Searchbar />
          </Flex>
        ) : null}

        <Box px={14}>
          <Header isSmall={isSmall} />
        </Box>
        {!loading && (
          <Box px={14} mt={4}>
            <Box mb={6} w="100%">
              <Flex
                w="100%"
                align="center"
                justify={isSmall ? "center" : "space-between"}
                gridGap={2}
                flexDir={isSmall ? "column-reverse" : "row"}>
                <ActiveFilters filters={filters} callback={changeFilter} />
                <Flex align="center" gridGap={4} flexWrap="wrap">
                  <Filter
                    heading="Status"
                    callback={changeFilterArray}
                    values={STATUS}
                    active={filters.Status}
                  />
                  <Filter
                    heading="Map"
                    callback={changeFilterArray}
                    values={TRIALS_MAPS}
                    active={filters.Map}
                  />
                  <Filter
                    heading="Character"
                    callback={changeFilterArray}
                    values={CLASSES}
                    active={filters.Character}
                  />

                  <Sort
                    heading="Sort By"
                    callback={changeSort}
                    values={SORT_BY}
                    selected={filters["Sort By"][0]}
                  />
                </Flex>
              </Flex>
            </Box>

            <Flex align="center" justify="center" w="100%">
              {data && (
                <Matches matches={filteredMatches} pages={data.pages[0].page} />
              )}
            </Flex>
            {isFetchingNextPage &&
              hasNextPage &&
              hasNoFilters(filters) &&
              filteredMatches.length > 0 && (
                <Flex align="center" justify="center" py={2}>
                  <Spinner color="#fbd000" />
                </Flex>
              )}

            <Box h="5px" w="100%" ref={target} />
          </Box>
        )}
        {loading && (
          <Flex align="center" justify="center" h="80vh">
            <Spinner color="#fbd000" />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export const MatchesPage: NextPage = () => {
  const { isLoading, isError } = useMatchesQuery();
  const { isLoading: loading } = useProfileQuery();

  return (
    <Box w="100%" maxH="100vh" overflow="auto">
      {loading ? (
        <Flex align="center" justify="center" w="100%">
          <Spinner color="#fbd000" />
        </Flex>
      ) : (
        <React.Fragment>
          <Content loading={isLoading} />
        </React.Fragment>
      )}
    </Box>
  );
};

const MatchesRoute = () => {
  const router = useRouter();
  const membershipId =
    typeof router.query.id === "string" ? router.query.id : "";

  React.useEffect(() => {
    router.push({
      pathname: `/${membershipId}`,
      query: { path: "matches" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membershipId]);

  return null;
};

export default MatchesRoute;
