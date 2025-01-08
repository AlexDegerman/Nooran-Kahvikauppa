import { Navigate } from "react-router-dom"

// This component redirects non administrator users to access denied page 
const ProtectedRoute = ({ userId, children }) => {
  if (userId !== 1) {
    return <Navigate to="/paasy-kielletty" />
  }
  return children
}

export default ProtectedRoute