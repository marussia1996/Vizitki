import styles from './UserCard.module.scss';
import React, {FC, MouseEventHandler, useEffect, useState} from 'react'
import {CommentIcon} from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';
import {getUserReactions} from '../../utils/api';
import {RoleType, TargetRaw, TUserReactionsRaw} from '../../services/types/types';
import {useNavigate} from 'react-router-dom';
import {Routes} from "../../shared/routes";
import {useFetching} from "../../hooks/useFetching";
import {useAuth} from "../../hooks/useAuth";

type TProps = {
  name: string;
  photo: string;
  city: string;
  id: string;
};

export const UserCard: FC<TProps> = ({name, photo, city, id}) => {
  const [isOpenFeedback, setFeedbackState] = useState(false);
  const [reactions, setReactions] = useState<TUserReactionsRaw>();
  const navigate = useNavigate();
  const {role} = useAuth();

  const [, , fetching] = useFetching(async () => {
    console.log('fetching');
    const reactions = await getUserReactions(id);
    setReactions(reactions);
  })

  useEffect(() => {
    fetching();
  }, []);

  // если есть комментарий (text) при target = null -> комент к фотке
  const profileReactions = reactions?.items.filter(item => !item.target);
  const comments = reactions?.items.filter(item => !item.target && item.text);

  const handleFeedback = () => {
    setFeedbackState(!isOpenFeedback);
  }

  const openProfile: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    navigate(Routes.DetailPage.replace(':id', id));
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.photoWrap} onClick={openProfile}>
        <img className={styles.photo} src={photo} alt='Фотография пользователя'></img>
      </div>
      {!isOpenFeedback && (
        <div className={styles.commentIcon}>
          <CommentIcon handleFeedback={handleFeedback} color='dark' commentsQuantity={comments?.length}/>
        </div>
      )}
      <div className={styles.infoWrap} onClick={openProfile}>
        <p className={styles.name}>{name}</p>
        <p className={styles.city}>{city}</p>
        {role === RoleType.Curator &&
          <p className={styles.messages}>{`${reactions?.total} сообщений`}</p>
        }
      </div>
      {isOpenFeedback &&
        <Feedback comments={profileReactions} id={id} target={null}
                  onClose={() => setFeedbackState(false)} onChangeReactions={fetching}/>}
    </div>
  )
}