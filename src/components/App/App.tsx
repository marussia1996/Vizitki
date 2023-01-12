import React, { FC } from 'react';
import { Route, Switch , useLocation} from 'react-router-dom';
import { TLocation } from '../../services/types/types';
import './App.scss';
import {Header} from '../Header/Header';
import DetailCard from '../DetailCard/DetailCard';
import { Button } from '../Button/Button';

export const App:FC = () => {
  const location = useLocation<TLocation>();
  return (
    <div className='app'>
      <Switch location={location}>
        <Route exact path="/maria">
          <h1>Привет, Мария</h1>
          <Button className='buttonLarge' onClick={()=>{console.log('send')}} disabled={false}>Войти с Яндекс ID</Button>
          <Button className='buttonSmall' onClick={()=>{console.log('send')}} disabled={true}>Выберите файл</Button>
        </Route>
        <Route exact path="/vadim">
          <DetailCard heading='Увлечения' text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ullam cum pariatur numquam impedit accusantium totam incidunt qui! Autem vel quisquam recusandae minus sit eius aperiam sequi debitis ipsum incidunt.' />
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
        </Route>
      </Switch>
    </div>
  )
}