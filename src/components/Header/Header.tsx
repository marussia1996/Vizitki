import React, { FC, useContext } from 'react'
import headerStyle from './Header.module.scss';
import logo from '../../images/logo-visitki.svg';
import { NavLink, useHistory } from 'react-router-dom';
//тестовое фото можно заменить на какую-нибудь картинку означающую, что аватарки у пользователя нет
import userPhoto from '../../images/User-foto-test.png'
import { AuthContext } from '../../services/AuthContext';

export const Header: FC = () => {
  const {user, setUser} = useContext(AuthContext);
  const history = useHistory();
  const clickDel = () =>{
    localStorage.clear();
    setUser(null);
    history.push('/login');
  }
  const link = user?.tags === 'curator' ? '/admin': '/';
  console.log(user);
  return (
    <header className={headerStyle.header}>
      <NavLink to={link}>
        <img className={headerStyle.logo} src={logo} alt='Логотип'></img>
      </NavLink>
      {user &&
      <div className={headerStyle.switch}>
        <button type='button' onClick={clickDel}>Выход</button>
      </div>
      }
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
