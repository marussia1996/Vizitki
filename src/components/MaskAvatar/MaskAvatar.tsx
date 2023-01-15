import styles from './MaskAvatar.module.scss';
import photo from '../../images/User-foto-test.png';
import { TThemeProfile } from '../../services/types/types';
import classnames from 'classnames';
import mask from '../../images/mask.png'

type Props = {
  theme?: TThemeProfile;
}

let cx = classnames.bind(styles);

export const MaskAvatar = ({theme = TThemeProfile.DEFAULT }: Props) => {

  const cxWrap = cx(styles.wrapDefault, {
    [styles['wrapDefault']]: theme === TThemeProfile.ROMANTIC,
    [styles['wrapDaring']]: theme === TThemeProfile.DARING
  });

  const cxPhoto = cx(styles.photo, {
    [styles['photoRomantic']]: theme === TThemeProfile.ROMANTIC,
    [styles['photoDaring']]: theme === TThemeProfile.DARING
  });

  return (
    <div className={cxWrap}>
      <img className={cxPhoto} src={photo} alt='Фотография пользователя'/>
      {
        theme === TThemeProfile.DARING &&
        <img className={styles.mask} src={mask} alt='Маска'/>
      }
    </div>
  )
}