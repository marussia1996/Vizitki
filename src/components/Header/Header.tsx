import React, {FC, useState} from 'react'
import headerStyle from './Header.module.scss';
import logo from '../../images/logo-visitki.svg';
import {NavLink} from 'react-router-dom';
//тестовое фото можно заменить на какую-нибудь картинку означающую, что аватарки у пользователя нет
import userPhoto from '../../images/User-foto-test.png'
import {useAuth} from "../../hooks/useAuth";
import {Routes} from "../../shared/routes";
import {RoleType} from "../../services/types/types";

export const Header: FC = () => {
  const {user, role, logout, updateRole} = useAuth();
  //const [isVisible setVisible] = useState(false)

  const clickDel = () => {
    logout();
  }

  const changeRole = (newRole: RoleType) => {
    console.log(newRole);
    updateRole(newRole);
  }
  const link = role === 'curator' ? '/admin': '/';
  console.log(user);
  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.wrap}>
      <NavLink to={Routes.Home}>
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
                <img className={headerStyle.userPhoto} src={user.image ? user.image : userPhoto}
                  alt='Фотография пользователя'></img>
                <p className={headerStyle.userName}>{user.name}</p>
              </div>
              <div className={headerStyle.wrapLink}>
                <NavLink to={Routes.Profile} className={headerStyle.link}>
                  Профиль
                </NavLink>
              </div>
            </> ) : (
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
