import React, {FC, PropsWithChildren} from 'react';
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

const BasePage: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='app'>
      <Header/>
      <main className='main'>
        {children}
      </main>
      <Footer/>
    </div>
  )
};

export default BasePage;