import styles from './UserCard.module.scss';
import React, {FC, KeyboardEventHandler, MouseEventHandler, useEffect, useState} from 'react'
import {CommentIcon} from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';
import {getUserReactions} from '../../utils/api';
import {RoleType, TUserReactionsRaw} from '../../services/types/types';
import {useNavigate} from 'react-router-dom';
import {Routes} from "../../shared/routes";
import {useAuth} from "../../hooks/useAuth";
import {useFetching} from "../../hooks/useFetching";

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
  const {user, role} = useAuth();

  useEffect(() => {
    getUserReactions(id).then(res => {
      if (res) {
        setState(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }, []);


  // если есть комментарий (text) при target = null -> комент к фотке
  const profileComments = state?.items.filter(item => (item.target === null) && item.text);

  const hideFeedback: KeyboardEventHandler<HTMLDivElement> = (e) => {
    console.log(e);
    if (e.key === 'Escape') {
      setFeedbackState(false);
    }
  }

  const openProfile: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    navigate(Routes.DetailPage.replace(':id', id));
  }

  return (
    <div className={styles.wrap} onKeyUp={hideFeedback}>
      <div className={styles.photoWrap} onClick={openProfile}>
        <img className={styles.photo} src={photo} alt='Фотография пользователя'></img>
      </div>
      {!isOpenFeedback && (
        <div className={styles.commentIcon}>
          <CommentIcon handleFeedback={() => setFeedbackState(!isOpenFeedback)} color='dark'
                       commentsQuantity={profileComments?.length}/>
        </div>
      )}
      <div className={styles.infoWrap} onClick={openProfile}>
        <p className={styles.name}>{name}</p>
        <p className={styles.city}>{city}</p>
        {role === RoleType.Curator &&
          <p className={styles.messages}>{state?.total + ' сообщений'}</p>
        }
      </div>
      {isOpenFeedback && <Feedback comments={profileComments} id={id} onCLose={() => setFeedbackState(false)}/>}
    </div>
  )
}