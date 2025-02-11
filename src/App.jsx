import './App.css'
import Header from './components/Header'
import FrontPage from './components/FrontPage'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
import { useAlertMessages } from './hooks/useAlertMessages'

const App = () => {
  const [currentMemberId, setCurrentMemberId] = useState(null)
  const [token, setToken] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { showInfo } = useAlertMessages()

  // Fetch current member
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      if (token) {
        const decodedToken = jwtDecode(token)
        setToken(token)
        setCurrentMemberId(decodedToken.id)
      } else {
        setCurrentMemberId(null)
        setToken(null)
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [refresh])

  // Logout user when token expires
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token')
      if (token) {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token')
          showInfo("Istunto on päättynyt, kirjaudutaan ulos...")
          setCurrentMemberId(null)
          setToken(null)
          navigate('/')
        }
      }
    }
    
    checkToken()
    const interval = setInterval(checkToken, 60 * 1000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  if (isLoading) {
    return null
  }

  return (
    <>{/* Header */}
      <Header currentMemberId={currentMemberId} setRefresh={setRefresh} setCurrentMemberId={setCurrentMemberId}/>
      {/* Routes */}
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