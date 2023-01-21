import {useEffect, } from 'react';
import styles from './DetailPage.module.scss';
import {MaskAvatar} from '../../components/MaskAvatar/MaskAvatar';
import Quete from '../../components/Quete/Quete';
import DetailCard from '../../components/DetailCard/DetailCard';
import {UserInfo} from '../../components/UserInfo/UserInfo';
import { useParams } from "react-router-dom";
import {getUserProfile} from '../../utils/api';
import {TThemeProfile} from '../../services/types/types';

export const DetailPage = () => {
  const { _id } = useParams<{_id: string}>();

  useEffect(()=>{
    getUserProfile("abfccdaa23e0bd1c4448d2f3")
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res));
      }
    )
    .catch(()=>{
      console.log('err')
    })
  })

  const userRaw = localStorage.getItem('user');
  const user = userRaw && JSON.parse(userRaw);
  //TODO: как-то тупо выглядит смена темы, но пока ничего другого в голову не приходит
  return (
    <section className={styles.section}>
      <div className={styles.wrapUser}>
        <div className={styles.user}>
          <UserInfo userName={user.profile.name} 
            city={user.profile.city.name} 
            telegram={user.profile.telegram}  
            github={user.profile.github}
          />
      	</div>
        <div className={styles.wrapComponents}>
          <MaskAvatar photo={user.profile.photo} theme={user.profile.template === null 
            ? TThemeProfile.DEFAULT 
            : user.profile.template === 'romantic' 
            ? TThemeProfile.ROMANTIC 
            : TThemeProfile.DARING}/> 
          {user.profile.quote !== '' ? (
            <Quete text={user.profile.quote}
              theme={user.profile.template === null 
                ? TThemeProfile.DEFAULT 
                : user.profile.template === 'romantic' 
                ? TThemeProfile.ROMANTIC 
                : TThemeProfile.DARING}/>
          ) : null}
        </div>
      </div>
      <div className={styles.wrapPosts}>
        <ul className={styles.posts}>
          <li>
            <DetailCard heading='Увлечения' text={user.info.hobby.text}
              image={user.info.hobby.image}
              theme={user.profile.template === null 
                ? TThemeProfile.DEFAULT 
                : user.profile.template === 'romantic' 
                ? TThemeProfile.ROMANTIC 
                : TThemeProfile.DARING}/>
          </li>
          <li>
            <DetailCard heading='Семья' text={user.info.status.text}
              image={user.info.status.image}
              theme={user.profile.template === null 
                ? TThemeProfile.DEFAULT 
                : user.profile.template === 'romantic' 
                ? TThemeProfile.ROMANTIC 
                : TThemeProfile.DARING}/>
          </li>
          <li>
            <DetailCard heading='Сфера' text={user.info.job.text}
              image={user.info.job.image}
              theme={user.profile.template === null 
                ? TThemeProfile.DEFAULT 
                : user.profile.template === 'romantic' 
                ? TThemeProfile.ROMANTIC 
                : TThemeProfile.DARING}/>
          </li>
          <li>
            <DetailCard heading='Учеба' text={user.info.edu.text}
              image={user.info.edu.image}
              theme={user.profile.template === null 
                ? TThemeProfile.DEFAULT 
                : user.profile.template === 'romantic' 
                ? TThemeProfile.ROMANTIC 
                : TThemeProfile.DARING}/>
          </li>
        </ul>
      </div>
    </section>
  )
}
