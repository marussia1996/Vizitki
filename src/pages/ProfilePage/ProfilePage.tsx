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
import { getUserProfile, patchUserProfile } from '../../utils/api';
import { UserWithProfileRaw } from '../../services/types/types';
import { YMaps, withYMaps } from "react-yandex-maps";

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
  hobbiesFile: string,
  hobbiesText: string,
  familyFile: string,
  familyText: string,
  jobText: string,
  eduText: string,
}

//@ts-ignore
function MapSuggestComponent(props) {
  const { ymaps } = props;

  React.useEffect(() => {
    const suggestView = new ymaps.SuggestView("suggest");
  }, [ymaps.SuggestView]);

  return <input type="text" id="suggest" className={`${stylesProfile.input}`} />;
}
export const ProfilePage = () => {
  const SuggestComponent = React.useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
      "SuggestView",
      "geocode",
      "coordSystem.geo"
    ]);
  }, []);
  const userRaw = localStorage.getItem('user');
  const user = userRaw && JSON.parse(userRaw);
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
    hobbiesFile: '',
    hobbiesText: '',
    familyFile: '',
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
    getUserProfile(user._id)
    .then((res)=>
      {
        loaderData(res);
      }
    )
  },[])
  const loaderData = (data:UserWithProfileRaw )=>{
    const obj: TInputState = {
      photo: data.profile.photo,
      birthday: data.profile.birthday ? new Date(data.profile.birthday) : undefined,
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
    setState(obj)
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
  const themeEncode = (userTheme: string) =>{
    if(userTheme !== theme[0]){
      if(userTheme === theme[1]){
        return 'romantic'
      }
      if(userTheme === theme[2]){
        return 'derzkiy'
      }
    }
    return ''
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
      const uploadData = {
        profile: {
        name: user.name,
        photo: state.photo,
        city: {
          name: state.city,
          geocode: [1,1],
        },
        birthday: String(state.birthday),
        quote: state.quote,
        telegram: state.telegram,
        github: state.github,
        template: themeEncode(state.template),
        },
        info:{
          hobby: {
            text: state.hobbiesText,
            image: 'https://placehold.co/600x400?font=roboto',
          },
          status: {
            text: state.familyText,
            image: 'https://placehold.co/600x400?font=roboto',
          },
          job: {
            text: state.jobText,
            image: '',
          },
          edu: {
            text: state.eduText,
            image: '',
          }
        }
      }
      console.log(uploadData)
      patchUserProfile(user._id, uploadData)
    }    
  }
  const onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | TInputChange<any>) => {
    setState({...state, [e.target.name]:e.target.value})
  }
  
  return (
    <section className={`${stylesProfile.profilePage}`}>
      <form className={`${stylesProfile.formProfile}`} onSubmit={handleSubmit} noValidate>
        <PhotoUpload name={'photo'} value={state.photo} onFileChange={onChange}/>
        <YMaps
          enterprise
          query={{ apikey: "9d121fd4-ce9f-40f4-b85b-b5aa165d5bf2" }}>
        <SuggestComponent />
        </YMaps>
        <InputDay error={state.errBirthday ? 'Поле обязательно для заполнения' : ''} name={'birthday'} date={state.birthday} labelText={'Дата рождения *'} maxDate={new Date(Date.UTC(2022, 1, 5))}
        onDateChange={onChange}/>
        <InputSearch labelText={'Выберите город *'} error={state.errCity ? 'Поле обязательно для заполнения' : ''} options={city} value={state.city} onChange={onChange} name={'city'}/>
        <InputText name={'telegram'} labelText={'Ник в телеграмм'} value={state.telegram} onChange={onChange} />
        <InputText name={'github'} labelText={'Ник в гитхабе'} value={state.github} onChange={onChange} />
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
