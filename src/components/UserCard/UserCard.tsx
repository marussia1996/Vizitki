import styles from './UserCard.module.scss';
import React, { FC, useState } from 'react'
import {CommentIcon} from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';

type TProps = {
  name: string;
  photo: string;
  city: string;
};

export const UserCard: FC<TProps> = ({name, photo, city}) => {
  const [isOpenFeedback, setFeedbackState] = useState(false);

  const handleFeedback = () => {
    setFeedbackState(!isOpenFeedback);
  }

  return (
  <div className={styles.wrap}>
    <div className={styles.photoWrap}>
      <img className={styles.photo} src={photo} alt='Фотография пользователя'></img>
    </div>
    <div className={styles.commentIcon}>
      <CommentIcon handleFeedback={handleFeedback} color='dark'/> 
    </div>
    <div className={styles.infoWrap}>
      <p className={styles.name}>{name}</p>
      <p className={styles.city}>{city}</p>
    {/* отображается только для админа */}
      <p className={styles.messages}>0 сообщений</p>
    </div>
    {isOpenFeedback && <Feedback />}
  </div>
  )
}