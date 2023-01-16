import React, { SyntheticEvent } from "react";
import InputText from "../InputText/InputText";
import { Td, Tr } from "../Table/Table";

import styles from './StudentRowRead.module.scss';

type Props = {
    number: number,
    email: string,
    name: string,
    onClick?: (id: string) => void,
};

const StudentRowRead = ({ number, email, name, onClick = (id) => { } }: Props) => {
    const handleClick = (event: SyntheticEvent) => {
        event.stopPropagation();
        //FIXME: При подключении API нужно заменить на ID пользователя т.е. уникальный ключ
        onClick(number.toString())
    }

    return (
        <Tr onClick={handleClick} >
            <Td>
                <InputText mix={styles.CellValue} value={number} disabled />
            </Td>
            <Td>
                <InputText mix={styles.CellValue} value={email} disabled />
            </Td>
            <Td>
                <InputText mix={styles.CellValue} value={name} disabled />
            </Td>
        </Tr>
    )
}

export default StudentRowRead;