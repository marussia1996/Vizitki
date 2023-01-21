import styles from './CommentIcon.module.scss';
import message from '../../images/Union.svg';
import React, { FC } from 'react';

export type TProps = {
  color: 'dark' | 'pink';
  handleFeedback: () => void;
  mix?: string;
}

export const CommentIcon: FC<TProps> = ({color, handleFeedback, mix}) => {
  const mixButton = [styles.wrap, mix].join(' ');
  return (
    <button className={mixButton} onClick={handleFeedback}>
      <img className={styles.icon} src={message} alt='Иконка сообщения'/>
      <div className={color === 'dark'? styles.countDark : styles.countPink}>
        <span className={styles.number}>22</span>
      </div>
    </button>
  )
}