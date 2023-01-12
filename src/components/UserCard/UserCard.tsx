import styles from './UserCard.module.scss';
import React, { FC } from 'react'
import photo from '../../images/User-foto-test.png';
import mes from '../../images/Union.svg'; //временное изображение

export const UserCard: FC = () => {
  return (
  <div className={styles.wrap}>
    <img className={styles.photo} src={photo} alt='Фотография пользователя'></img>
  {/* CommentIcon при наведении появляется на десктопе, на всех остальных-сразу
  <CommentIcon className={styles.commentIcon}/> Компонент еще не готов
  пока используется картинка*/}
    <img className={styles.commentIcon} src={mes}></img>
    <div className={styles.infoWrap}>
      <p className={styles.name}>Иванов Сергей</p>
      <p className={styles.city}>Москва</p>
    {/* отображается только для админа */}
      <p className={styles.messages}>0 сообщений</p>
    </div>
</div>
  )
}