import React, { FC } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { TLocation } from '../../services/types/types';
import './App.scss';
import {  Header  } from '../Header/Header';
import {UserCard} from '../UserCard/UserCard';
import {SwitchInfo} from '../Switch/Switch'
import DetailCard from '../DetailCard/DetailCard';

export const App: FC = () => {
  const location = useLocation<TLocation>();
  return (
    <div className='app'>
      <Switch location={location}>
        <Route exact path="/maria">
          <h1>Привет, Мария</h1>
        </Route>
        <Route exact path="/vadim">
          <DetailCard theme='default' heading='увлечения' text='Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloremque porro perspiciatis error eveniet voluptates nesciunt, officia molestiae ducimus non sequi commodi adipisci iusto architecto ea vitae quidem rem aliquam?' />
        </Route>
        <Route exact path="/vladislav">
          <h1>Привет, Владислав</h1>
        </Route>
        <Route exact path="/evgeniy">
          <h1>Привет, Евгений</h1>
        </Route>
        <Route exact path="/evgeniya">
          <h1>Привет, Евгения</h1>
          <Header />
          <UserCard />
          <SwitchInfo />
        </Route>
      </Switch>
    </div>
  )
}