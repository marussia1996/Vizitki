import React, {FC, useState} from 'react';
import InputFilter from "../../shared/inputs/InputFilter/InputFilter";
import css from './Evgeny.module.css';
import InputText from "../../shared/inputs/InputText/InputText";
import {InputFile} from "../../shared/inputs/InputFile/InputFile";
import {TInputChange} from "../../shared/inputs";
import {InputTextArea} from "../../shared/inputs/InputTextArea/InputTextArea";
import {InputDay} from "../../shared/inputs/InputDay/InputDay";
import Icon from '../../shared/Icon/Icon';
import { arrowUpIcon } from '../../shared/Icon/lib';

type TInputState = {
  filter: string,
  text: string,
  file: File | undefined,
  textarea: string,
  date?: Date
}

const Evgenys:FC = () => {
  
  const [state, setState] = useState<TInputState>({
    filter: '',
    text: '',
    file: undefined,
    textarea: '',
    date: undefined
  });
  
  const onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | TInputChange<any>) => {
    setState({...state, [e.target.name]:e.target.value})
  }
     
  console.log(state);
  
  return (
    <div className={css.container}>
      <InputDay name={'date'} date={state.date} labelText={'Дата рождения *'} maxDate={new Date(Date.UTC(2022, 1, 5))}
      onDateChange={onChange}
      />
      
      <InputFilter value={state.filter} name={'filter'} onChange={onChange} labelText={'Фильтровать'} placeholder={'По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'}
                   onClear={onChange}
      />
      
      <InputText name={'text'} labelText={'123 *'} description={'description'} error={'error'} placeholder={'123'} onChange={onChange} />
      
      <InputFile name={'file'} labelText={'Увлечения, досуг, интересы'} description={'Рекомендуемый размер фото 230х129'} onFileChange={onChange} />
      
      <InputTextArea name={'textarea'} labelText={'textarea'} value={state.textarea} onChange={onChange} maxLength={200} rows={5}/>
      
      <InputDay name={'date'} date={state.date} labelText={'Дата рождения *'} onDateChange={onChange} />
      <Icon path={arrowUpIcon} fill={'none'} width={'24px'} height={'24px'}/>
    </div>
  );
};

export default Evgenys;