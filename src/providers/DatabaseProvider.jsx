import { useEffect, useState } from "react"
import CSService from "../services/CSService"
import { DatabaseContext } from "../contexts/DatabaseContext"

export const DatabaseProvider = ({ children }) => {
  const [valmistajat, setValmistajat] = useState([])
  const [toimittajat, setToimittajat] = useState([])
  const [tuotteet, setTuotteet] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        const [valmistajatRes, toimittajatRes, tuotteetRes] = await Promise.all([
          CSService.getAllManufacturers(),
          CSService.getAllSuppliers(),
          CSService.getAllProducts()
        ])
        setValmistajat(valmistajatRes.data)
        setToimittajat(toimittajatRes.data)
        setTuotteet(tuotteetRes.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAllData()
  }, [refresh])

  const refreshData = () => {
    setRefresh(!refresh)
  }

  const value = {
    valmistajat,
    toimittajat,
    tuotteet,
    loading,
    error,
    refreshData
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}