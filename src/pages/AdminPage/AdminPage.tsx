import React, {ChangeEvent, useRef, useState} from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AddFile } from "../../components/AddFile/AddFile";
import CommentsTable from "../../components/CommentsTable/CommentsTable";
import InputFilter from "../../shared/inputs/InputFilter/InputFilter";
import StudentTable from "../../components/StudensTable/StudensTable";
import { SwitchInfo } from "../../components/Switch/Switch";
import styles from './AdminPage.module.scss';
import {useFetching} from "../../hooks/useFetching";
import importFromFile from "../../utils/file-imports";
import {TStudent} from "../../services/types/types";
import * as uuid from "uuid";

const AdminPage = () => {
    //TODO: функция фильтрации по значению в inputFilter
    //TODO: функция парсинга файлов полученнных через AddFile
    //TODO: сортировка списка при нажатии на заголовки таблицы
    //TODO: удаление строчек при нажатии на крестик в таблице комментариев
    //TODO: при изменении инпутов в таблице студентов отправка изменений на сервер
    //TODO: показ ошибки, если данные по фильтру не найдены
    let { path } = useRouteMatch();

    const [filter, setFilter] = useState<string>('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    const handleClearFilter = () => {
        setFilter('');
    }

    type AddStudentHandle = React.ElementRef<typeof StudentTable>;
    const addStudentRef = useRef<AddStudentHandle>(null);
    const {isLoading, error, fetching} = useFetching(async ([file])=> {
      const data = await importFromFile<TStudent>(file);
      data.forEach(s=>s.id = uuid.v4())
      addStudentRef.current?.addStudents(data);
    });
    
    const onFileSelect = (file: File) => {
      fetching(file);
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
                        <AddFile onFileSelect={onFileSelect} disabled={isLoading} />
                    </div>
                    <div className={styles.TableContent}>
                        <StudentTable ref={addStudentRef} />
                    </div>
                </Route>
            </Switch>
        </section>
    )
}

//todo: добавить отображение ошибки ниже <AddFile>

export default AdminPage;