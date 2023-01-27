import React, {FC} from 'react';
import css from './Smile.module.scss'
import {TUserReactionsRaw} from "../../services/types/types";
import classNames from "classnames";

type TSmileProps = {
  value: string,
  isActive: boolean
  count: number
}

const Smile: FC<TSmileProps> = ({value, isActive, count = 0}) => {
  return (
    <span className={classNames(css.smile, {[css.smileActive]: isActive})}>{value}
      {count > 0 &&
        <span className='reactionsNumb'>1</span>
      }
    </span>
  );
};

export default Smile;