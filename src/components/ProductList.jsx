import '../styles/ProductList.css'
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import { Circle, ShoppingCart, Star, StarHalf } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation()
  const { category } = location.state || {}

  const kahvilaitteet = [
    {
      imagePath: product1,
      cost: 19.99,
      name: "Kahvilaite 1",
      availability: "In Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product2,
      cost: 29.99,
      name: "Kahvilaite 2",
      availability: "Out of Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product3,
      cost: 9.99,
      name: "Kahvilaite 3",
      availability: "In Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product4,
      cost: 49.99,
      name: "Kahvilaite 4",
      availability: "Limited Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product5,
      cost: 15.99,
      name: "Kahvilaite 5",
      availability: "In Stock",
      deliveryDate: "1-2 työpäivää",
    }
  ]
  const kulutuslaitteet = [
    {
      imagePath: product1,
      cost: 19.99,
      name: "Kulutuslaite 1",
      availability: "In Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product2,
      cost: 29.99,
      name: "Kulutuslaite 2",
      availability: "Out of Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product3,
      cost: 9.99,
      name: "Kulutuslaite 3",
      availability: "In Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product4,
      cost: 49.99,
      name: "Kulutuslaite 4",
      availability: "Limited Stock",
      deliveryDate: "1-2 työpäivää",
    },
    {
      imagePath: product5,
      cost: 15.99,
      name: "Kulutuslaite 5",
      availability: "In Stock",
      deliveryDate: "1-2 työpäivää",
    }
  ]

    return (
      <div className="main-content"> 
        <h1>{category}</h1>
        <ul className="product-list">
          {(category === 'Kulutuslaitteet' ? kulutuslaitteet : kahvilaitteet).map((product, index) => (
            <div key={index} className="product-card">
              <img className="product-card-image" src={product.imagePath} alt={product.name}/>
              <ul className="product-details">
                <li className="product-card-detail-value">
                    <span className="product-card-price">${product.cost}</span><ShoppingCart className="shopping-cart"/>
                </li>
                <li className="product-card-detail-value">
                  {product.name}
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