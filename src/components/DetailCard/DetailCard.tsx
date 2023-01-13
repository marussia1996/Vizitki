import './DetailCard.scss';
import { useEffect, useState } from 'react';
import { TPageType } from '../../services/types/types';
import defaultLine from '../../images/Line/default.svg';
import romanticLine from '../../images/Line/romantic.svg';
import daringLine from '../../images/Line/daring.svg';

type TProps = {
  theme: TPageType;
  heading: string;
  text: string;
  image?: string;
};

export default function DetailCard({ theme, heading, text, image }: TProps) {
  const [themeType, setTheme] = useState(defaultLine);

  useEffect(() => {
    switch(theme) {
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

  return (
    <div className='card'>
      <div className='line' style={{ backgroundImage: `url(${themeType})` }}></div>
      <h3 className='heading'>{heading.toUpperCase()}</h3>
      {image && (
        <div className='image' style={{ backgroundImage: `url(${image})` }}></div>
      )}
      <p className='text'>{text}</p>
      {/* Здесь будет компонент CommentIcon */}
    </div>
  )
}