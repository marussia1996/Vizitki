import styles from './InputSearch.module.scss';
import arrow from '../../images/arrow.svg';
import Scroll from '../Scroll/Scroll';
import { YMaps, Map } from "react-yandex-maps";

export const InputSearch = () => {
  return (
    <div className={styles.wrap}>
      <label className={styles.label}></label>
      <input
        type='text'
        id='suggest'
        className={styles.input}
        required
      />
      <span className={styles.button}>
        <img src={arrow} alt='Иконка' />
      </span>
      <Scroll>
        <ul className={styles.list}>
          <li className={styles.option}></li>
        </ul>
      </Scroll>
    </div>
  )
}