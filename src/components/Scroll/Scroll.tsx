import React, { FC, ReactNode } from "react";

import styles from './Scroll.module.scss';

type Props = {
    children: ReactNode;
    mix?:string;
}

const Scroll: FC<Props> = ({ children, mix }) => {

    return (
        <div className={[styles.Scroll, mix].join(' ')}>
            {children}
        </div>
        )
}

export default Scroll;