import React, { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import '../InputDay/datapicker.scss'
import stylesDay from '../InputDay/InputDay.module.scss'
import {ForwardedInput} from "../CustomInput/CustomInput";
import { differenceInYears } from "date-fns";
registerLocale('ru', ru)

const CustomInput = forwardRef((props: any, ref) => {
  return <ForwardedInput {...props} ref={ref} />;
});

export const InputDay = () => {
  const [startDate, setStartDate] = useState<Date>();
  const today = new Date(); 
  console.log('startDate' + startDate);
  const range = (startYear:number, endYear: number): Array<number>=>{
    let years:Array<number>= [];
    while ( startYear <= endYear ) {
      years.push(startYear++);
      } 
    return years;
  }
  const inputRef = useRef(null);
  //подсчет возраста
  const calculateAge = (dob: Date): number => {
    const date = new Date(dob);
    const age = differenceInYears(new Date(), date);
    return age;
  };
  // TODO: надо продумать, что делать если пользователь вводит не правильное значение или оставить так
  //отслеживание изменений ввода 
  const handleChangeRaw = (date: React.FocusEvent<HTMLInputElement>) => {
    const newRaw = new Date(date.currentTarget.value);
    const age = calculateAge(newRaw);
    if (newRaw instanceof Date && !isNaN(Number(newRaw)) && age > 1) {
      setStartDate(newRaw);
    }
    else{
      console.log('не правильный ввод')
      return;
    }
  };
  const years = range(1930, today.getFullYear());
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  
  return (
    <div className={`${stylesDay.content}`}>
    <label className={`${stylesDay.label}`}>Дата рождения *</label>
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
      }) => (
        <div className={`${stylesDay.header}`}>
          {/* TODO: можно заменить селекторы на инпут с поиском */}
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
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
            onChange={({ target: { value } }) =>
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
      )}
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
      maxDate={new Date()}
      className={`${stylesDay.input}`}
      dateFormat="dd.MM.yyyy"

      //выбранный элемент
      selected={startDate} 
      customInput={<CustomInput inputRef={inputRef} />}
      onChangeRaw={(e) => handleChangeRaw(e)}
      onChange={(date) => date && setStartDate(date)}
      dayClassName={(date) =>
          (date.getDay() === 0 || date.getDay() === 6) ? `${stylesDay.freeDay}` : 'undefined' 
      }
    >
    </DatePicker>
    </div>
 )
}
