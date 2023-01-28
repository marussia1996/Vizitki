import React, { SyntheticEvent } from "react";
import InputText from "../../shared/inputs/InputText/InputText";
import { Td, Tr } from "../Table/Table";
import classnames from "classnames";

import styles from './StudentRowRead.module.scss';
import DeleteButton from "../../shared/DeleteButton/DeleteButton";
import { Link } from "react-router-dom";

let cx = classnames.bind(styles);

type Props = {
    id: string,
    cohort: string,
    email: string,
    name: string,
    status?: 'default' | 'modify',
    onClick?: (id: string) => void,
    onDelete?: (id: string) => void,
    editable: boolean,
    isDeletable?: boolean
};

const StudentRowRead = ({ id,
    cohort,
    email,
    name,
    status = 'default',
    onClick = (id) => { },
    onDelete = (id) => { },
    editable,
    isDeletable = true,
}: Props) => {

    const cxRowStatus = cx({
        [styles['RowModify']]: status === 'default'
    });

    const cxCell = cx(styles.CellValue, {
        [styles['CellModifyValue']]: status === 'default'
    });

    const handleClick = (event: SyntheticEvent) => {
        onClick(id);
    }

    const handleDelete = (event: SyntheticEvent) => {
        event.stopPropagation();
        onDelete(id);
    }

    return (
        <Tr onClick={handleClick} mix={cxRowStatus}>
            <Td>
                <InputText mix={cxCell} value={cohort} disabled />
            </Td>
            <Td>
                <InputText mix={cxCell} value={email} disabled />
            </Td>
            <Td>
                {editable ? (
                    <InputText mix={cxCell} value={name} disabled />
                ) : (
                    <Link to={`/students/${id}`}>{name}</Link>
                )}
            </Td>
            <Td className={styles.DeleteCell}>
                {isDeletable && <DeleteButton onClick={handleDelete} /> }
            </Td>
        </Tr>
    )
}

export default StudentRowRead;