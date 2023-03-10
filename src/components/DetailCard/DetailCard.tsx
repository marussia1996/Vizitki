import './DetailCard.scss';
import {useEffect, useState} from 'react';
import {
  BaseFiedsRaw,
  TargetRaw,
  TThemeProfile,
  TUserReactionsRaw,
  UserWithProfileRaw
} from '../../services/types/types';
import defaultLine from '../../images/Line/default.svg';
import romanticLine from '../../images/Line/romantic.svg';
import daringLine from '../../images/Line/daring.svg';
import {CommentIcon} from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';

type TProps = {
  theme?: TThemeProfile;
  heading: string;
  text: string;
  image?: string;
  location?: TargetRaw;
  user: BaseFiedsRaw & UserWithProfileRaw & { reactions: number };

  reactions?: TUserReactionsRaw
  onChange?: () => void;
};

export default function DetailCard({
                                     theme = TThemeProfile.DEFAULT,
                                     heading,
                                     text,
                                     image,
                                     location,
                                     user,
                                     reactions,
                                     onChange
                                   }: TProps) {
  const [themeType, setTheme] = useState(defaultLine);
  const [isOpenFeedback, setFeedbackState] = useState(false);

  //const userRaw = localStorage.getItem('user');
  //const user = userRaw && JSON.parse(userRaw);

  useEffect(() => {
    if (theme !== TThemeProfile.DEFAULT) {
      switch (theme) {
        case TThemeProfile.ROMANTIC:
          setTheme(romanticLine);
          break;
        case TThemeProfile.DARING:
          setTheme(daringLine);
          break;
      }
    }
  });

  const handleFeedback = () => {
    setFeedbackState(!isOpenFeedback);
  }

  const changeReactions = () =>
    location === 'hobby' ?
      user?.info.hobby.reactions
      : location === 'status' ?
        user?.info.status.reactions
        : location === 'job' ?
          user?.info.job.reactions
          : user?.info.edu.reactions

  const filteredReactions = reactions?.items.filter(x => x.target === location);


  return (
    <div className='card'>
      <div className='line' style={{backgroundImage: `url(${themeType})`}}></div>
      <div className='headingCnt'>
        <h3 className='heading'>{heading.toUpperCase()}</h3>
        <CommentIcon handleFeedback={handleFeedback} color='dark' commentsQuantity={changeReactions()}/>
      </div>
      {image && (
        <div className='image' style={{backgroundImage: `url(${image})`}}></div>
      )}
      <p className='text'>{text}</p>
      {isOpenFeedback && <Feedback id={user?._id} onClose={() => setFeedbackState(false)} target={location || null}
                                   comments={filteredReactions}
                                   onChangeReactions={onChange}/>}
    </div>
  )
}