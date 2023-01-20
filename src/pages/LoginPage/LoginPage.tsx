import { FC } from 'react'
import { Redirect, useLocation} from 'react-router'
import { TLocation } from '../../services/types/types'
import { Button } from '../../shared/Button/Button'
import { redirectToYandex } from '../../utils/auth'
import stylesLogin from '../LoginPage/LoginPage.module.scss'


export const LoginPage = () => {
  const location = useLocation<TLocation>();
  //если хаш есть, то есть ответ от яндекса пришел, то достаем токен
  if(location.hash){
    console.log(location.hash)
    //время жизни токена
    const timeToken: RegExpMatchArray | null = location.hash.match(/expires_in=(\d+)/);
    //время на момент прихода токена
    const timeNow: number = Math.floor(new Date().getTime() / 1000);
    //через сколько токен надо обновлять
    const accessTokenTimeRefresh: string = String(timeToken && (Number(timeToken[1]) + Number(timeNow)));
    accessTokenTimeRefresh && localStorage.setItem('accessTokenTimeRefresh', accessTokenTimeRefresh);
    // timeToken && localStorage.setItem('timeToken', timeToken[1])
    const accessToken = location.hash.match(/#access_token=([\w-]+)/);
    accessToken && localStorage.setItem('accessToken', accessToken[1])
    //фейк на получение данных о пользователе
    const admin = {
      email: 'hjkll',
      name: 'blblblb',
      curator: 'web-12', 
      image: '' 
    }
    const student = {
      email: 'hjkll',
      name: 'blblblb',
      cohort: 'web-12',
      image: '' 
    }
    localStorage.setItem('user', JSON.stringify(student))
  }
  const userRaw = localStorage.getItem('user');
  if(userRaw && userRaw.includes('curator')){
    return <Redirect to='/admin'/>
  }
  else if(localStorage.getItem('user')){
    return <Redirect to='/'/>
  }

  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <Button size={'Large'} onClick={redirectToYandex} disabled={false} htmlType={'submit'}>Войти с Яндекс ID</Button>
    </section>
  )
}
