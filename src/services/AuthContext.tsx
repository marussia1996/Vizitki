import React, {createContext, FC, PropsWithChildren, useMemo} from 'react'
import {useNavigate} from 'react-router-dom';
import {useLocalStorage} from "../hooks/useLocalStorage";
import {Routes} from "../shared/routes";
import {LocalStorageKeys, RoleType} from "./types/types";

export type TUser = {
  _id: string,
  email: string,
  name: string,
  cohort: string,
  image: string,
};

type TAuthContext = {
  user: TUser | null
  token: TToken | null
  login: (token: TToken, user: TUser, canNavigate?: boolean) => Routes
  logout: () => void
  role: RoleType;
  updateRole: (role: RoleType) => void;
}

export type TToken = {
  token: string,
  expired: string
}

export const AuthContext = createContext<TAuthContext>({
  user: null,
  token: null,
  role: RoleType.Student,
  login: () => Routes.Home,
  logout: () => null,
  updateRole: () => null,
});

type TAuthProviderProps = {
  tokenData: TToken | null,
  userData: TUser | null,
  roleData: RoleType
}

export const AuthProvider: FC<PropsWithChildren<TAuthProviderProps>> = ({
                                                                          children,
                                                                          tokenData,
                                                                          userData,
                                                                          roleData = RoleType.Student
                                                                        }) => {

  const [user, setUser] = useLocalStorage<TUser | null>(LocalStorageKeys.User, userData);

  const [token, setToken] = useLocalStorage<TToken | null>(LocalStorageKeys.Token, tokenData);

  const [role, setRole] = useLocalStorage<RoleType>(LocalStorageKeys.Role, roleData);


  const navigate = useNavigate();

  const login = (token: TToken | null, user: TUser | null, canNavigate = true) => {
    setToken(token);
    setUser(user);
    const routes = Routes.Home;
    if (canNavigate) {
      navigate(routes, {replace: true});
    }
    return routes;
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate(Routes.Home, {replace: true});
  }

  const updateRole = (role: RoleType) => {
    setRole(role);
    if (user) {
      navigate(role === RoleType.Curator ? Routes.Admin : Routes.Home, {replace: true});
    }
  }

  const value = useMemo(() => ({user, token, login, logout, role, updateRole}), [user, token, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
