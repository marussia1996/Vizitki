import React, {FC} from 'react'
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
      {user &&
        <NavLink to='/profile' className={headerStyle.link}>
          <div className={headerStyle.userWrap}>
            <img className={headerStyle.userPhoto} src={user.image ? user.image : userPhoto}
                 alt='Фотография пользователя'></img>
            <p className={headerStyle.userName}>{user.name}</p>
          </div>
        </NavLink>
      }
    </header>
  )
}
