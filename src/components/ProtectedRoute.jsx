import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userId, children }) => {
  if (userId !== 1) {
    return <Navigate to="/paasy-kielletty" />
  }
  return children
}

export default ProtectedRoute