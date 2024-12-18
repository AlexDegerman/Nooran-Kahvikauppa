import '../styles/ProductList.css'
import { Circle, ShoppingCart, Star, StarHalf } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CSService from '../services/CSService'

const ProductList = () => {
  const location = useLocation()
  const { category, categoryId } = location.state || {}
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setProducts([])
    const loadProducts = () => {
      CSService.getProductsByMainCategory(categoryId)
        .then(response => {
          setProducts(response.data)
          setLoading(false)
        })
    }
    loadProducts()
  }, [categoryId, category]) 

  if (loading) {
    return <div className="loading">Loading products...</div>
  }

    return (
      <div className="main-content"> 
        <h1>{category}</h1>
        <ul className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img className="product-card-image" src={product.tuotekuvalinkki} alt={product.nimi}/>
              <ul className="product-details">
                <li className="product-card-detail-value">
                    <span className="product-card-price">${product.hinta}</span><ShoppingCart className="shopping-cart"/>
                </li>
                <li className="product-card-detail-value">
                  {product.nimi}
                </li>
                <li className="product-card-detail-value">
                <Circle size="10px" className="product-card-circle" /> {product.deliveryDate}
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