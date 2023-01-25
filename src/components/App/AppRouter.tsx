import React from 'react'
import { Switch , Route, useLocation} from 'react-router'
import AdminPage from '../../pages/AdminPage/AdminPage'
import { DetailPage } from '../../pages/DetailPage/DetailPage'
import { LoginPage } from '../../pages/LoginPage/LoginPage'
import { MainPage } from '../../pages/MainPage/MainPage'
import { MapPage } from '../../pages/MapPage/MapPage'
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage'
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage'
import { TLocation } from '../../services/types/types'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'

export const AppRouter = () => {
  const location = useLocation<TLocation>();
  const userRaw = localStorage.getItem('user');
  const user = userRaw && JSON.parse(userRaw);
  console.log(userRaw);
  console.log(user);
  if(user && user.tags === 'curator'){
    return (
      <>
      <Switch location={location}>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <ProtectedRoute exact path="/students/:id">
          <DetailPage/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/map">
          <MapPage />
        </ProtectedRoute>
        <ProtectedRoute path="/admin">
          <AdminPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/cohort/:name">
          <MainPage />
        </ProtectedRoute>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
      </>
    )
  }
    return (
      <>
      <Switch location={location}>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/students/:id">
          <DetailPage/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/map">
          <MapPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/">
          <MainPage />
        </ProtectedRoute>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
      </>
    )
}
