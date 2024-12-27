import './App.css'
import Header from './components/Header'
import FrontPage from './components/FrontPage'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import AdminPage from './components/AdminPage'
import ProductPage from './components/ProductPage'
import ProductManager from './components/ProductManager'
import SupplierManager from './components/SupplierManager'

const App = () => {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/tuotelista" element={<ProductList/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/tuote/:index" element={<ProductPage/>}/>
        <Route path="/tuotteenhallinta" element={<ProductManager/>}/>
        <Route path="/toimittajanhallinta" element={<SupplierManager/>}/>
      </Routes>
    </>
  )
}

export default App
