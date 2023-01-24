import { Route, Switch, useLocation } from 'react-router-dom';
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
import {DetailPage} from '../../pages/DetailPage/DetailPage';
import { MapPage } from '../../pages/MapPage/MapPage';
import { AppRouter } from './AppRouter';

export const App = () => {
  

  return (
      <div className='app'>
        <Header />
        <main className='main'>
          <AppRouter/>
        </main>
        <Footer />
      </div>
  )
}