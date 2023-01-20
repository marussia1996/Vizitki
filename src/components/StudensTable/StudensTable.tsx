import React, {
  ChangeEvent,
  FC,
  forwardRef,
  Fragment,
  MouseEvent,
  useCallback,
  useEffect, useImperativeHandle,
  useRef,
  useState
} from "react";
import {TStudent} from "../../services/types/types";
import Scroll from "../Scroll/Scroll";
import StudentRowEdit from "../StudentRowEdit/StudentRowEdit";
import StudentRowRead from "../StudentRowRead/StudentRowRead";
import {Table, Thead, Th, Tbody} from "../Table/Table";

type TStudentRow = TStudent;

const studentsDataMock: TStudentRow[] = [
  {
    id: '1',
    number: 1,
    email: 'test@test.ru',
    name: 'TestName TestSurname',
  },
  {
    id: '2',
    number: 2,
    email: 'test@test.ru',
    name: 'TestName TestSurname',
  },
  {
    id: '3',
    number: 3,
    email: 'test@test.ru',
    name: 'TestName TestSurname',
  },
  {
    id: '4',
    number: 4,
    email: 'test@test.ru',
    name: 'TestName TestSurname',
  },
]

export type TStudentForm = {
  id?: string;
  number?: number;
  email?: string;
  name?: string;
}

type TStudentsTableProps = {}

interface IAddStudentHandle {
  addStudents: (students: TStudent[]) => void;
}

const StudentTable: React.ForwardRefRenderFunction<IAddStudentHandle, TStudentsTableProps> = ((props, ref) => {

  const [students, setStudents] = useState<TStudentRow[]>(studentsDataMock);

  const [form, setForm] = useState<TStudentForm>({});

  const refTable = useRef(null);
  
  useImperativeHandle(ref, () => ({
    addStudents(newStudents){
      console.log(newStudents);
      setStudents([...students, ...newStudents])
    }
  }));

  const sendRequest = useCallback(() => {
    console.log('SEND REQUEST MOCK', form);
    setForm({});
  }, [form])

  const handleClickRow = (id: string) => {
    console.log('Clik', id);
    const studentsEdited = [...students];
    const editStudentIndex = students.findIndex(student => student.number.toString() === id);

    if (editStudentIndex !== -1) {
      sendRequest();
      setForm({...studentsEdited[editStudentIndex]});
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {value, name} = event.target;
    setForm({...form, [name]: value});
  }


  useEffect(() => {
    const clickDisableEdit: any = (event: MouseEvent) => {
      //@ts-ignore
      if (refTable.current && !refTable.current.contains(event.target)) {
        console.log('You clicked outside of me!');
        sendRequest();
      }
    }
    document.addEventListener('click', clickDisableEdit);
    return () => {
      document.removeEventListener('click', clickDisableEdit);
    }
  }, [refTable, students, setStudents, sendRequest])

  return (
    <Scroll>
      <Table refTable={refTable}>
        <Thead>
          <Th>{'Номер кагорты'}</Th>
          <Th>{'E-mail'}</Th>
          <Th>{'Имя и фамилия студента'}</Th>
        </Thead>
        <Tbody>
          {students.map(student =>
            <Fragment key={student.id}>
              {student.id && student.id === form.id ? (
                  <StudentRowEdit
                    form={form}
                    onChange={handleChange}
                  />)
                : (
                  <StudentRowRead
                    number={student.number}
                    email={student.email}
                    name={student.name}
                    onClick={handleClickRow}
                  />)}
            </Fragment>
          )}
        </Tbody>
      </Table>
    </Scroll>
  )
});

export default forwardRef(StudentTable);