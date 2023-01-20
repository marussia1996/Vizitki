import React, { FC, useEffect } from 'react'
import headerStyle from './Header.module.scss';
import logo from '../../images/logo-visitki.svg';
import { NavLink } from 'react-router-dom';
//тестовое фото можно заменить на какую-нибудь картинку означающую, что аватарки у пользователя нет
import userPhoto from '../../images/User-foto-test.png'

export const Header: FC = () => {
  const userRaw = localStorage.getItem('user');
  const user = userRaw && JSON.parse(userRaw);
  return (
    <header className={headerStyle.header}>
      <NavLink to='/'>
        <img className={headerStyle.logo} src={logo} alt='Логотип'></img>
      </NavLink>
      {user &&
      <NavLink to='/profile' className={headerStyle.link}>
        <div className={headerStyle.userWrap}>
          <img className={headerStyle.userPhoto} src={user.image ? user.image : userPhoto} alt='Фотография пользователя'></img>
          <p className={headerStyle.userName}>{user.name}</p>
        </div>
      </NavLink>
      }
    </header>
  )
}
