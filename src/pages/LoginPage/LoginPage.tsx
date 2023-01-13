import { Button } from '../../components/Button/Button'
import stylesLogin from '../LoginPage/LoginPage.module.scss'

export const LoginPage = () => {
  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <Button text='Войти с Яндекс ID' className='buttonLarge' onClick={()=>{console.log('send')}} disabled={false} type='submit'/>
    </section>
  )
}
