import React, { FC } from 'react'
import headerStyle from './Header.module.scss';
import logo from '../../images/logo-visitki.svg';
import { NavLink } from 'react-router-dom';
//тестовое фото
import userPhoto from '../../images/User-foto-test.png'

export const Header: FC = () => {
  //TODO: надо исправить то откуда берется значение зареган пользователь или нет
  //TODO: заполнить данные в шапке исходя из данных о пользователе
  const user = 'gyujik';

  return (
    <header className={headerStyle.header}>
      <NavLink to='/'>
        <img className={headerStyle.logo} src={logo} alt='Логотип'></img>
      </NavLink>
      {user &&
      <NavLink to='/profile' className={headerStyle.link}>
        <div className={headerStyle.userWrap}>
          <img className={headerStyle.userPhoto} src={userPhoto} alt='Фотография пользователя'></img>
          <p className={headerStyle.userName}>Константин Константинов</p>
        </div>
      </NavLink>
      }
    </header>
  )
}
