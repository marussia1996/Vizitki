import React, { ChangeEvent, MouseEvent, RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { TStudent } from "../../services/types/types";
import InputText from "../InputText/InputText";
import Scroll from "../Scroll/Scroll";
import { Table, Thead, Th, Tr, Td, Tbody } from "../Table/Table";

type TStudentRows = TStudent & { isEdit: boolean }

const studentsDataMock: TStudentRows[] = [
    {
        number: 1,
        email: 'test@test.ru',
        name: 'TestName TestSurname',
        isEdit: false,
    },
    {
        number: 2,
        email: 'test@test.ru',
        name: 'TestName TestSurname',
        isEdit: false,
    },
    {
        number: 3,
        email: 'test@test.ru',
        name: 'TestName TestSurname',
        isEdit: false,
    },
    {
        number: 4,
        email: 'test@test.ru',
        name: 'TestName TestSurname',
        isEdit: false,
    },
]

const StudentTable = () => {

    const [students, setStudents] = useState<TStudentRows[]>(studentsDataMock);
    const refTable = useRef(null);

    const handleClickRow = (id: string) => {
        console.log('Clik', id);
        const editStudent = students.find(student => student.number.toString() === id);
        if (editStudent) {
            setStudents([...students.filter(student => student.number.toString() !== id), { ...editStudent, isEdit: true }]);
        }
    }


    useEffect(() => {
        const clickDisableEdit: any = (event: MouseEvent) => {
            //@ts-ignore
            if (refTable.current && !refTable.current.contains(event.target)) {
                console.log('You clicked outside of me!');
                setStudents(studentsDataMock);
            }
        }
        document.addEventListener('click', clickDisableEdit);
        return () => {
            document.removeEventListener('click', clickDisableEdit);
        }
    }, [refTable, students,setStudents])

    const StudentRow = ({ number, email, name, isEdit = false, onClick = (id) => { }, onChange = () => { } }: { number: number, email: string, name: string, isEdit?: boolean, onClick?: (id: string) => void, onChange?: () => void }) => {

        const handleClick = (event: SyntheticEvent) => {
            event.stopPropagation();
            //FIXME: При подключении API нужно заменить на ID пользователя т.е. уникальный ключ
            onClick(number.toString())
        }

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { value, name } = event.target;
            console.log(`Change Input name: ${name} value: ${value}`);
            onChange();
        }

        return (
            <>
                {isEdit ? (
                    //TODO: Поправить типизацию функции обработчика
                    //@ts-ignore
                    <Tr>
                        <Td>
                            {/* @ts-ignore */}
                            <InputText onChange={handleChange} name={'number'} />
                        </Td>
                        <Td>
                            {/* @ts-ignore */}
                            <InputText onChange={handleChange} name={'email'} />
                        </Td>
                        <Td>
                            {/* @ts-ignore */}
                            <InputText onChange={handleChange} name={'name'} />
                        </Td>
                    </Tr>
                ) : (
                    //@ts-ignore
                    <Tr onClick={handleClick} >
                        <Td>{number}</Td>
                        <Td>{email}</Td>
                        <Td>{name}</Td>
                    </Tr>
                )}

            </>
        )
    }

    return (
        <Scroll>
            {/* @ts-ignore */}
            <Table refTable={refTable}>
                <Thead>
                    <Th>{'Номер кагорты'}</Th>
                    <Th>{'E-mail'}</Th>
                    <Th>{'Имя и фамилия студента'}</Th>
                </Thead>
                <Tbody>
                    {students.map(student =>
                        <StudentRow
                            key={student.number}
                            number={student.number}
                            email={student.email}
                            name={student.email}
                            isEdit={student.isEdit}
                            onClick={handleClickRow}
                        />)}
                </Tbody>
            </Table>
        </Scroll>
    )
};

export default StudentTable;