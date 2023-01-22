import './MainPage.scss';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"
import { InputSearch } from '../../shared/inputs/InputSearch/InputSearch';
import { city } from '../../shared/inputs/InputSearch/test'; //FIXME ТЕСТОВЫЕ ДАННЫЕ. Убрать
import { UserCard } from '../../components/UserCard/UserCard';
import Loader from '../../components/Loader/Loader';
import { getProfiles } from '../../utils/api';
import { TGetProfilesRaw } from '../../services/types/types';

export const MainPage = () => {
  const [state, setState] = useState<TGetProfilesRaw>();

  useEffect(() => {
    getProfiles().then((res) => {
      if(res) {
        setState(res);
      }
    });
  }, []);

  return (
    <div className="page">
      <div className='content'>
        <InputSearch options={city} value=''/>
        <div className='linkCnt'>
          <NavLink to="/map" className='link'>Посмотреть на карте</NavLink>
        </div>
        <div className='cardsCnt'>
          {state?.items.map((student) => {
            const { name, photo, city } = student.profile;
            return (
              <UserCard name={name} photo={photo} city={city.name} id={student._id} />
            )
          })}
        </div>
      </div>
      {!state && (
        <div className='loaderCnt'>
          <Loader />
        </div>
      )}
    </div>
  )
}
