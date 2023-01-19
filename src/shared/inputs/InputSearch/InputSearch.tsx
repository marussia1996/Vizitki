import styles from './InputSearch.module.scss';
import Icon from '../../Icon/Icon';
import { arrowUpIcon } from '../../Icon/lib';
import Scroll from '../../../components/Scroll/Scroll';
import React, { FC, useState, useRef } from "react";

type TProps = {
  options: string[];
}

export const InputSearch:FC<TProps> = ({ options }) => {

  const [inputValue, setInputValue] = React.useState('');
  const [isActive, setActive] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const height = !isActive ? 0 : options.length >= 5 ? '192px' : `${options.length * 36}px`;

  const onChange = (e: any) => {
    setInputValue(e.target.value);
    setActive(true);
  };

  const filterFunction = 
     options.filter((option)=> {
      return option.toLowerCase().includes(inputValue.toLowerCase())
    })
    
  const onClickButton = () => {
    handleToggle();
    setInputValue('');
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  const onClickOption = (option: string) => {
    setInputValue(option);
    setActive(false);
  };
 
  return (
    <div className={styles.wrap}>
      <input
        type='text'
        id='suggest'
        value={inputValue}
        className={styles.input}
        onChange={onChange}
        ref={ref}
        required
      />
      <span className={`${styles.button} ${!isActive ? styles.buttonDefault : styles.buttonActive}`}
        onClick={onClickButton}>
        <Icon path={arrowUpIcon} fill={'none'} width={'24px'} height={'24px'}/>
      </span>
      <div className={`${styles.wrapList} ${!isActive ? styles.wrapListDefault : styles.wrapListActive}`}
        style={{ height: height }}>
        <Scroll>
          <ul className={styles.list}>
            {filterFunction.map((option: string, index: number) => {
              return (
                <li className={styles.option} key={index}
                  onClick={(e) => {onChange(e); onClickOption(option)}}
                >
                  {option}
                </li>
              )
            })}
          </ul>
        </Scroll>
      </div>
    </div>
  )
}


