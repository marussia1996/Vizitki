import React, { ChangeEvent, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AddFile } from "../../components/AddFile/AddFile";
import CommentsTable from "../../components/CommentsTable/CommentsTable";
import InputFilter from "../../components/InputFilter/InputFilter";
import StudentTable from "../../components/StudensTable/StudensTable";
import { SwitchInfo } from "../../components/Switch/Switch";

import styles from './AdminPage.module.scss';

const AdminPage = () => {

    let { path } = useRouteMatch();

    const [filter, setFilter] = useState<string>()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    const handleClearFilter = () => {
        setFilter('');
    }

    return (
        <section className={styles.AdminPage}>
            <div className={styles.Filter}>
                <SwitchInfo />
                <InputFilter
                    title="Фильтровать"
                    value={filter}
                    placeHolder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
                    onChange={handleChange}
                    onClear={handleClearFilter}
                    mix={styles.InputTableFilter}
                />
            </div>
            <Switch>
                <Route path={path} exact>
                    <div className={styles.TableContent}>
                        <CommentsTable />
                    </div>
                </Route>
                <Route path={`${path}/users`} exact>
                    <div className={styles.AddFile}>
                        <AddFile />
                        </div>
                    <div className={styles.TableContent}>
                        <StudentTable />
                    </div>
                </Route>
            </Switch>
        </section>
    )
}

export default AdminPage;