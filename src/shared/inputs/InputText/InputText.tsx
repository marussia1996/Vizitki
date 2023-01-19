import React, {forwardRef} from "react";
import Input from "../Input/Input";
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";

type TInputTextProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & TInputWrapperProps

const InputText = forwardRef<HTMLInputElement, TInputTextProps>((props, ref) => {
  const {labelText, mix, error, description, ...rest} = props;
  return (
    <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
      <Input className={mix || undefined} {...rest} ref={ref}/>
    </InputWrapper>
  );
})

export default InputText;