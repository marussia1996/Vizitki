import React, { FormEvent, useState } from 'react'
import { PhotoUpload } from '../../components/PhotoUpload/PhotoUpload'
import {InputFile} from "../../shared/inputs/InputFile/InputFile";
import {TInputChange} from "../../shared/inputs";
import {InputTextArea} from "../../shared/inputs/InputTextArea/InputTextArea";
import {InputDay} from "../../shared/inputs/InputDay/InputDay";
import stylesProfile from '../ProfilePage/ProfilePage.module.scss'
import InputText from '../../shared/inputs/InputText/InputText';
import { Button } from '../../shared/Button/Button';
import { InputSearch } from '../../shared/inputs/InputSearch/InputSearch';

export const city = [
  'Абаза', 
  'Абакан', 
  'Абдулино', 
  'Абинск', 
  'Агидель', 
  'Агрыз', 
  'Адыгейск', 
  'Азнакаево'
]
  
export const theme = [
  'серьезный', 
  'романтический', 
  'дерзкий'
]

type TInputState = {
  birthday?: Date,
  city: string,
  telegram: string,
  github: string,
  template: string,
  quote: string,
  hobbiesFile: File | undefined,
  hobbiesText: string,
  familyFile: File | undefined,
  familyText: string,
  jobText: string,
  eduText: string,
}
export const ProfilePage = () => {
  //TODO: запрос данных пользователя 
  const [state, setState] = useState<TInputState>({
    birthday: undefined,
    telegram: '',
    github: '',
    city: '',
    template: '',
    quote: '',
    hobbiesFile: undefined,
    hobbiesText: '',
    familyFile: undefined,
    familyText: '',
    jobText: '',
    eduText: ''
  });
  //TODO: валидация по заполнению поля birthday и city
  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    //TODO: отправка формы на сервер
    console.log(state)
  }
  const onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | TInputChange<any>) => {
    setState({...state, [e.target.name]:e.target.value})
  }
  return (
    <section className={`${stylesProfile.profilePage}`}>
      <form className={`${stylesProfile.formProfile}`} onSubmit={handleSubmit} noValidate>
        {/* TODO: надо исправить фото загрузку, чтобы изменения в этом компоненте появлялись, чтобы пропсы пробросить можно было image и тп */}
        <PhotoUpload/>
        {/* если поле не заполнено передать ошибку */}
        <InputDay error={state.birthday ? '' : 'Поле обязательно для заполнения'} name={'birthday'} date={state.birthday} labelText={'Дата рождения *'} maxDate={new Date(Date.UTC(2022, 1, 5))}
        onDateChange={onChange}/>
        {/* TODO: исправить компонент поиска (проброс пропсов, списка опций, ошибка и тд), подправить стили */}
        <InputSearch options={city}/>
        <InputText name={'telegram'} labelText={'Ник в телеграмм'} onChange={onChange} />
        <InputText name={'github'} labelText={'Ник в гитхабе'} onChange={onChange} />
        {/* TODO: исправить компонент поиска */}
        <InputSearch options={theme}/>
        <InputTextArea name={'quote'} labelText={'Девиз, цитата'} value={state.quote} onChange={onChange} maxLength={100} rows={4}/>
        <div>
          <InputFile name={'hobbiesFile'} labelText={'Увлечения, досуг, интересы'} description={'Рекомендуемый размер фото 230х129'} onFileChange={onChange} />
          <InputTextArea name={'hobbiesText'} value={state.hobbiesText} onChange={onChange} maxLength={300} rows={4}/>
        </div>
        <div>
          <InputFile name={'familyFile'} labelText={'Семья, статус, домашние животные'} description={'Рекомендуемый размер фото 230х129'} onFileChange={onChange} />
          <InputTextArea name={'familyText'} value={state.familyText} onChange={onChange} maxLength={300} rows={4}/>
        </div>
        <InputTextArea name={'jobText'} labelText={'Из какой сферы пришёл? Кем работаешь?'} value={state.jobText} onChange={onChange} maxLength={300} rows={4}/>
        <InputTextArea name={'eduText'} labelText={'Почему решил учиться на веб-разработчика?'} value={state.eduText} onChange={onChange} maxLength={300} rows={4}/>
        <span className={`${stylesProfile.description}`}>Поля, отмеченные звездочкой, обязательны для заполнения</span>
        <Button size='Large' disabled={false} htmlType='submit'>Сохранить</Button>
      </form>
    </section>
  )
}
