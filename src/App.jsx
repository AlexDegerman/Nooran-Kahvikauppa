import './App.css'
import Header from './components/Header'
import FrontPage from './components/FrontPage'
import { Route, Routes } from 'react-router-dom'

const App = () => {


  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element= {<FrontPage/>}/>
      </Routes>
    </>
  )
}

export default App
