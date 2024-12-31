import { Link } from 'react-router-dom'
import '../styles/AdminPage.css'

const AdminPage = () => {

  return (
    <div className="admin-container">
      <div className="admin-options">
        <Link to={"/tuotteenhallinta"}>Hallitse tuotteita</Link>
        <Link to={"/toimittajanhallinta"}>Hallitse toimittajia</Link>
        <Link to={"/valmistajanhallinta"}>Hallitse valmistajia</Link>
        <Link to={"/rekisteroiminen"}>Rekisteröi VIP-asiakas</Link>
      </div>
    </div>
  )
}

export default AdminPage