import React, {forwardRef} from 'react';
import css from './Input.module.scss'

type TInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, TInputProps>(({ className, ...rest }, ref) => {
  const style = className ? [css.input, className].join(' ') : css.input;
  return (
    <input {...rest} className={style} ref={ref} />
  );
});

export default Input;