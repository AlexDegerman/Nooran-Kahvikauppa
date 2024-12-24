import axios from "axios"

const baseUrl = import.meta.env.VITE_API_BASE_URL

const getAllProducts = () => {
  return axios.get(`${baseUrl}` + '/api/tuotteet')
}

const getProductsByMainCategory = (mainCategoryId) => {
  return axios.get(`${baseUrl}` + '/api/tuotteet/paakategoria/' + mainCategoryId)
}

const getProductById = (productId) => {
  return axios.get(`${baseUrl}`+ '/api/tuotteet/' + productId)
}

const getAllOsastot = () => {
  return axios.get(`${baseUrl}/api/osastot`)
}

const getAllToimittajat = () => {
  return axios.get(`${baseUrl}/api/toimittajat`)
}

const getAllValmistajat = () => {
  return axios.get(`${baseUrl}/api/valmistajat`)
}

const addProduct = (product) => {
  return axios.post(`${baseUrl}/api/tuotteet`, product)
}

const editProduct = (product, productId) => {
  return axios.put(`${baseUrl}/api/tuotteet/` + productId, product)
}

export default {getProductsByMainCategory, getProductById, getAllOsastot, getAllToimittajat, getAllValmistajat, addProduct, editProduct, getAllProducts}