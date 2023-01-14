import React, { FC } from 'react'
import '../Button/Button.scss'

type Props = { text: string; className: 'buttonLarge' | 'buttonSmall'; disabled: boolean;  onClick: ()=>void; type: 'button' | 'reset' | 'submit'}
export const Button: FC<Props> = ({text, className, disabled, onClick, type}) => {
  return (
    <button className={`button ${className}`} disabled={disabled} onClick={onClick} type={type}>{text}</button>
  )
}
