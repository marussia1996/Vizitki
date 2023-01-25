import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {App} from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import {YMaps} from "react-yandex-maps";
import { AuthContext, AuthProvider } from './services/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    {/* <React.StrictMode> */}
      <YMaps enterprise query={{apikey: "9d121fd4-ce9f-40f4-b85b-b5aa165d5bf2"}}>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </YMaps>
    {/* </React.StrictMode> */}
  </Router>
);

reportWebVitals();

