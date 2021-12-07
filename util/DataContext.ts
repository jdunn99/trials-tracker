import React from "react";
import { BungieResponse, OverviewResponse, Profile } from "./types";

type DataType<T> = T | null;

interface DataContextProps {
  profileData: DataType<Profile>;
  overviewData: DataType<OverviewResponse>;
  matchesData: DataType<any>;
  charactersData: DataType<any>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setOverviewData: (data: DataType<OverviewResponse>) => void;
  setMatchesData: (data: DataType<any>) => void;
  setCharactersData: (data: DataType<any>) => void;
  setProfileData: (data: DataType<any>) => void;
}

const DataContext = React.createContext<DataContextProps>({
  profileData: null,
  overviewData: null,
  matchesData: null,
  charactersData: null,
  loading: false,
  setOverviewData: () => {},
  setMatchesData: () => {},
  setCharactersData: () => {},
  setLoading: () => {},
  setProfileData: () => {},
});

export const useData = () => {
  const [overviewData, setOverviewData] =
    React.useState<DataType<OverviewResponse>>(null);
  const [matchesData, setMatchesData] = React.useState<DataType<any>>(null);
  const [charactersData, setCharactersData] =
    React.useState<DataType<any>>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [profileData, setProfileData] = React.useState<DataType<Profile>>(null);

  return {
    overviewData,
    loading,
    profileData,
    setProfileData,
    setLoading,
    matchesData,
    charactersData,
    setOverviewData,
    setMatchesData,
    setCharactersData,
  };
};

export const useDataContext = () => React.useContext(DataContext);

export default DataContext;
