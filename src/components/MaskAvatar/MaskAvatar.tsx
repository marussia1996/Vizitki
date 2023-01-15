import styles from './MaskAvatar.module.scss';
import React, { FC } from 'react';
import photo from '../../images/User-foto-test.png'

type TTheme = {
  theme: 'default' | 'romantic' | 'daring';
}
export const MaskAvatar: FC<TTheme> = ({theme}) => {
  return (
      <img className={theme==='default'
        ? styles.photo 
        : theme==='romantic'
        ? styles.photoRomantic 
        : styles.photoDaring} 
        src={photo} 
        alt='Фотография пользователя'
      />
  )
}