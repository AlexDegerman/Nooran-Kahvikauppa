import './App.css'
import Header from './components/Header'
import FrontPage from './components/FrontPage'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import AdminPage from './components/AdminPage'
import ProductPage from './components/ProductPage'
import ProductManager from './components/ProductManager'
import SupplierManager from './components/SupplierManager'
import ManufacturerManager from './components/ManufacturerManager'
import { Login } from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import AccessDenied from './components/AccessDenied'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const App = () => {
  const [currentMemberId, setCurrentMemberId] = useState()
  const [token, setToken] = useState(null)
  const [refresh, setRefresh] = useState(false)

  // Fetch current member
  useEffect(() => { 
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const memberId = decodedToken.id
      console.log(decodedToken)
      setToken(token)
      setCurrentMemberId(memberId)
    }
  },[refresh])

  return (
    <>
      <Header currentMemberId={currentMemberId} setRefresh={setRefresh} setCurrentMemberId={setCurrentMemberId}/>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/tuotelista" element={<ProductList/>}/>
        <Route path="/tuote/:index" element={<ProductPage/>}/>
        <Route path="/kirjautuminen" element={<Login setRefresh={setRefresh}/>}/>        
        <Route path="/paasy-kielletty" element={<AccessDenied/>}/>

        {/* Secured routes */}
        <Route 
          path="/rekisteroiminen" 
          element={
            <ProtectedRoute userId={currentMemberId}>
              <Register token={token}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/hallintapaneeli" 
          element={
            <ProtectedRoute userId={currentMemberId}>
              <AdminPage/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/tuotteenhallinta" 
          element={
            <ProtectedRoute userId={currentMemberId}>
              <ProductManager token={token}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/toimittajanhallinta" 
          element={
            <ProtectedRoute userId={currentMemberId}>
              <SupplierManager token={token}/>
            </ProtectedRoute> 
          }
        />
        <Route 
          path="/valmistajanhallinta" 
          element={
            <ProtectedRoute userId={currentMemberId}>
              <ManufacturerManager token={token}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
