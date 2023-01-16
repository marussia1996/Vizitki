import React, {forwardRef} from 'react';
import css from './Input.module.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, ref) => {
  return (
    <input {...rest} className={className ? className : css.input} ref={ref} />
  );
});

export default Input;