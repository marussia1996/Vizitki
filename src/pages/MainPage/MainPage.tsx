import './MainPage.scss';
import { FormEvent, useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom"
import { UserCard } from '../../components/UserCard/UserCard';
import Loader from '../../components/Loader/Loader';
import { getProfiles } from '../../utils/api';
import { BaseFiedsRaw, ShortProfileRaw, TGetProfilesRaw, UserAccountRaw } from '../../services/types/types';
import { v4 as createUUID } from 'uuid';
import Suggest, { TSelected } from '../../shared/inputs/Suggest/Suggest';
import { TInputChange } from '../../shared/inputs';
import Scroll from '../../components/Scroll/Scroll';

export const MainPage = () => {
  const [profiles, setProfiles] = useState<Array<BaseFiedsRaw & UserAccountRaw & {
    profile: ShortProfileRaw}>>([]);
  const [city, setCity] = useState<string>('');
  useEffect(() => {
    getProfiles().then((res) => {
      if(res) {
        setProfiles(res.items);
      }
    });
  }, []);
  
  const params = useParams();
  console.log(params)
  const onCityChange = (e: TInputChange<TSelected>) => {
    console.log(e.target.value?.name);
    if (e.target && e.target.value) {
      setCity(e.target.value.name)
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(city)
  }
  console.log(city);
  return (
    <div className="page">
      <div className='header'>
        <form onSubmit={handleSubmit}>
        <Suggest onChange={onCityChange}
                 placeHolder={'Все города'}
                 value={city} name={'city'}
                 mix={'maxWidth'}/>
        </form>
        <div className='linkCnt'>
          <NavLink to="/map" className='link'>Посмотреть на карте</NavLink>
        </div>
      </div>
      {/* <div className='scrollContainer'>
      <Scroll> */}
      <div className='content'>
        
        {profiles.filter((item)=>city !== '' ? item.profile.city.name === city : true).map(student => {
          const { name, photo, city } = student.profile;
          return (
            <UserCard name={name} photo={photo} city={city.name} id={student._id} key={createUUID()} />
          )
        })}
        {profiles.filter((item)=>city !== '' ? item.profile.city.name === city : true).map(student => {
          const { name, photo, city } = student.profile;
          return (
            <UserCard name={name} photo={photo} city={city.name} id={student._id} key={createUUID()} />
          )
        })}
        {profiles.filter((item)=>city !== '' ? item.profile.city.name === city : true).map(student => {
          const { name, photo, city } = student.profile;
          return (
            <UserCard name={name} photo={photo} city={city.name} id={student._id} key={createUUID()} />
          )
        })}
        {profiles.filter((item)=>city !== '' ? item.profile.city.name === city : true).map(student => {
          const { name, photo, city } = student.profile;
          return (
            <UserCard name={name} photo={photo} city={city.name} id={student._id} key={createUUID()} />
          )
        })}
        
      </div>
      {/* </Scroll>
      </div> */}
      {!profiles && (
        <div className='loaderCnt'>
          <Loader />
        </div>
      )}
    </div>
  )
}
