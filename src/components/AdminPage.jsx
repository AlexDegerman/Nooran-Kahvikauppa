import { Link } from 'react-router-dom'
import '../styles/AdminPage.css'

const AdminPage = () => {

  return (
    <div className="admin-container">
      <div className="admin-options">
        <Link to={`/productmanager`}>Hallitse tuotteita</Link>
        <p>Hallitse toimittajia</p>
        <p>Hallitse valmistajia</p>
        <p>Rekisteröi VIP-asiakas</p>
      </div>
    </div>
  )
}

export default AdminPage