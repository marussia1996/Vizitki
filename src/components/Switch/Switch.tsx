import styles from './Switch.module.scss';
import { NavLink } from 'react-router-dom';

export const SwitchInfo = () => {
  return (
    <div className={styles.wrap}>
      {/* нужно будет прописать правильный роут */}
      <NavLink className={styles.text} to='' activeClassName={styles.textActive} exact>
        <p>Студенты</p>
      </NavLink>
      <NavLink className={styles.text} to='' activeClassName={styles.textActive} exact>
        <p className={styles.text}>Комментарии</p>
      </NavLink>
    </div>
  )
}
