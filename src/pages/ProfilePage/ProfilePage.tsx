import React from 'react'
import { InputTextArea } from '../../components/InputTextArea/InputTextArea'
import stylesProfile from '../ProfilePage/ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <section className={`${stylesProfile.profilePage}`}>
      <InputTextArea state={'other'}/>
      <InputTextArea state={'quote'} label={'Девиз, цитата'}/>
      <InputTextArea state={'other'} label={'Из какой сферы пришёл? Кем работаешь?'}/>
      <InputTextArea state={'other'} label={'Почему решил учиться на веб-разработчика?'}/>     
    </section>
  )
}
