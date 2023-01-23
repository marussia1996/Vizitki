import styles from './InputSuggest.module.scss';
import Icon from '../../Icon/Icon';
import {iconArrowUp} from '../../Icon/lib';
import Scroll from '../../../components/Scroll/Scroll';
import React, {FC, useEffect, useRef, useState} from "react";
import Input from "../Input/Input";
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";
import classNames from "classnames";
import {createInputChange, TInputChange} from "../index";
import {YMaps, withYMaps} from "react-yandex-maps";
import './suggest.scss'

type TProps = TInputWrapperProps & {
  name?: string,
  options: string[];
  value: string;
  onChange?: (e: TInputChange<string>) => void;
  placeholder?: string,
  getCityName: (value:string)=> void
}


export const InputSuggest: FC<TProps> = (props) => {
  //@ts-ignore
  function MapSuggestComponent(props) {
    const {ymaps} = props;
    React.useEffect(() => {
      setActive(false);
      const suggestView = new ymaps.SuggestView("suggest", {
        results: 10
      });
      suggestView.events.add('select', (e: any) => {
        const {value} = e.get('item');
        getCityName(value);
        console.log(value);
        ymaps.geocode(value, {results: 1}).then((res: any) => {
          const geoObject = res.geoObjects.get(0);
          console.log(geoObject);
          console.log(geoObject.geometry.getCoordinates());
          console.log(geoObject.properties.get('metaDataProperty'));
          console.log(geoObject.getAdministrativeAreas());
        }).catch((e: any) => console.log(e))
        ;
      });
    }, [ymaps.SuggestView]);

    return <Input type="text" id="suggest" placeholder={placeholder}
                  className={classNames({[styles.inputActive]: isActive})} ref={inputRef}/>;
  }

  const SuggestComponent = React.useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
      "SuggestView",
      "geocode",
      "coordSystem.geo"
    ]);
  }, []);

  const {labelText, mix, error, description, options, value, name, placeholder, onChange, getCityName} = props;

  const [isActive, setActive] = useState(false);

  const [text, setText] = useState<string>(value);

  const mainDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
//TODO: при вводе хоть одной буквы, надо изменить иконку стрелки
//при нажатии на enter в инпуте происходит submit событие, хз как это исправить
//надо достать как-то выбранное значение
//надо определить значение координат выбранного города
//как-то запихнуть скролл
  useEffect(() => {
    const clickHandle = (e: MouseEvent) => {
      if (mainDivRef.current && e.target && !mainDivRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    }
    if (isActive) {
      document.addEventListener('click', clickHandle);
      inputRef.current?.focus();
    }
    setText(isActive ? '' : value || '')
    return () => {
      document.removeEventListener('click', clickHandle);
    }
  }, [isActive])

  return (
    <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
      <div className={styles.wrap} ref={mainDivRef}>
        <YMaps
          enterprise
          query={{apikey: "9d121fd4-ce9f-40f4-b85b-b5aa165d5bf2"}}>
          <SuggestComponent/>
        </YMaps>
        <div className={styles.wrapRight}>
          <button type='button' className={!isActive ? styles.button : styles.button + ' ' + styles.buttonActive}
                  onClick={() => setActive(!isActive)}>
            <Icon path={iconArrowUp} fill={'none'} width={'18px'} height={'10px'}/>
          </button>
        </div>
      </div>
    </InputWrapper>
  )
}



