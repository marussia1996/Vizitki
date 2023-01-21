import { Redirect } from 'react-router';
import { getUsers } from '../../utils/api';

export const MainPage = () => {

    getUsers()
    .then((res)=>{
      localStorage.setItem('users', JSON.stringify(res))
    })
    .catch(()=>{
      console.log('err')
    })
  return (
    <div>MainPage</div>
  )
}
