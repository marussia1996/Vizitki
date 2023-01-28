import React, {FC} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Navigate, useOutlet} from "react-router-dom";
import {Routes} from "../../shared/routes";
import BasePage from "./BasePage";

const ProtectedLayout: FC = () => {
  const {user} = useAuth();

  const outlet = useOutlet();

  if (!user) {
    return <Navigate to={Routes.Login}/>
  }

  return (
    <BasePage>
      {outlet}
    </BasePage>
  );
};

export default ProtectedLayout;