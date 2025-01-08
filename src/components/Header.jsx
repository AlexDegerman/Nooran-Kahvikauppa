import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../styles/Header.css'
import { useAlertMessages } from '../hooks/useAlertMessages'
// This component displays the header
const Header = ({ setCurrentMemberId, currentMemberId }) => {
  const navigate = useNavigate()
  const { showSuccess } = useAlertMessages()

  // Check if user clicks Kahvilaitteet or Kulutuslaitteet to send the proper category and categoryId in the navigation state
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
        {/*Display admin panel button to Noora*/}
      {currentMemberId === 1 ? (
      <Link to="/hallintapaneeli" className="header-nav-admin">
        <p>Hallintapaneeli</p>
      </Link>
    ) : null}
    {/* Check login state to display login or logout button */}
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