import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
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