import './MainPage.scss';
import { NavLink } from "react-router-dom"
import { InputSearch } from '../../shared/inputs/InputSearch/InputSearch';
import { city } from '../../shared/inputs/InputSearch/test'; //TODO ТЕСТОВЫЕ ДАННЫЕ. Убрать
import { UserCard } from '../../components/UserCard/UserCard';

export const MainPage = () => {
  return (
    <div className="page">
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
  )
}
