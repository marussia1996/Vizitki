import React, { FC, LegacyRef, HTMLProps } from "react";

import styles from './Table.module.scss';

type PropsTable = HTMLProps<HTMLTableElement> & {
    refTable?: LegacyRef<HTMLTableElement>;
}

export const Table: FC<PropsTable & { mix?: string }>  = ({ children, refTable, mix = '', ...rest }) => {
    return (
        <div className={[styles.Table, mix].join(' ')} ref={refTable} {...rest}>
            {children}
        </div>
    )
};

export const Thead: FC<HTMLProps<HTMLTableSectionElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <div className={[styles.Thead, mix].join(' ') } {...rest}>
                {children}
        </div>
    )
};

export const Tbody: FC<HTMLProps<HTMLTableSectionElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <div className={[styles.Tbody, mix].join(' ')} {...rest}>
            {children}
        </div>
    )
};

export const Th: FC<HTMLProps<HTMLTableCellElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <div className={[styles.Th, mix].join(' ')} {...rest}>
            {children}
        </div>
    )
};

export const Td: FC<HTMLProps<HTMLTableCellElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <div className={[styles.Td, mix].join(' ') } {...rest}>
            {children}
        </div>
    )
};

export const Tr: FC<HTMLProps<HTMLTableRowElement> & { mix?: string }> = ({ children, mix = '', ...rest }) => {
    return (
        <div className={[styles.Tr, mix].join(' ')} {...rest}>
            {children}
        </div>
    )
};