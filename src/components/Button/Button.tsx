import React, { FC } from 'react'
import { TButtonProps } from '../../services/types/types'
import '../Button/Button.scss'

export const Button: FC<TButtonProps> = ({children, className, disabled, onClick, type}) => {
  return (
    <button className={`button ${className}`} disabled={disabled} onClick={onClick} type={type}>{children}</button>
  )
}
