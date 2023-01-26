import React, {FC} from "react";
import {useOutlet} from "react-router-dom";

const AdminPage: FC = () => {
  const outlet = useOutlet();
  return (
    <>
      {outlet}
    </>
  )
}

/*
<Switch>
                <Route path={path} exact>
                        <CommentsPage />
                </Route>
                <Route path={`${path}/users`} exact>
                        <StudentsPage/>
                </Route>
            </Switch>
*/

export default AdminPage;