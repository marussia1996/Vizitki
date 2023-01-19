import React, {forwardRef} from "react";
import DatePicker, {ReactDatePickerCustomHeaderProps} from "react-datepicker";
import {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import './datapicker.scss'
import stylesDay from './InputDay.module.scss'
import Input from "../Input/Input";
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";
import Icon from "../../Icon/Icon";
import {calendarIcon} from "../../Icon/lib";
import {months, years} from "./lib";
import {TInputChange} from "../index";

registerLocale('ru', ru)

type TInputDayProps =
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & TInputWrapperProps
  & {
  name: string,
  date?: Date,
  maxDate?: Date,
  onDateChange: (e:TInputChange<Date>)=>void
}

export const InputDay = forwardRef<HTMLInputElement, TInputDayProps>((props, ref) => {

  const {labelText, mix, error, description} = props;
  
  const {onDateChange, name, date} = props;
  
  const raiseDateChange = (date: Date) => {
    onDateChange({
      target: {name:name, value: date}
    })
  }

  return (
    <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
      <div className={stylesDay.content}>
        <DatePicker
          renderCustomHeader={calendarHeader}
          locale="ru"
          //стиль для открывающейся области
          popperClassName={`${stylesDay.popper}`}
          //положение календаря
          popperPlacement="bottom-end"
          //popperProps={{strategy: 'fixed'}}
          //скрытие треугольника
          showPopperArrow={false}
          //стиль календаря
          calendarClassName={`${stylesDay.calendar}`}
          //для закрытия при скролле страницы
          closeOnScroll={true}
          //максимальная возможная дата для выбора
          maxDate={props.maxDate}
          className={`${stylesDay.input}`}
          dateFormat="dd.MM.yyyy"
          //выбранный элемент
          selected={date}
          customInput={<Input ref={ref}/>}
          onChange={(date) => date && raiseDateChange(date)}
          dayClassName={(date) =>
            (date.getDay() === 0 || date.getDay() === 6) ? `${stylesDay.freeDay}` : 'undefined'
          }
        >
        </DatePicker>
        <div className={stylesDay.wrapper}>
          <Icon path={calendarIcon} width={'18px'} height={'20px'} stroke={'none'}/>
        </div>
      </div>
    </InputWrapper>
  )
})

const calendarHeader = ({date, changeYear, changeMonth}: ReactDatePickerCustomHeaderProps): React.ReactNode | undefined => {
  return (
    <div className={`${stylesDay.header}`}>
      {/* TODO: можно заменить селекторы на инпут с поиском */}
      <select
        value={date.getFullYear()}
        onChange={({target: {value}}) => changeYear(Number(value))}
        className={`${stylesDay.select} ${stylesDay.selectYear}`}
      >
        {years.map((option) => (
          <option key={option} value={option} className={`${stylesDay.option}`}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[date.getMonth()]}
        onChange={({target: {value}}) =>
          changeMonth(months.indexOf(value))
        }
        className={`${stylesDay.select} ${stylesDay.selectMonth}`}
      >
        {months.map((option) => (
          <option key={option} value={option} className={`${stylesDay.option}`}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
