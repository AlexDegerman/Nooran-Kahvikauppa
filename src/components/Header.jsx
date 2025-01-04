import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../styles/Header.css'
import { useAlertMessages } from '../hooks/useAlertMessages'

const Header = ({ setCurrentMemberId, currentMemberId }) => {
  const navigate = useNavigate()
  const { showSuccess } = useAlertMessages()

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

  // Logs out user when clicking logout button
  const Logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    showSuccess("Uloskirjautuminen onnistui!")
    setCurrentMemberId(null)
  }

  return (
    <header>
      <Link to="/"className="header-title"><h2>Nooran Kahvikauppa</h2></Link>
      <nav className="header-nav-container">
        {/*Display Admin button to Noora*/}
      {currentMemberId === 1 ? (
      <Link to="/hallintapaneeli" className="header-nav-admin">
        <p>Hallintapaneeli</p>
      </Link>
    ) : null}
    {!currentMemberId ? (
              <NavLink to="/kirjautuminen" className="link">Kirjaudu Sisään</NavLink>
            ) : ( <button onClick={Logout} className="logout">Kirjaudu ulos</button>)}
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