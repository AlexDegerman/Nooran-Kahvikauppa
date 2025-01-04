import { createContext, useContext } from 'react'

// Creates alert context and hook for managing application-wide alerts
const AlertContext = createContext()

const useAlert = () => {
  const alert = useContext(AlertContext)

  return alert
}

export {AlertContext, useAlert}