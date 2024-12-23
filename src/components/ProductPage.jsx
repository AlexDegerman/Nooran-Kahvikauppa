import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CSService from "../services/CSService"
import '../styles/ProductPage.css'

const ProductPage = () => {
  const { index } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  // Fetch currently viewed product
  useEffect(() => {
    const fetchProduct = async () => {
      if (index !== undefined) {
        try {
          const response = await CSService.getProductById(index)
          setProduct(response.data)
        } catch (error) {
          console.error("Error fetching product:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProduct()
  }, [index])

  // Temporary returns while product loads or product is not found
  if (loading) {
    return <div className="loading">Loading product...</div>
  }
  if (!product || Object.keys(product).length === 0) {
    return <div className="loading">Product not found</div>
  }


  return (
    <div className="product-page-container">
      <div className="product-container">
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
  );
  
  
  
  
}

export default ProductPage