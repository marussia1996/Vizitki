import React, {forwardRef} from 'react';
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";
import styles from './InputFilter.module.scss';
import Input from "../Input/Input";
import Icon from "../../Icon/Icon";
import {iconClose} from "../../Icon/lib";
import {TInputChange} from "../index";

type TInputFilterProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & TInputWrapperProps & {
  onClear: (e: TInputChange<string>) => void;
  name: string
}


const InputFilter = forwardRef<HTMLInputElement, TInputFilterProps>((props, ref) => {

  const {labelText, mix, error, description, onClear, ...rest} = props;
  const onClearHandler = () => {
    onClear({
      target: {name: props.name, value: ''}
    })
  }
  
  return (
    <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
      <div className={styles.inputFilterWrap}>
        <Input {...rest} ref={ref} />
        {props.value &&
          <div className={styles.inputFilterCenter}>
            <button className={styles.inputFilterButton} onClick={onClearHandler}>
              <Icon path={iconClose} width={'16px'} height={'16px'}/>
            </button>
          </div>
        }
      </div>
    </InputWrapper>
  );
})

export default InputFilter;