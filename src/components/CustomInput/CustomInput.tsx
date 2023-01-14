import React, {forwardRef} from "react";
import iconCalendarDefault from '../../images/calendarDefault.svg'
import stylesInput from '../CustomInput/CustomInput.module.scss'

interface InputProps {
  className?: string;
  value: string;
  onFocus: () => void;
  onChange: () => void;
  onClick: () => void;
}
const CustomInput: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const {value, onClick, onFocus, onChange} = props;
  return (
    <>
    <input
      className={`${stylesInput.input}`}
      type="text"
      value={value}
      ref={ref}
      onFocus={onFocus}
      onChange={onChange}
      onClick={onClick}
    ></input>
    {/* Если при отправке поле не заполнено выдавать ошибку  ${stylesInput.errorActive}*/}
    <span className={`${stylesInput.error} `}>Поле обязательно для заполнения</span>
      <div className={`${stylesInput.wrapper}`} onClick={onClick}>
        <img className={`${stylesInput.icon}`} src={iconCalendarDefault} alt='иконка календаря'/>
      </div>
    </>
  );
};
export const ForwardedInput = React.forwardRef(CustomInput);
