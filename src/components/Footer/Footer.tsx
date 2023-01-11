import React from 'react'
import styles from '../Footer/Footer.module.scss'

export const Footer = () => {
  return (
    <div className={`${styles.footer}`}>
      <p className={`${styles.paragraph}`}>&#169; Визитки</p>
      <p className={`${styles.paragraph}`}>Команда №5</p>
    </div>
  )
}
