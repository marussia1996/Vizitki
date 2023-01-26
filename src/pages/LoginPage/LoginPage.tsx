import {useContext, useEffect} from 'react'
import {useLocation} from 'react-router'
import {AuthContext} from '../../services/AuthContext'
import {RoleType} from '../../services/types/types'
import {Button} from '../../shared/Button/Button'
import {redirectToYandex} from '../../utils/auth'
import stylesLogin from '../LoginPage/LoginPage.module.scss'
import {fakeUser, parseAuthHash} from "../../utils/helpers";


export const LoginPage = () => {
  const location = useLocation();

  const {login, updateRole, role} = useContext(AuthContext);

  useEffect(() => {
    if (location.hash) {
      const tokenInfo = parseAuthHash(location.hash);

      if (tokenInfo) {
        const user = fakeUser();
        login({token: tokenInfo.token, expired: tokenInfo.expired}, user, false);
      }
    }
  }, [location])

  return (
    <section className={`${stylesLogin.loginPage}`}>
      <h1 className={`${stylesLogin.title}`}>С кем я учусь?</h1>
      <label> Войти как куратор
        <input type='checkbox' name='role' checked={role === RoleType.Curator}
               onChange={(e) => updateRole(e.target.checked ? RoleType.Curator : RoleType.Student)}></input>
      </label>
      <Button size={'Large'} onClick={() => redirectToYandex(window.location.href)} disabled={false}
              htmlType={'submit'}>Войти с Яндекс ID</Button>
    </section>
  )
}
