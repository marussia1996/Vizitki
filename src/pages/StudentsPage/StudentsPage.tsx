import React, {ChangeEvent, Fragment, useCallback, useEffect, useState} from 'react';

import styles from './StudentsPage.module.scss';
import {AddFile} from '../../components/AddFile/AddFile';
import Scroll from '../../components/Scroll/Scroll';
import StudentRowEdit from '../../components/StudentRowEdit/StudentRowEdit';
import StudentRowRead from '../../components/StudentRowRead/StudentRowRead';
import {SwitchInfo} from '../../components/Switch/Switch';
import {Table, Tbody, Th, Thead} from '../../components/Table/Table';
import {useFetching} from '../../hooks/useFetching';
import InputFilter from '../../shared/inputs/InputFilter/InputFilter';
import importFromFile from '../../utils/file-imports';
import {TStudent, BaseFiedsRaw, UserAccountRaw} from '../../services/types/types';
import {getUsers} from '../../utils/api';
import * as uuid from "uuid";
import {Button} from '../../shared/Button/Button';
import {compare} from '../../utils/utils';
import Loader from '../../components/Loader/Loader';

export type TUserRestRaw = BaseFiedsRaw & UserAccountRaw & { name: string };

export type TStudentForm = {
  _id?: string;
  cohort?: string;
  email?: string;
  name?: string;
}

export enum TStudentAction {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

type TStudentTable = {
  _id: string;
  cohort: string;
  name: string;
  email: string;
  isNew?: boolean;
  action?: TStudentAction;
}

const filterTable = (student: TStudentTable, filter: string) => {
  return compare(student.name, filter) || compare(student.email, filter) || compare(student.cohort, filter)
}

const StudentsPage = () => {

  const [filter, setFilter] = useState<string>('');
  const [students, setStudents] = useState<TStudentTable[]>([]);
  const [form, setForm] = useState<TStudentForm>({});
  const [isFetching, setFetching] = useState<boolean>(true);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  const handleClearFilter = () => {
    setFilter('');
  }

  const [isLoading, error, fetching] = useFetching(async ([file]) => {
    const data = await importFromFile<TStudent>(file);
    const preparedStudents: TStudentTable[] = [...data];
    preparedStudents.forEach(s => {
      s._id = uuid.v4();
      s.action = TStudentAction.ADD;
      s.isNew = true;
    })
    setStudents([...students, ...data]);
  });

  const onFileSelect = (file: File) => {
    fetching(file);
  }

  const sendRequest = useCallback(() => {
    console.log('SEND REQUEST MOCK', form);
    setForm({});
  }, [form])

  const handleClickRow = (id: string) => {
    const studentsEdited = [...students];
    const editStudentIndex = students.findIndex(student => student._id === id);

    if (editStudentIndex !== -1) {
      setForm({...studentsEdited[editStudentIndex]});
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {value, name} = event.target;
    setForm({...form, [name]: value});
  }

  const handleLostFocus = () => {
    const studentsEdited = [...students];
    const student = students.find(student => student._id === form._id);
    if (student) {
      student.name = form.name ? form.name : '';
      student.email = form.email ? form.email : '';
      student.cohort = form.cohort ? form.cohort : '';
      student.action = TStudentAction.UPDATE;
      setStudents(studentsEdited);
      setForm({});
    }
  }

  const handleClickDelete = (id: string) => {
    const studentsEdited = [...students];
    const student = students.find(student => student._id === id);

    if (student) {
      if (student.isNew) {
        setStudents([...studentsEdited.filter(student => student._id !== id)])
      } else {
        student.cohort = 'deleted'
        student.action = TStudentAction.DELETE
        setStudents(studentsEdited);
      }
    }
  }

  useEffect(() => {
    setFetching(true);
    getUsers().then(data => {
      if (data) {
        const items = data.items.sort((prev, next) => prev.updatedAt - next.updatedAt);
        setStudents(items);
      }
    }).then(() => {
      setFetching(false);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const handleClickSort = (header: 'name' | 'email' | 'cohort') => {
    setStudents([...students.sort((prev, next) => (prev[header] > next[header]) ? 1 : ((next[header] > prev[header]) ? -1 : 0))])
  }

  const isChanges: boolean = students.some(student => !!student.action);
  const studentsFiltered = students.filter(student => filterTable(student, filter));
  const isEmptyTable = studentsFiltered.length === 0;

  return (
    <section className={styles.StudensPage}>
      <div className={styles.Filter}>
        <SwitchInfo/>
        <InputFilter
          name={'filter'}
          title="Фильтровать"
          value={filter}
          placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
          onChange={handleFilterChange}
          onClear={handleClearFilter}
          mix={styles.InputTableFilter}
        />
      </div>
      <div className={styles.AddFile}>
        <AddFile onFileSelect={onFileSelect} disabled={isLoading}/>
        <Button
          size={'Small'}
          htmlType={'button'}
          disabled={!isChanges}
          onClick={sendRequest}
        >
          Подтвердить
        </Button>
      </div>
      {isFetching ? (
        <Loader/>
      ) : (
        <div className={styles.TableContent}>
          {isEmptyTable ? (
            <p className={styles.EmptySearch}>Не удалось никого найти. Исправьте запрос или сбросьте фильтр</p>
          ) : (
            <>
              <Scroll mix={styles.ScrollCommentTable}>
                <Table>
                  <Thead>
                    <Th onClick={(event) => {
                      handleClickSort('cohort')
                    }}>{'Номер кагорты'}</Th>
                    <Th onClick={(event) => {
                      handleClickSort('email')
                    }}>{'E-mail'}</Th>
                    <Th onClick={(event) => {
                      handleClickSort('name')
                    }}>{'Имя и фамилия студента'}</Th>
                    <Th> </Th>
                  </Thead>
                  <Tbody>
                    {studentsFiltered.map(student =>
                      <Fragment key={student._id}>
                        {student._id && student._id === form._id ? (
                            <StudentRowEdit
                              form={form}
                              onChange={handleChange}
                              onLostFocus={handleLostFocus}
                            />)
                          : (
                            <StudentRowRead
                              id={student._id}
                              cohort={student.cohort}
                              email={student.email}
                              name={student.name}
                              status={!student.isNew ? 'modify' : 'default'}
                              onClick={handleClickRow}
                              onDelete={handleClickDelete}
                              editable={!student.isNew ? false : true}
                            />)}
                      </Fragment>
                    )}
                  </Tbody>
                </Table>
              </Scroll>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default StudentsPage;
