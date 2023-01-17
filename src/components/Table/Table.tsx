import React, { FC, LegacyRef, HTMLProps } from "react";

import styles from './Table.module.scss';

type PropsTable = HTMLProps<HTMLTableElement> & {
    refTable?: LegacyRef<HTMLTableElement>;
}

export const Table: FC<PropsTable> = ({ children,refTable, ...rest }) => {
    return (
        <table className={styles.Table} ref={refTable} {...rest}>
            {children}
        </table>
    )
};

export const Thead: FC<HTMLProps<HTMLTableSectionElement>> = ({ children, ...rest }) => {
    return (
        <thead className={styles.Thead} {...rest}>
            <tr>
                {children}
            </tr>
        </thead>
    )
};

export const Tbody: FC<HTMLProps<HTMLTableSectionElement>> = ({ children, ...rest }) => {
    return (
        <tbody {...rest}>
            {children}
        </tbody>
    )
};

export const Th: FC<HTMLProps<HTMLTableCellElement>> = ({ children, ...rest }) => {
    return (
        <th className={styles.Th} {...rest}>
            {children}
        </th>
    )
};

export const Td: FC<HTMLProps<HTMLTableCellElement>> = ({ children, ...rest }) => {
    return (
        <td className={styles.Td} {...rest}>
            {children}
        </td>
    )
};

export const Tr: FC<HTMLProps<HTMLTableRowElement>> = ({ children, ...rest }) => {
    return (
        <tr className={styles.Tr} {...rest}>
            {children}
        </tr>
    )
};