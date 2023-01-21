import React from 'react';
import styles from './DetailPage.module.scss';
import Icon from '../../shared/Icon/Icon';
import {telegramIcon} from '../../shared/Icon/lib';
import {githubIcon} from '../../shared/Icon/lib';
import {MaskAvatar} from '../../components/MaskAvatar/MaskAvatar';
import Quete from '../../components/Quete/Quete';

export const DetailPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapUser}>
        <div className={styles.user}>
  				<h2 className={styles.userName}>Виктория Листвиновская</h2>
      		<p className={styles.userCity}>Калуга</p>
      		<div className={styles.socialNetwork}>
            <Icon path={telegramIcon} width={'32px'} height={'32px'}/>
            <Icon path={githubIcon} width={'32px'} height={'32px'}/>
      		</div>
      	</div>
        <div className={styles.wrapComponents}>
          <MaskAvatar/>
          <Quete text='Делай, что должно и будь, что будет.'/>
        </div>
        

      </div>

    </section>
  )
}
