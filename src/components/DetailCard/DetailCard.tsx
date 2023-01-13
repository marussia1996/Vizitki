import './DetailCard.scss';
import { useEffect, useState } from 'react';
import { TThemeProfile } from '../../services/types/types';
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
};

export default function DetailCard({ theme = TThemeProfile.DEFAULT, heading, text, image }: TProps) {
  const [themeType, setTheme] = useState(defaultLine);
  const [isOpenFeedback, setFeedbackState] = useState(false);

  useEffect(() => {
    if(theme !== TThemeProfile.DEFAULT) {
      switch(theme) {
        case TThemeProfile.ROMANTIC:
          setTheme(romanticLine);
          break;
        case TThemeProfile.DARING:
          setTheme(daringLine);
          break;
      }
    }
  });

  const feedbackHandle = () => {
    setFeedbackState(!isOpenFeedback);
  }

  return (
    <div className='card'>
      <div className='line' style={{ backgroundImage: `url(${themeType})` }}></div>
      <div className='headingCnt'>
        <h3 className='heading'>{heading.toUpperCase()}</h3>
        <CommentIcon color='dark' />
      </div>
      {image && (
        <div className='image' style={{ backgroundImage: `url(${image})` }}></div>
      )}
      <p className='text'>{text}</p>
      <div className='cnt' onClick={feedbackHandle}>
        <CommentIcon color='pink' />
      </div>
      {isOpenFeedback && <Feedback />}
    </div>
  )
}