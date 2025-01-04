import '../styles/ProductList.css'
import { Circle, ShoppingCart, Star, StarHalf } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CSService from '../services/CSService'
import { useAlertMessages } from '../hooks/useAlertMessages'
const ProductList = () => {
  const location = useLocation()
  const { category, categoryId } = location.state || {}
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { showError } = useAlertMessages()

  useEffect(() => {
    setProducts([])
    const loadProducts = async () => {
      try {
        const response = await CSService.getProductsByMainCategory(categoryId)
        setProducts(response.data)
      } catch {
        showError("Error loading products.")
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, category])
  
  // Temporary returns while products load or products are not found
  if (loading) {
    return <div className="loading">Loading product...</div>
  }
  if (!products || Object.keys(products).length === 0) {
    return <div className="loading">Products not found</div>
  }

    return (
      <div className="main-content"> 
        <h1>{category}</h1>
        <ul className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <Link className="product-card-image" to={`/tuote/${product.id}`}><img src={product.tuotekuvalinkki} alt={product.nimi}/></Link>
              <ul className="product-list-details">
                <li className="product-card-detail-value">
                    <span className="product-card-price">${product.hinta}</span><ShoppingCart className="shopping-cart"/>
                </li>
                <li className="product-card-detail-value">
                <Link className="product-card-link" to={`/tuote/${product.id}`}>{product.nimi}</Link>
                </li>
                <li className="product-card-detail-value">
                <Circle size="10px" className="product-card-circle" /> 1-2 työpäivää
                </li>
                <li className="product-card-detail-value">
                  <Star size="15px" className="star"/><Star size="15px" className="star"/><Star size="15px" className="star"/><StarHalf size="15px" className="star"/>
                </li>
              </ul>
            </div>
          ))}
        </ul>
      </div>
    )
  }

export default ProductList