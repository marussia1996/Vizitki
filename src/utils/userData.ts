import {TToken, TUser} from "../services/AuthContext";
import {LocalStorageKeys, RoleType} from "../services/types/types";
import {getFromLocalStorage} from "./localStorage";

export type TGetUserData = {
  user: TUser | null, token: TToken | null, role: RoleType | null
}

export const getUserData = async (): Promise<TGetUserData> =>
  //для 
  new Promise((resolve) => {
    console.log('getUserData');
    setTimeout(async () => {
      const user = getFromLocalStorage<TUser>(LocalStorageKeys.User);
      const token = getFromLocalStorage<TToken>(LocalStorageKeys.Token);
      const role = getFromLocalStorage<RoleType>(LocalStorageKeys.Role, RoleType.Student);
      resolve({user, token, role})
    }, 1000)
  });