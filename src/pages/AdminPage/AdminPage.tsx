import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import StudentsPage from "../StudentsPage/StudentsPage";
import CommentsPage from "../CommentsPage/CommentsPage";

const AdminPage = () => {
    let { path } = useRouteMatch();

    return (
            <Switch>
                <Route path={path} exact>
                        <CommentsPage />
                </Route>
                <Route path={`${path}/users`} exact>
                        <StudentsPage/>
                </Route>
            </Switch>
    )
}

export default AdminPage;