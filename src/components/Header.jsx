import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  const navigate = useNavigate()
  const userId = 1

  const handleClick = (category) => {
    let categoryId = 0
  
    if (category === 'Kahvilaitteet') {
      categoryId = 1
    }
    if (category === 'Kulutuslaitteet') {
      categoryId = 2
    }
  
    navigate('/tuotelista', { state: { category, categoryId }})
  }
  

  return (
    <header>
      <Link to="/"className="header-title"><h2>Nooran Kahvikauppa</h2></Link>
      <nav className="header-nav-container">
        {/*Display Admin button to Noora*/}
      {userId === 1 ? (
      <Link to="/admin" className="header-nav-admin">
        <p>Admin</p>
      </Link>
    ) : null}
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