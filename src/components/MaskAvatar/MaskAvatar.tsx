import styles from './MaskAvatar.module.scss';
import { TThemeProfile } from '../../services/types/types';
import classnames from 'classnames';
import mask from '../../images/mask.png'

type TProps = {
  theme?: TThemeProfile;
  photo: string;
}

let cx = classnames.bind(styles);

export const MaskAvatar = ({ theme = TThemeProfile.DEFAULT, photo }: TProps) => {

  const cxPhoto = cx(styles.photo, {
    [styles['photoRomantic']]: theme === TThemeProfile.ROMANTIC,
    [styles['photoDaring']]: theme === TThemeProfile.DARING
  });

  return (
    <div className={styles.wrap}>
      <img className={cxPhoto} src={photo} alt='Фотография пользователя'/>
      {
        theme === TThemeProfile.DARING &&
        <img className={styles.mask} src={mask} alt='Маска'/>
      }
    </div>
  )
}