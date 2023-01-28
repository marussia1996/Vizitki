import React, {FC} from 'react';
import css from './Emoji.module.scss'
import {TUserReactionsRaw} from "../../services/types/types";
import classNames from "classnames";

type TSmileProps = {
  value: string,
  isActive: boolean
  count: number,
  onClick?: (value: string, isActive: boolean) => void;
}

const Emoji: FC<TSmileProps> = ({value, isActive, count = 0, onClick}) => {
  return (
    <span onClick={() => {
      if (onClick) onClick(value, isActive)
    }} role={"img"} className={classNames(css.emoji, {[css.emojiActive]: isActive})}>{value}
      {count > 0 &&
        <span className='reactionsNumb'>1</span>
      }
    </span>
  );
};

export default Emoji;