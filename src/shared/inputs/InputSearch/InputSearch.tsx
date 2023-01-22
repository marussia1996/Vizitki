import styles from './InputSearch.module.scss';
import Icon from '../../Icon/Icon';
import {iconArrowUp} from '../../Icon/lib';
import Scroll from '../../../components/Scroll/Scroll';
import React, {FC, useEffect, useRef, useState} from "react";
import Input from "../Input/Input";
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";
import classNames from "classnames";
import {createInputChange, TInputChange} from "../index";

type TProps = TInputWrapperProps & {
  name?: string,
  options: string[];
  value: string;
  onChange?: (e: TInputChange<string>) => void;
}

export const InputSearch: FC<TProps> = (props) => {

  const {labelText, mix, error, description, options, value, name, onChange} = props;

  const [isActive, setActive] = useState(false);

  const [text, setText] = useState<string>(value);

  const mainDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const filterFunction =
    options.filter((option) => {
      return option.toLowerCase().includes(text.toLowerCase())
    })

  const onClickOption = (option: string) => {
    if (onChange) {
      onChange(createInputChange(name, option))
    }
    setActive(false);
  };

  return (
    <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
      <div className={styles.wrap} ref={mainDivRef}>
        <Input type={'text'} value={value} onChange={onChange} id="suggest"
               className={classNames({[styles.inputActive]: isActive})} onFocus={() => setActive(true)} ref={inputRef}/>
        <div className={styles.wrapRight}>
          <button type='button' className={!isActive ? styles.button : styles.button + ' ' + styles.buttonActive}
                  onClick={() => setActive(!isActive)}>
            <Icon path={iconArrowUp} fill={'none'} width={'18px'} height={'10px'}/>
          </button>
        </div>
        <div className={classNames(styles.wrapList, {[styles.wrapListVisible]: isActive})}>
          <Scroll>
            <ul className={styles.list}>
              {filterFunction.map((option: string, index: number) => {
                return (
                  <li className={styles.option} key={index}
                      onClick={() => {
                        onClickOption(option)
                      }}
                  >
                    {option}
                  </li>
                )
              })}
            </ul>
          </Scroll>
        </div>
      </div>
    </InputWrapper>
  )
}


