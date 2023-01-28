import React, {FC} from 'react';
import BasePage from "./BasePage";
import {useAuth} from "../../hooks/useAuth";
import {Navigate, useOutlet} from "react-router-dom";
import {RoleType} from "../../services/types/types";
import {Routes} from "../../shared/routes";

const LoginLayout: FC = () => {

  const {user, role} = useAuth();

  const outlet = useOutlet();

  if (user) {
    return <Navigate to={role === RoleType.Student ? Routes.Home : Routes.Admin}></Navigate>
  }

  return (
    <BasePage>
      {outlet}
    </BasePage>
  );
};

export default LoginLayout;