import { useEffect, useState } from "react"
import CSService from "../services/CSService"
import { DatabaseContext } from "../contexts/DatabaseContext"

export const DatabaseProvider = ({ children }) => {
  const [osastot, setOsastot] = useState([])
  const [valmistajat, setValmistajat] = useState([])
  const [toimittajat, setToimittajat] = useState([])
  const [tuotteet, setTuotteet] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        const [osastotRes, valmistajatRes, toimittajatRes, tuotteetRes] = await Promise.all([
          CSService.getAllOsastot(),
          CSService.getAllValmistajat(),
          CSService.getAllToimittajat(),
          CSService.getAllProducts()
        ])

        setOsastot(osastotRes.data)
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
  }, [])

  const value = {
    osastot,
    valmistajat,
    toimittajat,
    tuotteet,
    loading,
    error
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}