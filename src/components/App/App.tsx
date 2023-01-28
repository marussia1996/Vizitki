import './App.scss';
import {createBrowserRouter, createRoutesFromElements, defer, Route} from 'react-router-dom';
import {LoginPage} from "../../pages/LoginPage/LoginPage";
import {Routes} from "../../shared/routes";
import {NotFoundPage} from "../../pages/NotFoundPage/NotFoundPage";
import AuthLayout from "../Layouts/AuthLayout";
import LoginLayout from "../Layouts/LoginLayout";
import {getUserData} from "../../utils/userData";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import {MainPage} from "../../pages/MainPage/MainPage";
import {ProfilePage} from "../../pages/ProfilePage/ProfilePage";
import {DetailPage} from "../../pages/DetailPage/DetailPage";
import {MapPage} from "../../pages/MapPage/MapPage";
import AdminLayout from "../Layouts/AdminLayout";
import AdminPage from "../../pages/AdminPage/AdminPage";
import StudentsPage from "../../pages/StudentsPage/StudentsPage";
import CommentsPage from "../../pages/CommentsPage/CommentsPage";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout/>} loader={() => defer({getData: getUserData()})}>
      <Route element={<LoginLayout/>}>
        <Route path={Routes.Login} element={<LoginPage/>}/>
      </Route>
      <Route element={<ProtectedLayout/>}>
        <Route path={Routes.Home} element={<MainPage/>}/>
        <Route path={Routes.Profile} element={<ProfilePage/>}/>
        <Route path={Routes.DetailPage} element={<DetailPage/>}/>
        <Route path={Routes.Map} element={<MapPage/>}/>
      </Route>
      <Route element={<AdminLayout/>}>
        <Route path={Routes.Admin} element={<AdminPage/>}>
          <Route path={''} element={<StudentsPage/>}/>
          <Route path={Routes.AdminComments} element={<CommentsPage/>}/>
        </Route>
        <Route path={Routes.AdminHome} element={<MainPage/>}/>
      </Route>
      <Route path={'*'} element={<NotFoundPage/>}/>
    </Route>
  )
)