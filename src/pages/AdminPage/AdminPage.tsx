import React, { ChangeEvent, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AddFile } from "../../components/AddFile/AddFile";
import CommentsTable from "../../components/CommentsTable/CommentsTable";
import InputFilter from "../../shared/inputs/InputFilter/InputFilter";
import StudentTable from "../../components/StudensTable/StudensTable";
import { SwitchInfo } from "../../components/Switch/Switch";

import styles from './AdminPage.module.scss';

const AdminPage = () => {
    //TODO: функция фильтрации по значению в inputFilter
    //TODO: функция парсинга файлов полученнных через AddFile
    //TODO: сортировка списка при нажатии на заголовки таблицы
    //TODO: удаление строчек при нажатии на крестик в таблице комментариев
    //TODO: при изменении инпутов в таблице студентов отправка изменений на сервер
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
                    name={'filter'}
                    title="Фильтровать"
                    value={filter}
                    placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
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