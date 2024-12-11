import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  const navigate = useNavigate()

  const handleClick = (category) => {
    navigate('/tuotelista', { state: { category } })
  }

  return (
    <header>
      <Link to="/"className="header-title"><h2>Nooran Kahvikauppa</h2></Link>
      <nav className="header-nav-container">
        <NavLink to="/" className="header-nav"><p>Etusivu</p></NavLink>
        <button className="header-nav header-nav-button" 
          onClick={() => handleClick('Kahvilaitteet')}>
          Kahvilaitteet
        </button>
        <button className="header-nav header-nav-button"
          onClick={() => handleClick('Kulutuslaitteet')}>
          Kulutuslaitteet
        </button>
      </nav>
    </header>
  )
}

export default Header