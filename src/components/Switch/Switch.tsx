import styles from './Switch.module.scss';
import { NavLink } from 'react-router-dom';

export const SwitchInfo = () => {
  return (
    <div className={styles.wrap}>
      <NavLink className={styles.text} to='/admin/users' activeClassName={styles.textActive} exact>
        <p>Студенты</p>
      </NavLink>
      <NavLink className={styles.text} to='/admin' activeClassName={styles.textActive} exact>
        <p>Комментарии</p>
      </NavLink>
    </div>
  )
}
