import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { AddFile } from "../../components/AddFile/AddFile";
import CommentsTable from "../../components/CommentsTable/CommentsTable";
import StudentTable from "../../components/StudensTable/StudensTable";
import { SwitchInfo } from "../../components/Switch/Switch";

// import styles from './AdminPage.module.scss';

const AdminPage = () => {

    let { path } = useRouteMatch();

    console.log('Render AdminPage');
    return (
        <section>
            <SwitchInfo /><AddFile/>
            <Link to='/alexey'>ADMIN</Link>
            <Switch>
                <Route path={path} exact>
                    <CommentsTable />
                </Route>
                <Route path={`${path}/users`} exact>
                    <StudentTable />
                </Route>
            </Switch>
        </section>
    )
}

export default AdminPage;