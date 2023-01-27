import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {appRouter} from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from 'react-router-dom';
import {YMaps} from "react-yandex-maps";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <YMaps enterprise query={{apikey: "9d121fd4-ce9f-40f4-b85b-b5aa165d5bf2"}}>
    <RouterProvider router={appRouter}/>
  </YMaps>
);

reportWebVitals();

