import { Button } from '../../components/Button/Button'
import { TButtonView } from '../../services/types/types'
import stylesLogin from '../LoginPage/LoginPage.module.scss'
//пока нет ответа о том, как должна вести себя шапка страницка будет такой)
export const LoginPage = () => {
  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <Button text='Войти с Яндекс ID' view={TButtonView.LARGE} onClick={()=>{console.log('send')}} disabled={false} type='submit'/>
    </section>
  )
}
