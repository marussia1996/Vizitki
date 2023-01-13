import styles from './CommentIcon.module.scss';
import message from '../../images/Union.svg';
import React, { FC } from 'react';

export type TColor = {
  color: 'dark' | 'pink';
}

export const CommentIcon: FC<TColor> = ({color}) => {
  return (
    <button className={styles.wrap}>
      <img className={styles.icon} src={message} alt='Иконка сообщения'/>
      <div className={color === 'dark'? styles.countDark : styles.countPink}>
        <span className={styles.number}>22</span>
      </div>
    </button>
  )
}