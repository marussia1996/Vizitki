import React, { ReactNode, FC, LegacyRef } from "react";

import styles from './Table.module.scss';

type Props = {
    children: ReactNode;
};

type PropsTable = Props & {
    refTable?: LegacyRef<HTMLTableElement>;
}

export const Table: FC<PropsTable> = ({ children,refTable, ...rest }) => {
    return (
        <table className={styles.Table} ref={refTable} {...rest}>
            {children}
        </table>
    )
};

export const Thead: FC<Props> = ({ children, ...rest }) => {
    return (
        <thead className={styles.Thead} {...rest}>
            <tr>
                {children}
            </tr>
        </thead>
    )
};

export const Tbody: FC<Props> = ({ children, ...rest }) => {
    return (
        <tbody {...rest}>
            {children}
        </tbody>
    )
};

export const Th: FC<Props> = ({ children, ...rest }) => {
    return (
        <th className={styles.Th} {...rest}>
            {children}
        </th>
    )
};

export const Td: FC<Props> = ({ children, ...rest }) => {
    return (
        <td className={styles.Td} {...rest}>
            {children}
        </td>
    )
};

export const Tr: FC<Props> = ({ children, ...rest }) => {
    return (
        <tr className={styles.Tr} {...rest}>
            {children}
        </tr>
    )
};