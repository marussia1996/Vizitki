import styles from './UserCard.module.scss';
import React, { FC } from 'react'
import photo from '../../images/User-foto-test.png';
import {CommentIcon} from '../CommentIcon/CommentIcon';

export const UserCard: FC = () => {
  return (
  <div className={styles.wrap}>
    <div className={styles.photoWrap}>
      <img className={styles.photo} src={photo} alt='Фотография пользователя'></img>
    </div>
    <div className={styles.commentIcon}>
      <CommentIcon color='dark'/> 
    </div>
    <div className={styles.infoWrap}>
      <p className={styles.name}>Иванов Сергей</p>
      <p className={styles.city}>Москва</p>
    {/* отображается только для админа */}
      <p className={styles.messages}>0 сообщений</p>
    </div>
  </div>
  )
}