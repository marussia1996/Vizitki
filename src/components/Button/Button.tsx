import React, { FC } from 'react'
import { TButtonProps } from '../../services/types/types'
import '../Button/Button.scss'

export const Button: FC<TButtonProps> = ({children, className, disabled, onClick}) => {
  return (
    <button className={`button ${className}`} disabled={disabled} onClick={onClick}>{children}</button>
  )
}
