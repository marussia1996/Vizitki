import styles from './MaskAvatar.module.scss';
import photo from '../../images/User-foto-test.png';
import { TThemeProfile } from '../../services/types/types';
import classnames from 'classnames';

type Props = {
  theme?: TThemeProfile;
}

let cx = classnames.bind(styles);

export const MaskAvatar = ({theme = TThemeProfile.DARING }: Props) => {

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
    </div>
  )
}