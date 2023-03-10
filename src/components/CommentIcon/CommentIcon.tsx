import styles from './CommentIcon.module.scss';
import message from '../../images/Union.svg';
import React, { FC } from 'react';

export type TProps = {
  color: 'dark' | 'pink';
  handleFeedback: () => void;
  mix?: string;
  commentsQuantity?: number ;
}

export const CommentIcon: FC<TProps> = ({ color, handleFeedback, mix, commentsQuantity }) => {
  const mixButton = [styles.wrap, mix].join(' ');
  return (
    <button className={mixButton} onClick={handleFeedback}>
      <img className={styles.icon} src={message} alt='Иконка сообщения' />
      {commentsQuantity !== 0 && commentsQuantity && (
        <div className={`${styles.count} ${color === 'dark' ? styles.countDark : styles.countPink} ${commentsQuantity > 99 ? styles.countBig : ''}`}>
          <span className={styles.number}>{commentsQuantity > 99 ? '99+' : commentsQuantity}</span>
        </div>
      )}
    </button>
  )
}