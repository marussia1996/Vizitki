import styles from './UserCard.module.scss';
import React, { FC, useState, useEffect } from 'react'
import { CommentIcon } from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';
import { getUserReactions } from '../../utils/api';
import { TUserReactionsRaw } from '../../services/types/types';

type TProps = {
  name: string;
  photo: string;
  city: string;
  id: string;
};

export const UserCard: FC<TProps> = ({ name, photo, city, id }) => {
  const [isOpenFeedback, setFeedbackState] = useState(false);
  const [state, setState] = useState<TUserReactionsRaw>();

  useEffect(() => {
    getUserReactions(id).then(res => {
      if (res) {
        setState(res);
      }
    });
  }, []);

  //FIXME когда будет нормальный бэкенд надо будет заменить 'job' на 'profile', или что там будет
  const profileComments = state?.items.filter(item => item.target === 'job');

  const handleFeedback = () => {
    setFeedbackState(!isOpenFeedback);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.photoWrap}>
        <img className={styles.photo} src={photo} alt='Фотография пользователя'></img>
      </div>
      <div className={styles.commentIcon}>
        <CommentIcon handleFeedback={handleFeedback} color='dark' commentsQuantity={profileComments?.length} />
      </div>
      <div className={styles.infoWrap}>
        <p className={styles.name}>{name}</p>
        <p className={styles.city}>{city}</p>
        {/* отображается только для админа */}
        <p className={styles.messages}>{state?.total + ' сообщений'}</p>
      </div>
      {isOpenFeedback && <Feedback />}
    </div>
  )
}