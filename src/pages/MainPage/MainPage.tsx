import './MainPage.scss';
import { NavLink } from "react-router-dom"
import { InputSearch } from '../../shared/inputs/InputSearch/InputSearch';
import { city } from '../../shared/inputs/InputSearch/test'; //TODO ТЕСТОВЫЕ ДАННЫЕ. Убрать
import { UserCard } from '../../components/UserCard/UserCard';
import Loader from '../../components/Loader/Loader';
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
    <div className="page">
      <div className='content'>
        <InputSearch options={city} />
        <div className='linkCnt'>
          <NavLink to="/map" className='link'>Посмотреть на карте</NavLink>
        </div>
        <div className='cardsCnt'>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
      <div className='loaderCnt'>
        <Loader />
      </div>
    </div>
  )
}
