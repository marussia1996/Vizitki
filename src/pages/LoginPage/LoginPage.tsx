import { FC } from 'react'
import { Redirect, useLocation} from 'react-router'
import { Button } from '../../shared/Button/Button'
import stylesLogin from '../LoginPage/LoginPage.module.scss'
type LoginPageProps = {
  response_type: string,
  client_id: string,
  redirect_uri: string
}

export const LoginPage:FC<LoginPageProps> = ({response_type, client_id, redirect_uri}) => {
  
  //клик по кнопке перенаправляет на страницу регистрации через яндекс
  const handleClick = () =>{
    window.location.assign(`https://oauth.yandex.ru/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`);
  }
  
  
  if(localStorage.getItem('access_token')){
    return <Redirect to='/'/>
  }
  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <Button size={'Large'} onClick={handleClick} disabled={false} htmlType={'submit'}>Войти с Яндекс ID</Button>
    </section>
  )
}
