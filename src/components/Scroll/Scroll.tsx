import React, { FC, ReactNode } from "react";

import styles from './Scroll.module.scss';

type Props = {
    children: ReactNode;
}

const Scroll: FC<Props> = ({ children }) => {

    return (
        <div className={styles.Scroll}>
            {children}
        </div>
        )
}

export default Scroll;