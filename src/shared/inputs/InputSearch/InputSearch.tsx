import styles from './InputSearch.module.scss';
import Icon from '../../Icon/Icon';
import {iconArrowUp} from '../../Icon/lib';
import Scroll from '../../../components/Scroll/Scroll';
import React, {FC, useState} from "react";
import Input from "../Input/Input";
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";

type TProps = TInputWrapperProps & {
  options: string[];
}

export const InputSearch: FC<TProps> = (props) => {

  const {labelText, mix, error, description, options, ...rest} = props;

  const [inputValue, setInputValue] = React.useState('');
  const [isActive, setActive] = useState(false);
  const height = !isActive ? 0 : options.length >= 5 ? '192px' : `${options.length * 36}px`;

  const onChange = (e: any) => {
    setInputValue(e.target.value);
    setActive(true);
  };

  const filterFunction =
    options.filter((option) => {
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
    <InputWrapper>
      <div className={styles.wrap}>
        <Input type={'text'}/>
        <div className={styles.wrapRight}>
          <button className={!isActive ? styles.button : styles.button + ' ' + styles.buttonActive}
                  onClick={onClickButton}>
            <Icon path={iconArrowUp} fill={'none'} width={'18px'} height={'10px'}/>
          </button>
        </div>
        <div className={`${styles.wrapList} ${!isActive ? styles.wrapListDefault : styles.wrapListActive}`}
             style={{height: height}}>
          <Scroll>
            <ul className={styles.list}>
              {filterFunction.map((option: string, index: number) => {
                return (
                  <li className={styles.option} key={index}
                      onClick={(e) => {
                        onChange(e);
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


