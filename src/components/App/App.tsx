import React, { FC } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AlexeyM from '../../pages/AlexeyM/AlexeyM';
import { TLocation } from '../../services/types/types';
import './App.scss';
import {  Header  } from '../Header/Header';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Footer } from '../Footer/Footer';
import DetailCard from '../DetailCard/DetailCard';
import { TThemeProfile } from '../../services/types/types';

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
          <Route exact path="/maria">
            <h1>Привет, Мария</h1>
          </Route>
          <Route exact path="/vadim">
            
            <DetailCard theme={TThemeProfile.DARING} heading='HEADING' text='here should be something text about your hobby' />
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