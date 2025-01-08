import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CSService from "../services/CSService"
import '../styles/ProductPage.css'
import { ArrowLeft } from 'lucide-react'
import { useAlertMessages } from "../hooks/useAlertMessages"

// This component displays a page for a specific product
const ProductPage = () => {
  const navigate = useNavigate()
  const { index } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const { showError } = useAlertMessages()

  // Fetch currently viewed product
  useEffect(() => {
    const fetchProduct = async () => {
      if (index !== undefined) {
        try {
          const response = await CSService.getProductById(index)
          setProduct(response.data)
        } catch {
          showError("Error fetching product.")
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // Temporary returns while product loads or product is not found
  if (loading) {
    return <div className="loading">Ladataan tuotetta...</div>
  }
  if (!product || Object.keys(product).length === 0) {
    return <div className="loading">Tuotetta ei löytynyt.</div>
  }


  return (
    <div className="product-page-container">
      <div className="product-container">
        {/* Back Button */}
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft/>
          </button>
        </div>
        <div className="product-title-container">
          <h1 className="product-title">{product.nimi}</h1>
          <div className="product-card-image">
            <img src={product.tuotekuvalinkki} alt="Product Image" />
          </div>
        </div>
        <div className="product-details">
          <p>Hinta: {product.hinta}€</p>
          <p>Kuvaus: {product.kuvaus}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage