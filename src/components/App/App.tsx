import React, { FC, useEffect } from 'react';
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
import { getUsers } from '../../utils/api';
import { deleteComment, getComments, getProfiles, getUserProfile, getUserReactions, getUsers, patchUserProfile, postUser, postUserReactions, putUser, TUserProfileRaw } from '../../utils/api';

export const App = () => {
  const location = useLocation<TLocation>();
  
  useEffect(()=>{
    // console.log(getUsers());
    // console.log(postUser('maria@gm.com', 'web+11'));
    // console.log(putUser('maria@gm.com', 'web+11', 'abfccdaa23e0bd1c4448d2f3'));
    // console.log(getComments());
    //console.log(deleteComment('c824a2de0b675b0acb5a2923'));
    // console.log(getProfiles());
    // console.log(getUserProfile('abfccdaa23e0bd1c4448d2f3'));
    // console.log(patchUserProfile('abfccdaa23e0bd1c4448d2f3'));
    // console.log(getUserReactions('abfccdaa23e0bd1c4448d2f3'));
    console.log(postUserReactions('e638ad9bce6d7efd1b5b035b', "job", "occaecat"))
  })
  return (
      <div className='app'>
        <Header />
        <main className='main'>
          <Switch location={location}>
            <Route exact path="/login">
              <LoginPage />
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
            <Route path="/admin">
              <AdminPage />
            </Route>
            <ProtectedRoute exact path="/">
              <MainPage />
            </ProtectedRoute>
          </Switch>
        </main>
        <Footer />
      </div>
  )
}