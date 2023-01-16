import { Button } from '../../components/Button/Button'
import stylesLogin from '../LoginPage/LoginPage.module.scss'
//пока нет ответа о том, как должна вести себя шапка страницка будет такой)
export const LoginPage = () => {
  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <Button size={'Large'} onClick={(e)=>{console.log('send')}} disabled={false} htmlType={'submit'}>Войти с Яндекс ID</Button>
    </section>
  )
}
