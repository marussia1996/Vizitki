import React, {FormEvent, useEffect, useState} from 'react'
import {PhotoUpload} from '../../components/PhotoUpload/PhotoUpload'
import {InputFile} from "../../shared/inputs/InputFile/InputFile";
import {TInputChange} from "../../shared/inputs";
import {InputTextArea} from "../../shared/inputs/InputTextArea/InputTextArea";
import {InputDay} from "../../shared/inputs/InputDay/InputDay";
import stylesProfile from '../ProfilePage/ProfilePage.module.scss'
import InputText from '../../shared/inputs/InputText/InputText';
import {Button} from '../../shared/Button/Button';
import {InputSearch} from '../../shared/inputs/InputSearch/InputSearch';
import {getUserProfile, patchUserProfile} from '../../utils/api';
import {InfoItemsRaw, ProfileRaw, UserWithProfileRaw} from '../../services/types/types';
import Suggest, {TSelected} from "../../shared/inputs/Suggest/Suggest";
import {TThemeProfile} from "../../services/types/types";
import {stringEntries, themeToDescription} from "../../utils/types/enums";
import {useAuth} from "../../hooks/useAuth";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../components/Loader/Loader";
import {delay} from "../../utils/utils";

export type TInputState = {
  photo: string,
  birthday?: Date,
  errBirthday: boolean,
  city: string,
  geocode: Array<number>,
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

export const ProfilePage = () => {
  const {user} = useAuth();
  const [state, setState] = useState<TInputState>({
    photo: '',
    birthday: undefined,
    errBirthday: false,
    errCity: false,
    telegram: '',
    github: '',
    city: '',
    geocode: [0, 0],
    template: '',
    quote: '',
    hobbiesFile: '',
    hobbiesText: '',
    familyFile: '',
    familyText: '',
    jobText: '',
    eduText: '',
  });

  const [isLoading, error, fetching] = useFetching(async ([userId]) => {
    if (!user) return;
    // await delay(3000);
    // throw new Error('???? ???????????????? ???????????? ?? ??????????????');
    const res = await getUserProfile(userId);
    loaderData(res);
  })

  useEffect(() => {
    if (!user) return;
    fetching(user._id);
  }, [])

  useEffect(() => {
    setState(prevState => ({...prevState, errBirthday: false}))
  }, [state.birthday])
  useEffect(() => {
    setState(prevState => ({...prevState, errCity: false}))
  }, [state.city])

  const loaderData = (data: UserWithProfileRaw) => {
    const obj: TInputState = {
      photo: data.profile.photo,
      birthday: data.profile.birthday ? new Date(data.profile.birthday) : undefined,
      errBirthday: false,
      errCity: false,
      telegram: data.profile.telegram,
      github: data.profile.github,
      city: data.profile.city.name,
      geocode: data.profile.city.geocode,
      template: data.profile.template,
      quote: data.profile.quote,
      hobbiesFile: data.info.hobby.image,
      hobbiesText: data.info.hobby.text,
      familyFile: data.info.status.image,
      familyText: data.info.status.text,
      jobText: data.info.job.text,
      eduText: data.info.job.text,
    }
    setState(obj)
  }
  const validity = () => {
    if (state.birthday === undefined) {
      setState(prevState => ({...prevState, errBirthday: true}));
    }
    if (state.city === '') {
      setState(prevState => ({...prevState, errCity: true}));
    }
  }

  const [isPatching, errorPatch, fetchPatch] = useFetching(async ([id, data]) => {
    const res = await patchUserProfile(id, data);
    // await delay(3000);
    // throw new Error('???? ?????????????? ?????????????????? ???????????? ???? ????????????');
    loaderData(res);
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('submit')
    e.preventDefault();
    validity();
    if (state.birthday === undefined || state.city === '') {
      return;
    } else {
      const uploadData: { profile: ProfileRaw, info: InfoItemsRaw } = {
        profile: {
          name: user?.name ? user.name : '',
          photo: state.photo,
          city: {
            name: state.city,
            geocode: state.geocode,
          },
          birthday: String(state.birthday),
          quote: state.quote,
          telegram: state.telegram,
          github: state.github,
          template: state.template,
        },
        info: {
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
      if (user) {
        fetchPatch(user._id, uploadData);
      }
    }
  }

  const onChange = <T, >(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | TInputChange<T>) => {
    setState({...state, [e.target.name]: e.target.value})
  }
  const onCityChange = (e: TInputChange<TSelected>) => {
    if (e.target && e.target.value) {
      setState({...state, city: e.target.value.name, geocode: e.target.value.geo})
    }
  }

  return (
    <section className={`${stylesProfile.profilePage}`}>
      {isLoading && <div className={`${stylesProfile.loaderCnt}`}><Loader/></div>}
      {user && !error && !isLoading &&
        <form className={`${stylesProfile.formProfile}`} onSubmit={handleSubmit} noValidate>
          <PhotoUpload name={'photo'} value={state.photo} onFileChange={onChange}/>
          <InputDay error={state.errBirthday ? '???????? ?????????????????????? ?????? ????????????????????' : ''} name={'birthday'}
                    date={state.birthday} labelText={'???????? ???????????????? *'} maxDate={new Date(Date.UTC(2022, 1, 5))}
                    onDateChange={onChange}/>
          <Suggest labelText={'???????????????? ?????????? *'} onChange={onCityChange}
                   error={state.errCity ? '???????? ?????????????????????? ?????? ????????????????????' : ''} placeHolder={state.city}
                   value={state.city} name={'city'}/>
          <InputText name={'telegram'} labelText={'?????? ?? ??????????????????'} value={state.telegram} onChange={onChange}/>
          <InputText name={'github'} labelText={'?????? ?? ??????????????'} value={state.github} onChange={onChange}/>
          <InputSearch options={stringEntries(TThemeProfile)} labelText='???????????????? ????????????' value={state.template}
                       onChange={onChange}
                       name={'template'} toDisplay={themeToDescription}/>
          <InputTextArea name={'quote'} labelText={'??????????, ????????????'} value={state.quote} onChange={onChange}
                         maxLength={100} rows={4}/>
          <div>
            <InputFile name={'hobbiesFile'} labelText={'??????????????????, ??????????, ????????????????'}
                       description={'?????????????????????????? ???????????? ???????? 230??129'} onFileChange={onChange}/>
            <InputTextArea name={'hobbiesText'} value={state.hobbiesText} onChange={onChange} maxLength={300} rows={4}/>
          </div>
          <div>
            <InputFile name={'familyFile'} labelText={'??????????, ????????????, ???????????????? ????????????????'}
                       description={'?????????????????????????? ???????????? ???????? 230??129'} onFileChange={onChange}/>
            <InputTextArea name={'familyText'} value={state.familyText} onChange={onChange} maxLength={300} rows={4}/>
          </div>
          <InputTextArea name={'jobText'} labelText={'???? ?????????? ?????????? ????????????? ?????? ???????????????????'} value={state.jobText}
                         onChange={onChange} maxLength={300} rows={4}/>
          <InputTextArea name={'eduText'} labelText={'???????????? ?????????? ?????????????? ???? ??????-?????????????????????????'} value={state.eduText}
                         onChange={onChange} maxLength={300} rows={4}/>
          <span
            className={`${stylesProfile.description}`}>????????, ???????????????????? ????????????????????, ?????????????????????? ?????? ????????????????????</span>
          <Button size='Large' disabled={isPatching} htmlType='submit'>??????????????????</Button>
        </form>}
      {error && <p className={stylesProfile.error}>{error}</p>}
      {errorPatch && <p className={stylesProfile.error}>{errorPatch}</p>}
    </section>
  )
}