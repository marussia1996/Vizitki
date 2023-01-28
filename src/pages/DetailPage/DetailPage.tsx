import {useEffect, useState} from 'react';
import styles from './DetailPage.module.scss';
import {MaskAvatar} from '../../components/MaskAvatar/MaskAvatar';
import Quete from '../../components/Quete/Quete';
import DetailCard from '../../components/DetailCard/DetailCard';
import {UserInfo} from '../../components/UserInfo/UserInfo';
import {useParams} from "react-router-dom";
import {getUserProfile, getUserReactions} from '../../utils/api';
import {BaseFiedsRaw, TThemeProfile, TUserReactionsRaw, UserWithProfileRaw} from '../../services/types/types';
import {useFetching} from "../../hooks/useFetching";
import Fetching from "../../shared/Fetching/Fetching";

export const DetailPage = () => {

  const {id} = useParams<{ id: string }>();
  const [user, setUser] = useState<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>()
  const [reactions, setReactions] = useState<TUserReactionsRaw>();

  const [isLoading, error, fetching] = useFetching(async () => {
    //искуственная задержка для тестирования loading
    //await delay(3000);

    //для тестрования ошибки
    //throw new Error('Error text');

    const userData = await getUserProfile(id as string);
    setUser(userData);

    await updateReactions();
  })

  const updateReactions = async () => {
    const reactions = await getUserReactions(id as string);
    setReactions(reactions);
  }

  useEffect(() => {
    fetching();
  }, [])

  const theme: TThemeProfile = user?.profile.template as TThemeProfile;

  return (
    <section className={styles.section}>
      <Fetching isLoading={isLoading} error={error}>
        {user &&
          <div className={styles.grid}>
            <div className={styles.user}>
              <UserInfo userName={user.profile.name}
                        city={user.profile.city.name}
                        telegram={user.profile.telegram}
                        github={user.profile.github}
              />
            </div>
            <div className={styles.wrapAvatar}>
              <MaskAvatar photo={user.profile.photo} theme={theme}/>
            </div>
            <div className={styles.wrapQuete}>
              {user.profile.quote !== '' ? (
                <Quete text="Делай, что должно и будь, что будет."
                       theme={theme} user={user} id={id as string}/>
              ) : ''}
            </div>
            <div className={styles.wrapPosts}>
              <ul className={styles.posts}>
                <li>
                  <DetailCard heading='Увлечения' text={user.info.hobby.text ? user.info.hobby.text : ''}
                              image={user.info.hobby.image}
                              theme={theme}
                              location='hobby' user={user} reactions={reactions} onChange={updateReactions}/>
                </li>
                <li>
                  <DetailCard heading='Семья' text={user.info.status.text ? user.info.status.text : ''}
                              image={user.info.status.image}
                              theme={theme}
                              location='status' user={user} reactions={reactions} onChange={updateReactions}/>
                </li>
                <li>
                  <DetailCard heading='Сфера' text={user.info.job.text ? user.info.job.text : ''}
                              theme={theme}
                              location='job' user={user} reactions={reactions} onChange={updateReactions}/>
                </li>
                <li>
                  <DetailCard heading='Учеба' text={user.info.edu.text ? user.info.edu.text : ''}
                              theme={theme}
                              location='edu' user={user} reactions={reactions} onChange={updateReactions}/>
                </li>
              </ul>
            </div>
          </div>
        }
      </Fetching>
    </section>
  )
}