import { useState } from 'react'
import { Redirect, useHistory, useLocation} from 'react-router'
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
      _id: 'a18ca3c1e13dd93ddded5bbc',
      email: 'hjkll',
      name: 'admin',
      cohort: 'web-12', 
      image: 'https://loremflickr.com/640/480/cats',
      tags: 'curator'
    }
    const student = {
      _id: '2cb3baaa7528a9bb5e2c20d9',
      email: 'Chaim.Armstrong@gmail.com',
      name: 'Ricky Fadel',
      cohort: 'web+16',
      tags: 'student',
      image: 'https://loremflickr.com/640/480/cats' 
    }
    const isCurator = localStorage.getItem('curator');
    localStorage.setItem('user', JSON.stringify(isCurator && isCurator === 'true' ? admin : student))
  }
  const userRaw = localStorage.getItem('user');
  const user = userRaw && JSON.parse(userRaw);
  if(userRaw && user.tags === 'curator'){
    return <Redirect to='/admin'/>
  }
  else if(userRaw && user.tags === 'student'){
    return <Redirect to='/'/>
  }

  const onChange = (e: any) =>{
    console.log(e.target.checked);
    localStorage.setItem('curator', e.target.checked)
  }
  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <label> Войти как куратор
        <input type='checkbox' name='role' onChange={onChange}></input>
      </label>
      <Button size={'Large'} onClick={redirectToYandex} disabled={false} htmlType={'submit'}>Войти с Яндекс ID</Button>
    </section>
  )
}
