import React, { FC } from 'react'
import { TUserInfoProps } from '../../services/types/types'
import stylesUserInfo from '../UserInfo/UserInfo.module.scss'
import IconTelegram from '../../images/telegram.svg'
import IconGithub from '../../images/github.svg'

export const UserInfo:FC<TUserInfoProps> = ({userName, city, telegram, github}) => {
  return (
    <div className={`${stylesUserInfo.userInfo}`}>
      <h1 className={`${stylesUserInfo.name}`}>{userName}</h1>
      <p className={`${stylesUserInfo.city}`}>{city}</p>
      { (telegram || github) &&
        <div className={`${stylesUserInfo.contacts}`}>
          {telegram &&
            <a className={`${stylesUserInfo.contact}`} href={`https://t.me/${telegram}`}>
              <img className={`${stylesUserInfo.icon}`} src={IconTelegram} alt='иконка telegram'/>
            </a>
          }
          { github &&
            <a className={`${stylesUserInfo.contact}`} href={`https://github.com/${github}`}>
              <img className={`${stylesUserInfo.icon}`} src={IconGithub} alt='иконка github'/>
            </a>
          }
        </div>
      }
    </div>
  )
}
