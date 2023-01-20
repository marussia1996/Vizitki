import { buffer } from 'node:stream/consumers';
import { Redirect, useLocation, useParams, useRouteMatch } from 'react-router'
import { Button } from '../../shared/Button/Button'
import stylesLogin from '../LoginPage/LoginPage.module.scss'

export const LoginPage = () => {
  const response_type='token';
  const client_id ='e0363480e511432f87948725fe869e7f';
  const redirect_uri = 'http%3A%2F%2Flocalhost%3A3000%2Flogin';
  const client_secret = '164de9d6956b453a8bf09998aa50220d';

  const handleClick = () =>{
    window.location.assign(`https://oauth.yandex.ru/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`);
  }
  const location = useLocation();
  console.log('hash');
  console.log(location.hash);
  if(location.hash){
    const access_token = location.hash.match(/#access_token=([\w-]+)/);
    access_token && localStorage.setItem('access_token', access_token[1])
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
