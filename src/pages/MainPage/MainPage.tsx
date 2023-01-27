import './MainPage.scss';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from "react-router-dom"
import { UserCard } from '../../components/UserCard/UserCard';
import Loader from '../../components/Loader/Loader';
import { getProfiles } from '../../utils/api';
import { BaseFiedsRaw, ShortProfileRaw, UserAccountRaw } from '../../services/types/types';
import Suggest, { TSelected } from '../../shared/inputs/Suggest/Suggest';
import { TInputChange } from '../../shared/inputs';
import { useFetching } from '../../hooks/useFetching';
import {delay} from "../../utils/utils";
import { useObserver } from '../../hooks/useObserver';


export const MainPage = () => {
  
  const [profiles, setProfiles] = useState<Array<BaseFiedsRaw & UserAccountRaw & {
    profile: ShortProfileRaw}>>([]);
  const [page, setPage] = useState<number>(0);
  // const [fetching, setFetching] = useState<boolean>(true);
  const [city, setCity] = useState<string>('');
  const [totalPage, setTotalPage] = useState<number>(0);
  const ref = useRef(null);
  //лимит данных приходящих с сервера
  const limit: number = 2;
  //достаем из параметров запроса когорту, чтобы отправить на сервер в запросе
  const {name} = useParams();
  const cohort = name ? name : 'web+';

  const [isLoading, error, fetching] = useFetching(async([page])=>{
    const res = await getProfiles(page, limit, cohort);
    //await delay(3000); - для установки задержки
    // throw new Error('Не удалось получить данные'); - для установки ошибки
    //устанавливаем количество элементов пришедших с апи
    res.total = 20;
    setProfiles(prevState => [...prevState, ...res.items]);
    setTotalPage(Math.ceil(res.total / limit));
  });
  useObserver(ref, page < totalPage , isLoading, ()=>{setPage(prevState => prevState + 1)})
  useEffect(() => {
    fetching(page)
  }, [page]);
  

  const onCityChange = (e: TInputChange<TSelected>) => {
    console.log(e.target.value?.name);
    if (e.target && e.target.value) {
      setCity(e.target.value.name)
    }
  }

  return (
    <div className="page">
      <div className='header'>
        <Suggest onChange={onCityChange}
                 placeHolder={'Все города'}
                 value={city} name={'city'}
                 mix={'maxWidth'}/>
        <div className='linkCnt'>
          <NavLink to="/map" className='link'>Посмотреть на карте</NavLink>
        </div>
      </div>

      <div className='content'>
         {error && <p className='error'>{error}</p>}
        {
        profiles.filter((item)=>city !== '' ? item.profile.city.name === city : true).map((student, index) => {
          const { name, photo, city } = student.profile;
          return (
            // key={student._id} --- должен находится вместо key={index}, это сделано для того,
            // чтобы было возможно без ошибок в консоли проверить подгрузку данных с сервера (а они имеют одинаковое id )
            <UserCard name={name} photo={photo} city={city.name} id={student._id} key={index} /> 
          )
        })}
        
      </div>
      <div style={{height: '20px'}} ref={ref}></div>
      
      {isLoading && (
        <div className='loaderCnt'>
          <Loader/>
        </div>
      )}
    </div>
  )
}
