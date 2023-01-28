import React, {FC} from "react";
import {useOutlet} from "react-router-dom";

const AdminPage: FC = () => {
  return useOutlet();
}

export default AdminPage;