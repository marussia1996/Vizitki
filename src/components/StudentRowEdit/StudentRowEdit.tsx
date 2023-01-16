import React, { ChangeEvent } from "react";
import InputText from "../InputText/InputText";
import { TStudentForm } from "../StudensTable/StudensTable";
import { Td, Tr } from "../Table/Table";

import styles from './StudentRowEdit.module.scss';

type Props = {
    form: TStudentForm,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
};

const StudentRowEdit = ({ form = {}, onChange = (event) => { } }: Props) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onChange(event);
    }

    //TODO: Поправить типизацию функции обработчика
    return (
        <Tr>
            <Td>
                <InputText
                    //  @ts-ignore
                    onChange={handleChange}
                    value={form.number}
                    name={'number'}
                    type={'number'}
                    mix={styles.Input}
                />
            </Td>
            <Td>
                <InputText
                    // @ts-ignore
                    onChange={handleChange}
                    value={form.email}
                    name={'email'}
                    type={'email'}
                    mix={styles.Input}
                />
            </Td>
            <Td>
                <InputText
                    //@ts-ignore
                    onChange={handleChange}
                    value={form.name}
                    name={'name'}
                    type={'text'}
                    mix={styles.Input}
                />
            </Td>
        </Tr>
    )
}

export default StudentRowEdit;