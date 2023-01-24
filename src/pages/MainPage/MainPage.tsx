import './MainPage.scss';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom"
import { UserCard } from '../../components/UserCard/UserCard';
import Loader from '../../components/Loader/Loader';
import { getProfiles } from '../../utils/api';
import { TGetProfilesRaw } from '../../services/types/types';
import { v4 as createUUID } from 'uuid';
import Suggest, { TSelected } from '../../shared/inputs/Suggest/Suggest';
import { TInputChange } from '../../shared/inputs';

export const MainPage = () => {
  const [state, setState] = useState<TGetProfilesRaw>();
  const [city, setCity] = useState<string>('');
  useEffect(() => {
    getProfiles().then((res) => {
      if(res) {
        setState(res);
      }
    });
  }, []);

  const params = useParams();
  console.log(params)
  const onCityChange = (e: TInputChange<TSelected>) => {
    if (e.target && e.target.value) {
      setCity(e.target.value.name)
    }
  }

  return (
    <div className="page">
      <div className='content'>
      <Suggest onChange={onCityChange}
                 placeHolder={'Все города'}
                 value={city} name={'city'}/>
        <div className='linkCnt'>
          <NavLink to="/map" className='link'>Посмотреть на карте</NavLink>
        </div>
        <div className='cardsCnt'>
          {state?.items.filter((item)=>city !== '' ? item.profile.city.name === city : true).map(student => {
            const { name, photo, city } = student.profile;
            return (
              <UserCard name={name} photo={photo} city={city.name} id={student._id} key={createUUID()} />
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
