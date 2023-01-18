import styles from './InputTextArea.module.scss';
import {forwardRef} from 'react';
import React from 'react'
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";

type TInputTextAreaProps =
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  & TInputWrapperProps
  & {
  maxLength?: number,
  name: string,
  value: string
}

export const InputTextArea = forwardRef<HTMLTextAreaElement, TInputTextAreaProps>((props, ref) => {

  const {labelText, mix, error, maxLength=100, description, ...rest} = props;

  const placeholder = `Не более ${maxLength} символов`;

  return (
    <div>
      <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
        <textarea {...rest}
                  className={styles.textArea}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  ref={ref}
        />
      </InputWrapper>
    </div>
  )
});