import React, { FC, LegacyRef, HTMLProps } from "react";

import styles from './Table.module.scss';

type PropsTable = HTMLProps<HTMLTableElement> & {
    refTable?: LegacyRef<HTMLTableElement>;
}

export const Table: FC<PropsTable & { mix?: string }>  = ({ children, refTable, mix = '', ...rest }) => {
    return (
        <table className={[styles.Table, mix].join(' ')} ref={refTable} {...rest}>
            {children}
        </table>
    )
};

export const Thead: FC<HTMLProps<HTMLTableSectionElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <thead className={[styles.Thead, mix].join(' ') } {...rest}>
            <tr>
                {children}
            </tr>
        </thead>
    )
};

export const Tbody: FC<HTMLProps<HTMLTableSectionElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <tbody className={mix} {...rest}>
            {children}
        </tbody>
    )
};

export const Th: FC<HTMLProps<HTMLTableCellElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <th className={[styles.Th, mix].join(' ')} {...rest}>
            {children}
        </th>
    )
};

export const Td: FC<HTMLProps<HTMLTableCellElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <td className={[styles.Td, mix].join(' ') } {...rest}>
            {children}
        </td>
    )
};

export const Tr: FC<HTMLProps<HTMLTableRowElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <tr className={[styles.Tr, mix].join(' ')} {...rest}>
            {children}
        </tr>
    )
};