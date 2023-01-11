import React, { FC } from 'react';
import { Route, Switch , useLocation} from 'react-router-dom';
import { TLocation } from '../../services/types/types';
import { Footer } from '../Footer/Footer';
import './App.scss';

export const App:FC = () => {
  const location = useLocation<TLocation>();
  return (
    <div className='app'>
      <Switch location={location}>
        <Route exact path="/maria">
          <h1>Привет, Мария</h1>
          <Footer/>
        </Route>
        <Route exact path="/vadim">
          <h1>Привет, Вадим</h1>
        </Route>
        <Route exact path="/vladislav">
          <h1>Привет, Владислав</h1>
        </Route>
        <Route exact path="/evgeniy">
          <h1>Привет, Евгений</h1>
        </Route>
        <Route exact path="/evgeniya">
          <h1>Привет, Евгения</h1>
        </Route>
      </Switch>
    </div>
  )
}