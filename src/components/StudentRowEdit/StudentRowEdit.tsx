import React, { ChangeEvent } from "react";
import InputText from "../../shared/inputs/InputText/InputText";
import { TStudentForm } from "../../pages/StudentsPage/StudentsPage";
import { Td, Tr } from "../Table/Table";

import styles from './StudentRowEdit.module.scss';

type Props = {
    form: TStudentForm,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onLostFocus?: () => void;
};

const StudentRowEdit = ({ form = {}, onChange = (event) => { },onLostFocus = () => { } }: Props) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onChange(event);
    }

    const handleBlur = () => {
        onLostFocus();
    }

    return (
        <Tr>
            <Td>
                <InputText
                    mix={styles.Input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.cohort}
                    name={'cohort'}
                    type={'string'}
                />
            </Td>
            <Td>
                <InputText
                    mix={styles.Input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.email}
                    name={'email'}
                    type={'email'}
                    
                />
            </Td>
            <Td>
                <InputText
                    mix={styles.Input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.name}
                    name={'name'}
                    type={'text'}
                />
            </Td>
        </Tr>
    )
}

export default StudentRowEdit;