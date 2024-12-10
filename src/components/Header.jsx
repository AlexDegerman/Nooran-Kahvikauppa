import { NavLink } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {

  return (
    <header>
      <h2 className="header-title">Nooran Kahvikauppa</h2>
      <nav className="header-nav-container">
        <NavLink to="/" className="header-nav"><p>Etusivu</p></NavLink>
        <p className="header-nav">Kahvilaitteet</p>
        <p className="header-nav">Kulutuslaitteet</p>
      </nav>
    </header>
  )
}

export default Header