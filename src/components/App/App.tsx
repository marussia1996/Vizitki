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


export const App = () => {
  const location = useLocation<TLocation>();
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