import { Button } from '../../shared/Button/Button'
import stylesLogin from '../LoginPage/LoginPage.module.scss'

export const LoginPage = () => {
  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <Button size={'Large'} onClick={()=>{console.log('send')}} disabled={false} htmlType={'submit'}>Войти с Яндекс ID</Button>
    </section>
  )
}
