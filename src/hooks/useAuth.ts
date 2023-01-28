import {useContext} from "react";
import {AuthContext} from "../services/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
}