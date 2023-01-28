import React, {FC} from 'react';
import styles from './InputWrapper.module.scss';
import classnames from "classnames";

export type TInputWrapperProps = {
  labelText?: string;
  mix?: string;
  error?: string;
  description?: string,
  children?: React.ReactNode
}
let cx = classnames.bind(styles);
const InputWrapper: FC<TInputWrapperProps> = (props) => {
  const {labelText, error, mix, description} = props;
  const cxWrapper = cx(styles.inputWrapper, {
    [styles[`${mix}`]]: mix,
});
  return (
    <div className={cxWrapper}>
      {labelText && <label className={styles.label}>{labelText}</label>}
      {props.children}
      {error && <span className={styles.error}>{error}</span>}
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
};

export default InputWrapper;