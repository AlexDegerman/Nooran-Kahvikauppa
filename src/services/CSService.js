import axios from "axios"

const baseUrl = import.meta.env.VITE_API_BASE_URL

const getProductsByMainCategory = (mainCategoryId) => {
  return axios.get(`${baseUrl}` + '/api/tuotteet/paakategoria/' + mainCategoryId)
}

const getProductById = (productId) => {
  return axios.get(`${baseUrl}`+ '/api/tuotteet/' + productId)
}

export default {getProductsByMainCategory, getProductById}