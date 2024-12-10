import '../styles/Header.css'

const Header = () => {

  return (
    <header>
      <h2 className="header-title">Nooran Kahvikauppa</h2>
      <div className="header-nav-container">
        <p className="header-nav">Etusivu</p>
        <p className="header-nav">Kahvilaitteet</p>
        <p className="header-nav">Kulutuslaitteet</p>
      </div>
    </header>
  )
}

export default Header