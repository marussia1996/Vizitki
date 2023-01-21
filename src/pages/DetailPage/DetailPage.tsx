import React from 'react';
import styles from './DetailPage.module.scss';
import Icon from '../../shared/Icon/Icon';
import {telegramIcon} from '../../shared/Icon/lib';
import {githubIcon} from '../../shared/Icon/lib';
import {MaskAvatar} from '../../components/MaskAvatar/MaskAvatar';
import Quete from '../../components/Quete/Quete';
import DetailCard from '../../components/DetailCard/DetailCard';
import photo from '../../images/photo-test.png';
import {UserInfo} from '../../components/UserInfo/UserInfo';

export const DetailPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapUser}>
        <div className={styles.user}>
          <UserInfo userName='Виктория Листвиновская' city='Калуга'/>
      	</div>
        <div className={styles.wrapComponents}>
          <MaskAvatar/>
          <Quete text='Делай, что должно и будь, что будет.'/>
        </div>
      </div>
      <div className={styles.wrapPosts}>
        <ul className={styles.posts}>
          <li>
            <DetailCard heading='Увлечения' text='Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки.'
              image={photo}/>
          </li>
          <li>
            <DetailCard heading='Семья' text='Замужем, двое детей, собака. Живу в городе Калуга, люблю этот маленький городок. С собакой часто ходим на прогулки и наблюдаем за природой.'
              image={photo}/>
          </li>
          <li>
            <DetailCard heading='Сфера' text='Работаю в сфере гостиничного бизнеса, управляющим отелем. Люблю работать с людьми, постоянно вижу новых людей, общаюсь с посетителями, управляю персоналом, обучаю и принимаю на работу новых сотрудников.'/>
          </li>
          <li>
            <DetailCard heading='Учеба' text='Надоело работать в одной сфере, хочу сменить деятельность, нет шансов на рост, хочу быть айтишником. В детстве любила информатику, компьютерные игры и разбираться с программами. Вот вспомнила деские мечты и решила воплотить их в реальность. Надеюсь, что у меня все получится.'/>
          </li>
        </ul>

      </div>
    </section>
  )
}
