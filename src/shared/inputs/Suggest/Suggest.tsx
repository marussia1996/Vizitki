import React, {FC, MouseEventHandler, useEffect, useRef, useState} from 'react';
import Input from "../Input/Input";
import {withYMaps} from "react-yandex-maps";
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";
import css from './Suggest.module.scss';
import styles from "../InputSearch/InputSearch.module.scss";
import Icon from "../../Icon/Icon";
import {iconArrowUp} from "../../Icon/lib";
import {createInputChange, TInputChange} from "../index";

type TSuggestProps = TInputWrapperProps & {
  placeHolder?: string
  suggestId?: string
  value?: string
  onChange?: (e: TInputChange<TSelected>) => void;
  name?: string
}

export type TSelected = {
  name: string,
  geo: number[]
}

const Suggest: FC<TSuggestProps> = (props: TSuggestProps) => {
  //@ts-ignore
  const {ymaps, suggestId = 'suggest'} = props;
  const {labelText, mix, error, description} = props;
  const {placeHolder, value, onChange, name} = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [text, setText] = useState<string>(value || '');

  useEffect(() => {

    const suggestView = new ymaps.SuggestView(suggestId, {
      results: 10
    });

    suggestView.events.add('select', (e: any) => {
      const {value} = e.get('item');
      if (!value) return;
      setText(value);
      ymaps.geocode(value, {results: 1}).then((res: any) => {
        const geoObject = res.geoObjects.get(0);
        if (onChange) {
          onChange(createInputChange<TSelected>(name, {
            name: geoObject.getLocalities()[0] || value,
            geo: geoObject.geometry.getCoordinates()
          }))
        }
      }).catch((e: any) => console.log(e))
      ;
    });

    return () => {
      suggestView.events.remove('select');
      suggestView.destroy();
    };
  }, [ymaps])

  return (
    <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
      <div className={css.wrap}>
        <Input
          type={"text"}
          id={'suggest'}
          placeholder={placeHolder} value={text} ref={inputRef} onChange={(e) => {
          setText(e.target.value)
        }} onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)}/>
        <div className={styles.wrapRight}>
          <button type='button' className={!isOpen ? styles.button : styles.button + ' ' + styles.buttonActive}
                  onClick={() => inputRef.current?.focus()}>
            <Icon path={iconArrowUp} fill={'none'} width={'18px'} height={'10px'}/>
          </button>
        </div>
      </div>
    </InputWrapper>
  )
};

export default withYMaps<TSuggestProps>(Suggest, true, ['SuggestView', 'geocode']);