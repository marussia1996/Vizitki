import './MainPage.scss';
import { NavLink } from "react-router-dom"

export const MainPage = () => {
  return (
    <div className="page">
      <NavLink to="/map">Посмотреть на карте</NavLink>
    </div>
  )
}
