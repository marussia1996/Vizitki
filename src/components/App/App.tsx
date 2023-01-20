import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import AlexeyM from '../../pages/AlexeyM/AlexeyM';
import { TLocation } from '../../services/types/types';
import './App.scss';
import { Header } from '../Header/Header';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Footer } from '../Footer/Footer';
import Evgenys from "../EvgenyS/Evgenys";
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import AdminPage from '../../pages/AdminPage/AdminPage';
import { MainPage } from '../../pages/MainPage/MainPage';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { getUsers } from '../../utils/api';
import { MapPage } from '../../pages/MapPage/MapPage';

export const App = () => {
  const location = useLocation<TLocation>();
  const response_type='token';
  const client_id ='e0363480e511432f87948725fe869e7f';
  const redirect_uri = 'http%3A%2F%2Flocalhost%3A3000%2Flogin';
  const client_secret = '164de9d6956b453a8bf09998aa50220d';

  //если хаш есть, то есть ответ от яндекса пришел, то достаем токен
  if(location.hash){
    const access_token = location.hash.match(/#access_token=([\w-]+)/);
    access_token && localStorage.setItem('access_token', access_token[1])
  }
  const dataTest = {
    profile: {
      name: "Ivan Ivanov",
      photo: "https://placehold.co/600",
      city: {
        name: "blabla",
        geocode: [
          55.73433517114847,
          37.59017466910319
        ]
      },
      birthday: "1978-06-16",
      quote: "cupidatat voluptate",
      telegram: "Ut ullamco ex do sit",
      github: "consequat nostrud",
      template: "Ut aliqua dolore do"
    },
    info: {
      hobby: {
        text: "",
        image: null
      },
      status: {
        text: "",
        image: null
      },
      job: {
        text: "",
        image: null
      },
      edu: {
        text: "",
        image: null
      }
    }
  }
  const commentTest = {
    target: 'job', 
    text: 'string' 
  }

  return (
      <div className='app'>
        <Header />
        <main className='main'>
          <Switch location={location}>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/maria">
              <h1>Привет, Мария</h1>
            </Route>
            <Route exact path="/vadim">
              <h1>Привет, Вадим</h1>
            </Route>
            <Route exact path="/evgeniy">
              <h1>Привет, Евгений</h1>
            </Route>
            <Route exact path="/evgeniya">
              <h1>Привет, Евгения</h1>
            </Route>
            <Route exact path="/alexey">
              <AlexeyM />
            </Route>
            <Route exact path="/evgenys">
              <Evgenys />
            </Route>
            <ProtectedRoute exact path="/map">
              <MapPage />
            </ProtectedRoute>
            <ProtectedRoute path="/admin">
              <AdminPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/">
              <MainPage />
            </ProtectedRoute>
          </Switch>
        </main>
        <Footer />
      </div>
  )
}