import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const userRaw = localStorage.getItem('user');
  const user = userRaw && JSON.parse(userRaw);
  const url = userRaw && user.tags === 'curator' ? '/admin' : '/'
  return (
    <section className={styles.page}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>Страница не найдена</p>
        <p className={styles.description}>
            Вернуться на 
            <Link to={url} className={styles.link}>главную страницу</Link>
        </p>
        <ul className={styles.circles}>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
          <li className={styles.circle}></li>
        </ul>
      </div>
  </section>
  )
};
