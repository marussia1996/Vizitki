import React, { FC, HTMLProps } from "react";

import styles from './InputText.module.scss';

type Props = HTMLProps<HTMLInputElement> & {
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