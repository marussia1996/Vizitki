import React, {FC} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Navigate, useOutlet} from "react-router-dom";
import {Routes} from "../../shared/routes";
import BasePage from "./BasePage";
import {RoleType} from "../../services/types/types";

const AdminLayout: FC = () => {
  const {user, role} = useAuth();

  const outlet = useOutlet();

  if (!user) {
    return <Navigate to={Routes.Login}/>
  }

  if (role !== RoleType.Curator) {
    return <Navigate to={Routes.Home}/>
  }

  return (
    <BasePage>
      {outlet}
    </BasePage>
  );
};

export default AdminLayout;