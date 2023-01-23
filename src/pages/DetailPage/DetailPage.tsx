import {useEffect, FC, useState} from 'react';
import styles from './DetailPage.module.scss';
import {MaskAvatar} from '../../components/MaskAvatar/MaskAvatar';
import Quete from '../../components/Quete/Quete';
import DetailCard from '../../components/DetailCard/DetailCard';
import {UserInfo} from '../../components/UserInfo/UserInfo';
import { useParams } from "react-router-dom";
import {getUserProfile} from '../../utils/api';
import {BaseFiedsRaw, TThemeProfile, UserWithProfileRaw} from '../../services/types/types';

export const DetailPage = () => {
  const { id } = useParams<{id: string}>();
  const [user, setUser] = useState<BaseFiedsRaw & UserWithProfileRaw & {reactions: number}>()

  useEffect(()=>{
    getUserProfile(id)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res));
      setUser(res);
      }
    )
    .catch(()=>{
      console.log('err')
    })
  }, [id])

  const changeTheme = () => 
    user?.profile.template === null 
      ? TThemeProfile.DEFAULT 
      : user?.profile.template === 'romantic' 
      ? TThemeProfile.ROMANTIC 
      : TThemeProfile.DARING
  
  return (
    <>
      {user && (<section className={styles.section}>
        <div className={styles.wrapUser}>
          <div className={styles.user}>
            <UserInfo userName={user.profile.name} 
              city={user.profile.city.name} 
              telegram={user.profile.telegram}  
              github={user.profile.github}
            />
      	  </div>
          <div className={styles.wrapComponents}>
            <MaskAvatar photo={user.profile.photo} theme={changeTheme()}/> 
            {user.profile.quote !== '' ? (
              <Quete text={user.profile.quote}
                theme={changeTheme()}/>
            ) : ''}
          </div>
        </div>
        <div className={styles.wrapPosts}>
          <ul className={styles.posts}>
            <li>
              <DetailCard heading='Увлечения' text={user.info.hobby.text ? user.info.hobby.text : ''}
                image={user.info.hobby.image}
                theme={changeTheme()}
                location='hobby'/>
            </li>
            <li>
              <DetailCard heading='Семья' text={user.info.status.text ? user.info.status.text : ''}
                image={user.info.status.image}
                theme={changeTheme()}
                location='status'/>
            </li>
            <li>
              <DetailCard heading='Сфера' text={user.info.job.text ? user.info.job.text : ''}
                theme={changeTheme()}
                location='job'/>
            </li>
            <li>
              <DetailCard heading='Учеба' text={user.info.edu.text ? user.info.edu.text : ''}
                theme={changeTheme()}
                location='edu'/>
            </li>
          </ul>
        </div>
      </section>
      )}
    </>
  )
}
