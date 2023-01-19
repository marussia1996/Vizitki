import React, { ChangeEvent } from "react";
import InputText from "../../shared/inputs/InputText/InputText";
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

    return (
        <Tr>
            <Td>
                <InputText
                    mix={styles.Input}
                    onChange={handleChange}
                    value={form.number}
                    name={'number'}
                    type={'number'}
                />
            </Td>
            <Td>
                <InputText
                    mix={styles.Input}
                    onChange={handleChange}
                    value={form.email}
                    name={'email'}
                    type={'email'}
                    
                />
            </Td>
            <Td>
                <InputText
                    mix={styles.Input}
                    onChange={handleChange}
                    value={form.name}
                    name={'name'}
                    type={'text'}
                />
            </Td>
        </Tr>
    )
}

export default StudentRowEdit;