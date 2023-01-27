import styles from './UserCard.module.scss';
import React, {FC, useState, useEffect, MouseEventHandler, KeyboardEventHandler} from 'react'
import {CommentIcon} from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';
import {getUserReactions} from '../../utils/api';
import {TUserReactionsRaw} from '../../services/types/types';
import {useNavigate} from 'react-router-dom';
import {Routes} from "../../shared/routes";

type TProps = {
  name: string;
  photo: string;
  city: string;
  id: string;
};

export const UserCard: FC<TProps> = ({name, photo, city, id}) => {
  const [isOpenFeedback, setFeedbackState] = useState(false);
  const [state, setState] = useState<TUserReactionsRaw>();
  const navigate = useNavigate();
  const userRaw = localStorage.getItem('user');
  const user = userRaw && JSON.parse(userRaw);
  useEffect(() => {
    getUserReactions(id)
    .then(res => {
      if (res) {
        setState(res);
      }
    })
    .catch(err => {
      console.log(err);
  });
  }, []);

  // если есть комментарий (text) при target = null -> комент к фотке
  const profileComments = state?.items.filter(item => (item.target === null ) && item.text);

  const handleFeedback = () => {
    setFeedbackState(!isOpenFeedback);
  }

  const hideFeedback: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      setFeedbackState(false);
    }
  }

  const openProfile: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    navigate(Routes.DetailPage.replace(':id', id));
    //history.push({pathname: `/students/${id}`});
  }

  return (
    <div className={styles.wrap} onKeyUp={hideFeedback}>
      <div className={styles.photoWrap} onClick={openProfile}>
        <img className={styles.photo} src={photo} alt='Фотография пользователя'></img>
      </div>
      {!isOpenFeedback && (
        <div className={styles.commentIcon}>
          <CommentIcon handleFeedback={handleFeedback} color='dark' commentsQuantity={profileComments?.length}/>
        </div>
      )}
      <div className={styles.infoWrap} onClick={openProfile}>
        <p className={styles.name}>{name}</p>
        <p className={styles.city}>{city}</p>
       { userRaw && user.tags === 'curator' ? 
          (<p className={styles.messages}>{state?.total + ' сообщений'}</p>)
          : null
        }
      </div>
      {isOpenFeedback && <Feedback comments={profileComments} updateData={setState} id={id}/>}
    </div>
  )
}