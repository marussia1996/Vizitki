import React, { SyntheticEvent } from 'react';
import deleteIcon from '../../images/delete-icon-trash-can.svg';

import styles from './DeleteButton.module.scss';

type Props = {
    onClick?: (event: SyntheticEvent) => void;
}

const DeleteButton = ({onClick}:Props) => {
    return (
        <button className={styles.DeleteButton} onClick={onClick}>
            <img src={deleteIcon} alt='Кнопка удаления' />
        </button>
    )
}

export default DeleteButton