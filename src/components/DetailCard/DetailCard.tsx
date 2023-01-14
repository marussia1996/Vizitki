import './DetailCard.scss';
import { useEffect, useState } from 'react';
import { TPageType } from '../../services/types/types';
import defaultLine from '../../images/Line/default.svg';
import romanticLine from '../../images/Line/romantic.svg';
import daringLine from '../../images/Line/daring.svg';
import { CommentIcon } from '../CommentIcon/CommentIcon';
import Feedback from '../Feedback/Feedback';

type TProps = {
  theme: TPageType;
  heading: string;
  text: string;
  image?: string;
};

export default function DetailCard({ theme, heading, text, image }: TProps) {
  const [themeType, setTheme] = useState(defaultLine);
  const [isOpenFeedback, setFeedbackState] = useState(false);

  useEffect(() => {
    switch (theme) {
      case 'default':
        break;
      case 'romantic':
        setTheme(romanticLine);
        break;
      case 'daring':
        setTheme(daringLine);
        break;
    }
  });

  const feedbackHandle = () => {
    setFeedbackState(!isOpenFeedback);
  }

  return (
    <div className='card'>
      <div className='line' style={{ backgroundImage: `url(${themeType})` }}></div>
      <h3 className='heading'>{heading.toUpperCase()}</h3>
      {image && (
        <div className='image' style={{ backgroundImage: `url(${image})` }}></div>
      )}
      <p className='text'>{text}</p>
      <div className='cnt' onClick={feedbackHandle}>
        <CommentIcon color='pink' />
      </div>
      {isOpenFeedback && <Feedback user='admin' />}
    </div>
  )
}