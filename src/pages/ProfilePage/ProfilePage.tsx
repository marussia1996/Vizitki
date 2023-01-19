import React from 'react'
import { InputTextArea } from '../../shared/inputs/InputTextArea/InputTextArea'
import stylesProfile from '../ProfilePage/ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <section className={`${stylesProfile.profilePage}`}>
      <InputTextArea name={'other'} value={'other'}/>
      <InputTextArea name={'quote'} value={'quote'} labelText={'Девиз, цитата'}/>
      <InputTextArea name={'quote'} value={'other'} labelText={'Из какой сферы пришёл? Кем работаешь?'}/>
      <InputTextArea name={'quote'} value={'other'} labelText={'Почему решил учиться на веб-разработчика?'}/>     
    </section>
  )
}
