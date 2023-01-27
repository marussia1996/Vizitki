import './DetailCard.scss';
import { KeyboardEventHandler, useEffect, useState } from 'react';
import { BaseFiedsRaw, TargetRaw, TThemeProfile, UserWithProfileRaw } from '../../services/types/types';
import defaultLine from '../../images/Line/default.svg';
import romanticLine from '../../images/Line/romantic.svg';
import daringLine from '../../images/Line/daring.svg';
import { CommentIcon } from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';

type TProps = {
  theme?: TThemeProfile;
  heading: string;
  text: string;
  image?: string;
  location?: TargetRaw;
  user: BaseFiedsRaw & UserWithProfileRaw & { reactions: number };
};

export default function DetailCard({ theme = TThemeProfile.DEFAULT, heading, text, image, location, user }: TProps) {
  const [themeType, setTheme] = useState(defaultLine);
  const [isOpenFeedback, setFeedbackState] = useState(false);

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
  const hideFeedback: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      setFeedbackState(false);
    }
  }
  const changeReactions = () =>
    location === 'hobby' ?
      user?.info.hobby.reactions
      : location === 'status' ?
        user?.info.status.reactions
        : location === 'job' ?
          user?.info.job.reactions
          : user?.info.edu.reactions


  return (
    <div className='card' onKeyUp={hideFeedback}>
      <div className='line' style={{ backgroundImage: `url(${themeType})` }}></div>
      <div className='headingCnt'>
        <h3 className='heading'>{heading.toUpperCase()}</h3>
        <div className='commentIcon'>
          <CommentIcon handleFeedback={handleFeedback} color='dark' commentsQuantity={changeReactions()} />
        </div>
      </div>
      {image && (
        <div className='image' style={{ backgroundImage: `url(${image})` }}></div>
      )}
      <p className='text'>{text}</p>
      {/* FIXME нужно пробросить корректный id профиля в Feedback и функцию обновления комментариев */}
      {isOpenFeedback && <Feedback id={'замени меня!!!'} updateData={() => {}} />}
    </div>
  )
}