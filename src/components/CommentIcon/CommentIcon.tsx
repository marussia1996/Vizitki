import styles from './CommentIcon.module.scss';
import React, { FC } from 'react'
import message from '../../images/Union.svg';

export const CommentIcon: FC = () => {
  return (
    <button className={styles.wrap}>
      <img className={styles.icon} src={message} alt='Иконка сообщения'/>
      {/* в зависимости от роута, стиля страницы, отправлен или нет коммент стиль должен меняться на countPink*/}
      <div className={styles.countDark}>
        <span className={styles.number}>22</span>
      </div>
    </button>
  )
}