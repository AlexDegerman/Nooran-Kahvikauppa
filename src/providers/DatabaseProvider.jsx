import { useEffect, useState } from "react"
import CSService from "../services/CSService"
import { DatabaseContext } from "../contexts/DatabaseContext"

export const DatabaseProvider = ({ children }) => {
  const [osastot, setOsastot] = useState([])
  const [valmistajat, setValmistajat] = useState([])
  const [toimittajat, setToimittajat] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        const [osastotRes, valmistajatRes, toimittajatRes] = await Promise.all([
          CSService.getAllOsastot(),
          CSService.getAllValmistajat(),
          CSService.getAllToimittajat()
        ])

        setOsastot(osastotRes.data)
        setValmistajat(valmistajatRes.data)
        setToimittajat(toimittajatRes.data)
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
    loading,
    error
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}