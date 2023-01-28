import React, { SyntheticEvent } from "react";
import { Td, Tr } from "../Table/Table";
import deleteIcon from '../../images/delete_icon.svg';

import styles from './CommentRowRead.module.scss';
import DeleteButton from "../../shared/DeleteButton/DeleteButton";

type Props = {
    id: string;
    cohort?: string;
    date?: Date;
    from: string;
    to: string;
    target?: string | null;
    text: string;
    onClickDelete?: (id: string) => void,
};

const CommentRowRead = ({ id, cohort, date, from, to, target, text, onClickDelete = (id) => { } }: Props) => {
    const handleClickDelete = (event: SyntheticEvent) => {
        event.stopPropagation();
        onClickDelete(id)
    }

    return (
        <Tr>
            <Td>
                <div className={styles.CellValue}>{cohort ? cohort : '-'}</div>
            </Td>
            <Td>
                <div className={styles.CellValue}>{date ? date.toLocaleDateString() : '-'}</div>
            </Td>
            <Td>
                <div className={styles.CellValue}>{from}</div>
            </Td>
            <Td>
                <div className={styles.CellValue}>{to}</div>
            </Td>
            <Td>
                <div className={styles.CellValue}>{target ? target : '-'}</div>
            </Td>
            <Td>
                <span className={styles.CellTextValue}>{text}</span>
            </Td>
            <Td className={styles.DeleteCell}>
                <DeleteButton onClick={handleClickDelete}/>
            </Td>
        </Tr>
    )
}

export default CommentRowRead;