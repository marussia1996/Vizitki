import React, { FC } from "react";
import cx from "classnames";

import styles from './InputText.module.scss';

type Props = {
    labelText?: string;
    mix?:string;
}

const InputText:FC<Props> = ({ labelText,  mix, ...rest }) => {
    

    return (
        <>
            {labelText && <label className={styles.Label}>{labelText}</label>}
            <input className={[styles.InputText, mix].join(' ')} {...rest} />
        </>
    )
}

export default InputText;