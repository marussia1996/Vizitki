import { Redirect } from 'react-router';
import { getUsers } from '../../utils/api';

export const MainPage = () => {
  const userRaw = localStorage.getItem('user');
  if(userRaw && userRaw.includes('curator')){
    return <Redirect to='/admin'/>
  }
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
