import React, {ChangeEvent, FC, useState} from 'react';
import InputFilter from "../InputFilter/InputFilter";
import css from './Evgeny.module.css';

const Evgenys:FC = () => {
  
  const [value, setValue] = useState<string>('')
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  
  return (
    <div className={css.container}>
      <InputFilter value={value} onChange={onChange} title={'Фильтровать'} placeHolder={'По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'}
                   onClear={()=>setValue('')}
      />
    </div>
  );
};

export default Evgenys;