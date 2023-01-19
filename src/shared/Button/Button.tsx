import React, { FC, SyntheticEvent } from 'react'
import styles from './Button.module.scss'
import classnames from "classnames";

interface Props
    extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'size'>> {
    size?: 'Small' | 'Large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    htmlType: 'button' | 'submit' | 'reset';
    disabled?: boolean; 
}
let cx = classnames.bind(styles);

export const Button: FC<Props> = ({children, size = 'Large', disabled, onClick, htmlType}) => {
  const cxButton = cx(styles.button, {
    [styles[`button${size}`]]: size,
});
  return (
    <button className={cxButton} disabled={disabled} onClick={onClick} type={htmlType}>{children}</button>
  )
}
