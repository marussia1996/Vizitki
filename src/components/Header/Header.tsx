import {FC} from 'react'
import headerStyle from './Header.module.scss';
import logo from '../../images/logo-visitki.svg';
import {NavLink} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {Routes} from "../../shared/routes";
import {RoleType} from "../../services/types/types";

export const Header: FC = () => {
  const {user, role, logout, updateRole} = useAuth();
 
  const clickDel = () => {
    logout();
  }

  const changeRole = (newRole: RoleType) => {
    updateRole(newRole);
  }
  const link = role === 'curator' ? '/admin': '/';
  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.wrap}>
        <NavLink to={link}>
          <img className={headerStyle.logo} src={logo} alt='Логотип'></img>
        </NavLink>
        {user &&
          <div className={headerStyle.switch}>
            <button
              onClick={() => changeRole(role === RoleType.Student ? RoleType.Curator : RoleType.Student)}>
              {role === RoleType.Student ? 'Куратор ->' : 'Студент ->'}
            </button>
            <button type='button' onClick={clickDel}>Выход</button>
          </div>
        }
      </div>
      {user && (
        <div className={headerStyle.model}>
          {role === RoleType.Student ? (
            <>
              <div className={headerStyle.userWrap}>
                {user.image ? 
                  (<img className={headerStyle.userPhoto} src={user.image}
                    alt='Фотография пользователя'></img>
                  ) : 
                  (<div className={headerStyle.adminPhoto}></div>)
                }
                <p className={headerStyle.userName}>{user.name}</p>
              </div>
              <div className={headerStyle.wrapLink}>
                <NavLink to={Routes.Profile} className={headerStyle.link}>
                  Профиль
                </NavLink>
              </div>
            </>) : (
            <NavLink to={Routes.Admin} className={headerStyle.link}>
              <div className={headerStyle.userWrap}>
                <div className={headerStyle.adminPhoto}></div>
                <p className={headerStyle.userName}>{user.email}</p>
              </div>
            </NavLink>
          )}  
        </div>
      )} 
    </header>
  )
}
