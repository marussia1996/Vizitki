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
        //@ts-ignore
        <Tr onClick={handleClick} >
            <Td>
                {/* @ts-ignore */}
                <InputText mix={styles.CellValue} value={number} disable />
            </Td>
            <Td>
                {/* @ts-ignore */}
                <InputText mix={styles.CellValue} value={email} disable />
            </Td>
            <Td>
                {/* @ts-ignore */}
                <InputText mix={styles.CellValue} value={name} disable />
            </Td>
        </Tr>
    )
}

export default StudentRowRead;