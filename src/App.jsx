import './App.css'
import Header from './components/Header'
import FrontPage from './components/FrontPage'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import AdminPage from './components/AdminPage'
import ProductPage from './components/ProductPage'
import ProductManager from './components/ProductManager'

const App = () => {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/tuotelista" element={<ProductList/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/product/:index" element={<ProductPage/>}/>
        <Route path="/productmanager" element={<ProductManager/>}/>
      </Routes>
    </>
  )
}

export default App
