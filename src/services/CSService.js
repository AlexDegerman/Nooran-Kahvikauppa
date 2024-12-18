import axios from "axios"

const baseUrl = import.meta.env.VITE_API_BASE_URL

const getProductsByMainCategory = (mainCategoryId) => {
  return axios.get(`${baseUrl}` + '/api/tuotteet/paakategoria/' + mainCategoryId)
}

export default {getProductsByMainCategory}