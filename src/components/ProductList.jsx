import '../styles/ProductList.css'
import { Circle, ShoppingCart, Star, StarHalf } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CSService from '../services/CSService'
import { useAlertMessages } from '../hooks/useAlertMessages'
import { useDebounce } from '../hooks/useDebounce'
import Filter from './Filter'

const ProductList = () => {
  const location = useLocation()
  const { category, categoryId } = location.state || {}
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { showError } = useAlertMessages()
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("")
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (location.pathname === '/tuotelista') {
    setProducts([])
    const loadProducts = async () => {
      try {
        let response
        
        // If there's a search term or genre selected, use search endpoint
        if (debouncedSearch || genre) {
          response = await CSService.searchProducts(debouncedSearch, genre)
        } 
        // Otherwise, load products by main category
        else {
          response = await CSService.getProductsByMainCategory(categoryId)
        }

        setProducts(response.data)
      } catch {
        showError("Error loading products.")
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, category, debouncedSearch, genre, location.pathname])

  return (
    <div className="main-content">
      {!loading && products && Object.keys(products).length > 0 && (
        <h1>{category}</h1>
      )}
      <Filter search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} />
      {loading ? (
        <div className="loading">Ladataan tuotteita...</div>
      ) : !products || Object.keys(products).length === 0 ? (
        <div className="loading">Tuotteita ei löytynyt.</div>
      ) : (
        <> 
          <ul className="product-list">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <Link className="product-card-image" to={`/tuote/${product.id}`}>
                  <img src={product.tuotekuvalinkki} alt={product.nimi} />
                </Link>
                <ul className="product-list-details">
                  <li className="product-card-detail-value">
                    <span className="product-card-price">${product.hinta}</span>
                    <ShoppingCart className="shopping-cart" />
                  </li>
                  <li className="product-card-detail-value">
                    <Link className="product-card-link" to={`/tuote/${product.id}`}>
                      {product.nimi}
                    </Link>
                  </li>
                  <li className="product-card-detail-value">
                    <Circle size={10} className="product-card-circle" /> 1-2 työpäivää
                  </li>
                  <li className="product-card-detail-value">
                    <Star size={15} className="star" />
                    <Star size={15} className="star" />
                    <Star size={15} className="star" />
                    <StarHalf size={15} className="star" />
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ProductList