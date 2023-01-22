import React, { FormEvent, useEffect, useState } from 'react'
import { PhotoUpload } from '../../components/PhotoUpload/PhotoUpload'
import {InputFile} from "../../shared/inputs/InputFile/InputFile";
import {TInputChange} from "../../shared/inputs";
import {InputTextArea} from "../../shared/inputs/InputTextArea/InputTextArea";
import {InputDay} from "../../shared/inputs/InputDay/InputDay";
import stylesProfile from '../ProfilePage/ProfilePage.module.scss'
import InputText from '../../shared/inputs/InputText/InputText';
import { Button } from '../../shared/Button/Button';
import { InputSearch } from '../../shared/inputs/InputSearch/InputSearch';
import { getUserProfile } from '../../utils/api';
import { TThemeProfile, UserWithProfileRaw } from '../../services/types/types';

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
//TODO: лучше использовать стринг для ошибок
export type TInputState = {
  photo: string,
  birthday?: Date,
  errBirthday: boolean,
  city: string,
  errCity: boolean,
  telegram: string,
  github: string,
  template: string,
  quote: string,
  hobbiesFile: string | undefined,
  hobbiesText: string,
  familyFile: string | undefined,
  familyText: string,
  jobText: string,
  eduText: string,
}
export const ProfilePage = () => {
  //Получить ид пользователя из локалстору текущего чтобы запросить данные о этом пользователе
  const userRaw = localStorage.getItem('user');
  //TODO: запрос данных пользователя 
  const [state, setState] = useState<TInputState>({
    photo: '',
    birthday: undefined,
    errBirthday: false,
    errCity: false,
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
  const validity = () =>{
    if(state.birthday === undefined){
      state.errBirthday = true;
      setState({...state})
    }
    if(state.city === ''){
      state.errCity = true;
      setState({...state})
    }
    return (!state.errBirthday && !state.errCity);
  }
  useEffect(()=>{
    const user = userRaw && JSON.parse(userRaw);
    getUserProfile(user._id)
    .then((res)=>
      {
        console.log(res)
        loaderData(res);
      }
    )
  },[])
  const loaderData = (data:UserWithProfileRaw )=>{
    const obj: TInputState = {
      photo: data.profile.photo,
      birthday: new Date(data.profile.birthday),
      errBirthday: false,
      errCity: false,
      telegram: data.profile.telegram,
      github: data.profile.github,
      city: data.profile.city.name,
      template: themeParse(data.profile.template),
      quote: data.profile.quote,
      hobbiesFile: data.info.hobby.image,
      hobbiesText: data.info.hobby.text,
      familyFile: data.info.status.image,
      familyText: data.info.status.text,
      jobText: data.info.job.text,
      eduText: data.info.job.text
    }
    console.log(obj)
    setState({...obj})
    
  }
  const themeParse = (themeRaw: string) => {
    if(themeRaw !== null){
      if(themeRaw === 'romantic'){
        return theme[1]
      }
      if(themeRaw === 'derzkiy'){
        return theme[2]
      }
    }
    return theme[0];
  }
  useEffect(()=>{
    state.errBirthday = false;
    setState({...state})
  },[state.birthday])
  useEffect(()=>{
    state.errCity = false;
    setState({...state})
  },[state.city])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(!validity()){
      alert('Заполните все необходимые поля')
    }
    else{
      alert('форма изменена')
    }
    //TODO: отправка формы на сервер
    
  }
  const onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | TInputChange<any>) => {
    setState({...state, [e.target.name]:e.target.value})
  }
  return (
    <section className={`${stylesProfile.profilePage}`}>
      <form className={`${stylesProfile.formProfile}`} onSubmit={handleSubmit} noValidate>
        <PhotoUpload name={'photo'} value={state.photo} onFileChange={onChange}/>
        <InputDay error={state.errBirthday ? 'Поле обязательно для заполнения' : ''} name={'birthday'} date={state.birthday} labelText={'Дата рождения *'} maxDate={new Date(Date.UTC(2022, 1, 5))}
        onDateChange={onChange}/>
        <InputSearch labelText={'Выберите город *'} error={state.errCity ? 'Поле обязательно для заполнения' : ''} options={city} value={state.city} onChange={onChange} name={'city'}/>
        <InputText name={'telegram'} labelText={'Ник в телеграмм'} onChange={onChange} />
        <InputText name={'github'} labelText={'Ник в гитхабе'} onChange={onChange} />
        <InputSearch labelText='Выберите шаблон' options={theme} value={state.template} onChange={onChange} name={'template'}/>
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
