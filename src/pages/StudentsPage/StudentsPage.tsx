import React, { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react';

import styles from './StudentsPage.module.scss';
import { AddFile } from '../../components/AddFile/AddFile';
import Scroll from '../../components/Scroll/Scroll';
import StudentRowEdit from '../../components/StudentRowEdit/StudentRowEdit';
import StudentRowRead from '../../components/StudentRowRead/StudentRowRead';
import { SwitchInfo } from '../../components/Switch/Switch';
import { Table, Tbody, Th, Thead } from '../../components/Table/Table';
import { useFetching } from '../../hooks/useFetching';
import InputFilter from '../../shared/inputs/InputFilter/InputFilter';
import importFromFile from '../../utils/file-imports';
import { TStudent, BaseFiedsRaw, UserAccountRaw } from '../../services/types/types';
import { getUsers, postUser, putUser } from '../../utils/api';
import * as uuid from "uuid";
import { Button } from '../../shared/Button/Button';
import { compare } from '../../utils/utils';
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
  const [isUploadFile, setUploadFile] = useState<boolean>(false);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  const handleClearFilter = () => {
    setFilter('');
  }

  const [isLoading, , fetching] = useFetching(async ([file]) => {
    const data = await importFromFile<TStudent>(file);
    const preparedStudents: TStudentTable[] = [...data];
    preparedStudents.forEach(s => {
      s._id = uuid.v4();
      s.action = TStudentAction.ADD;
      s.isNew = true;
    })
    setStudents([...data, ...students]);
    setUploadFile(true);
  });

  const onFileSelect = (file: File) => {
    fetching(file);
  }

  const sendRequest = useCallback(() => {
    students.forEach(student => {
      if (student.isNew) {
        postUser(student.email, student.cohort)
          .then(res => {
            const studentsEdited = [...students];
            const editStudent = studentsEdited.find(stItem => stItem._id === student._id);

            if (editStudent) {
              editStudent.isNew = false;
              editStudent.action = undefined;

              setStudents([editStudent, ...studentsEdited.filter(stItem => stItem._id !== student._id)])
            }
          })
          .catch(err => {
            console.log(err);
          })
      }

      if (!student.isNew && (
        student.action === TStudentAction.DELETE
        || student.action === TStudentAction.UPDATE
      )) {
        putUser(student.email, student.cohort, student._id)
          .then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
      }
    })
    setForm({});
  }, [form, students])

  const handleClickRow = (id: string) => {
    const studentsEdited = [...students];
    const editStudentIndex = students.findIndex(student => student._id === id);

    if (editStudentIndex !== -1) {
      setForm({ ...studentsEdited[editStudentIndex] });
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
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

  const handleClickClear = () => {
    setStudents((students) => students.filter(student => !student.isNew));
    setUploadFile(false);
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
        <SwitchInfo />
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
        <AddFile onFileSelect={onFileSelect} disabled={isLoading} />
        {isUploadFile &&
          <>
            <p className={styles.Text}>Проверьте, что загруженные данные корректны и сохраните их или удалите и загрузите заново.</p>
            <div className={styles.TakeChanges}>
              <Button
                size={'Small'}
                htmlType={'button'}
                disabled={!isChanges}
                onClick={handleClickClear}
                type='cancel'
              >
                Удалить
              </Button>
              <Button
                size={'Small'}
                htmlType={'button'}
                disabled={!isChanges}
                onClick={sendRequest}
                type='accept'
              >
                Сохранить
              </Button>
            </div>
          </>}
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        <div className={styles.TableContent}>
          {isEmptyTable ? (
            <p className={styles.EmptySearch}>Не удалось никого найти. Исправьте запрос или сбросьте фильтр</p>
          ) : (
            <Scroll mix={styles.ScrollCommentTable}>
              <Table>
                <Thead>
                  <Th onClick={() => {
                    handleClickSort('cohort')
                  }}>{'Номер кагорты'}</Th>
                  <Th onClick={() => {
                    handleClickSort('email')
                  }}>{'E-mail'}</Th>
                  <Th onClick={() => {
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
                            isDeletable={!student.isNew}
                          />)}
                    </Fragment>
                  )}
                </Tbody>
              </Table>
            </Scroll>
          )}
        </div>
      )}
    </section>
  )
}

export default StudentsPage;
