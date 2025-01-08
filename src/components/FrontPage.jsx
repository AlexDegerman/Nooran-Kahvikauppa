import '../styles/FrontPage.css'
// This component displays the frontpage of the website
const FrontPage = () => {

  return (
    <div className="frontpage-container">
      <h1 className="frontpage-title">Tervetuloa Nooran kahvikauppaan</h1>
      <p>Myyn kahvlaitteita ja kahvitteluun liittyviä kulutustuotteita.</p>
      <p className="frontpage-contact">Ota yhteyttä <a href="">Noora Haapanen</a></p>
    </div>
  )
}

export default FrontPage