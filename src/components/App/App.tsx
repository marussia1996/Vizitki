import React, { FC } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AlexeyM from '../../pages/AlexeyM/AlexeyM';
import { TLocation } from '../../services/types/types';
import './App.scss';
import {  Header  } from '../Header/Header';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Footer } from '../Footer/Footer';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';

export const App: FC = () => {
  const location = useLocation<TLocation>();
  return (
    <div className='app'>
      <Header/>
      <main className='main'>
        <Switch location={location}>
          <Route exact path="/">
            <LoginPage/>
          </Route>
          <Route exact path="/profile">
            <ProfilePage/>
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
            <AlexeyM/>
          </Route>
        </Switch>
      </main>
      <Footer/>
    </div>
  )
}