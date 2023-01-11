import React, { FC } from 'react'
import headerStyle from './Header.module.scss';
import logo from '../../images/logo-visitki.svg';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className={headerStyle.header}>
      <Link to='/'>
        <img className={headerStyle.logo} src={logo} alt='Логотип'></img>
      </Link>
      {/* Если юзер авторизован блок отображается */}
        <div className={headerStyle.userWrap}>
          <img className={headerStyle.userFoto} src='#' alt='Фотография пользователя'></img>
          <p className={headerStyle.userName}>Константин Константинов</p>
        </div>
    </header>
  )
}
