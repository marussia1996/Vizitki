import React, { SyntheticEvent } from "react";
import { Td, Tr } from "../Table/Table";
import deleteIcon from '../../images/delete_icon.svg';

import styles from './CommentRowRead.module.scss';

type Props = {
    id: string;
    number?: number;
    date?: Date;
    from: string;
    to: string;
    target?: string | null;
    text: string;
    onClickDelete?: (id: string) => void,
};

const CommentRowRead = ({ id, number, date, from, to, target, text, onClickDelete = (id) => { } }: Props) => {
    const handleClickDelete = (event: SyntheticEvent) => {
        event.stopPropagation();
        onClickDelete(id)
    }

    return (
        <Tr>
            <Td>
                <div className={styles.CellValue}>{number ? number : '-'}</div>
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
                <div className={styles.CellTextValue}>{text}</div>
            </Td>
            <Td>
                <button className={styles.DeleteButton} onClick={handleClickDelete}>
                    <img src={deleteIcon} alt='Кнопка удаления' />
                </button>
            </Td>
        </Tr>
    )
}

export default CommentRowRead;