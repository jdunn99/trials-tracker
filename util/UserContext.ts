import React from "react";

export type User = {
  id: string;
  avatarUrl: string;
  status: string;
  name: string;
  bungieCode: string;
  platformIcons: number[];
};

type UserContextType = {
  activeUser: User | null;
  setActiveUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const UserContext = React.createContext<UserContextType>({
  activeUser: null,
  setActiveUser: () => {},
  loading: false,
  setLoading: () => {},
});

export const useUser = () => {
  const [activeUser, setActiveUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  return { activeUser, setActiveUser, loading, setLoading };
};
export const useUserContext = () => React.useContext(UserContext);

export default UserContext;
