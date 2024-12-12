import './App.css'
import Header from './components/Header'
import FrontPage from './components/FrontPage'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import AdminPage from './components/AdminPage'

const App = () => {


  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/tuotelista" element={<ProductList/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
      </Routes>
    </>
  )
}

export default App
