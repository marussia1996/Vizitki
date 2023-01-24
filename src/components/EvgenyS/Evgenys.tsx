import React, {FC, useState} from 'react';
import InputFilter from "../../shared/inputs/InputFilter/InputFilter";
import css from './Evgeny.module.css';
import InputText from "../../shared/inputs/InputText/InputText";
import {InputFile} from "../../shared/inputs/InputFile/InputFile";
import {TInputChange} from "../../shared/inputs";
import {InputTextArea} from "../../shared/inputs/InputTextArea/InputTextArea";
import {InputDay} from "../../shared/inputs/InputDay/InputDay";

import {PhotoUpload} from "../PhotoUpload/PhotoUpload";
import {InputSearch} from "../../shared/inputs/InputSearch/InputSearch";
import Suggest from "../../shared/inputs/Suggest/Suggest";

type TInputState = {
  filter: string,
  text: string,
  file: File | undefined,
  textarea: string,
  date?: Date,
  photo: undefined;
  inputSearch: string,

  geo?: { name: string, geo: number[] }
}

const Evgenys: FC = () => {

  const [state, setState] = useState<TInputState>({
    filter: '',
    text: '',
    file: undefined,
    textarea: '',
    date: undefined,
    photo: undefined,
    inputSearch: '',
    geo: {name: 'Moscow', geo: []}
  });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | TInputChange<any>) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  console.log(state);

  return (
    <div className={css.container}>

      <Suggest labelText={'Город'} error={'error'} value={state.geo?.name} onChange={onChange} placeHolder={'123'}
               name={'geo'}/>

      {/*<PhotoUpload name={'photo'} value={state.photo} onFileChange={onChange}/>

      <InputSearch options={['test', '123']} value={state.inputSearch} onChange={onChange} name={'inputSearch'}/>

      <InputDay name={'date'} date={state.date} labelText={'Дата рождения *'} maxDate={new Date(Date.UTC(2022, 1, 5))}
                onDateChange={onChange}
      />

      <InputFilter value={state.filter} name={'filter'} onChange={onChange} labelText={'Фильтровать'}
                   placeholder={'По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'}
                   onClear={onChange}
      />

      <InputText name={'text'} labelText={'123 *'} description={'description'} error={'error'} placeholder={'123'}
                 onChange={onChange}/>

      <InputFile name={'file'} labelText={'Увлечения, досуг, интересы'}
                 description={'Рекомендуемый размер фото 230х129'} onFileChange={onChange} accept={".xlsx, .csv"}/>

      <InputTextArea name={'textarea'} labelText={'textarea'} value={state.textarea} onChange={onChange} maxLength={200}
                     rows={5}/>

      <InputDay name={'date'} date={state.date} labelText={'Дата рождения *'} onDateChange={onChange}/>

      <InputSearch options={['test', '123', 'test', '123', 'test', '123', 'test', '123']} value={state.inputSearch}/>*/}
    </div>
  );
};

export default Evgenys;