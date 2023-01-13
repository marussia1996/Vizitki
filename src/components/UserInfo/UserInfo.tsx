import stylesUserInfo from '../UserInfo/UserInfo.module.scss'
import IconTelegram from '../../images/telegram.svg'
import IconGithub from '../../images/github.svg'

export type Props = { userName: string; city: string; telegram?: string;  github?: string;}

export const UserInfo = ({userName, city, telegram, github}:Props) => {
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
