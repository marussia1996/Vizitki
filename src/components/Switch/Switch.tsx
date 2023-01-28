import styles from './Switch.module.scss';
import {NavLink} from 'react-router-dom';
import {Routes} from "../../shared/routes";
import classNames from "classnames";

export const SwitchInfo = () => {
  return (
    <div className={styles.wrap}>
      <NavLink to={Routes.Admin}
               className={({isActive}) => classNames(styles.text, {[styles.textActive]: isActive})} end>
        <p>Студенты</p>
      </NavLink>
      <NavLink to={Routes.AdminComments}
               className={({isActive}) => classNames(styles.text, {[styles.textActive]: isActive})}
               end>
        <p>Комментарии</p>
      </NavLink>
    </div>
  )
}
