import React, {FC} from 'react';
import css from './InputFilter.module.scss';
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import {iconClose} from "../Icon/lib";

type TInputFilterState = {
  title?: string,
  value?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void;
  placeHolder?: string;
  mix?: string;
}


const InputFilter: FC<TInputFilterState> = props => {
  return (
    <div className={[css.inputFilter, props.mix].join(' ')}>
      {
        props.title && <span className={css.inputFilterLabel}>{props.title}</span>
      }
      <div className={css.inputFilterWrap}>
        <Input value={props.value} onChange={props.onChange} type={"text"} placeholder={props.placeHolder} />
        {props.value &&
          <div className={css.inputFilterCenter}>
            <button className={css.inputFilterClear} onClick={()=>props.onClear()}>
              <Icon path={iconClose} size={'16px'}/>
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default InputFilter;