import React, { FC } from 'react'
import { TButtonView } from '../../services/types/types';
import styles from '../Button/Button.module.scss'
import classnames from "classnames";

let cx = classnames.bind(styles);
type Props = { 
  text: string; 
  view: TButtonView; 
  disabled?: boolean;  
  onClick: ()=>void; 
  type: 'button' | 'reset' | 'submit'
}
export const Button: FC<Props> = ({text, view, disabled, onClick, type}) => {
  const cxButton = cx(styles.button, {
    [styles['buttonLarge']]: view === TButtonView.LARGE,
    [styles['buttonSmall']]: view === TButtonView.SMALL
});
  return (
    <button className={cxButton} disabled={disabled} onClick={onClick} type={type}>{text}</button>
  )
}
