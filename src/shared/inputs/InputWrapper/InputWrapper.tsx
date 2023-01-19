import React, {FC} from 'react';
import styles from './InputWrapper.module.scss';

export type TInputWrapperProps = {
  labelText?: string;
  mix?: string;
  error?: string;
  description?: string,
  children?: React.ReactNode
}

const InputWrapper: FC<TInputWrapperProps> = (props) => {
  const {labelText, error, description} = props;
  return (
    <div className={styles.inputWrapper}>
      {labelText && <label className={styles.label}>{labelText}</label>}
      {props.children}
      {error && <span className={styles.error}>{error}</span>}
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
};

export default InputWrapper;