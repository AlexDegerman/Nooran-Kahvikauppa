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
const addProduct = (product) => {
  return axios.post(`${baseUrl}/api/tuotteet`, product)
}

const editProduct = (product, productId) => {
  return axios.put(`${baseUrl}/api/tuotteet/` + productId, product)
}

const deleteProduct = (productId, product) => {
  return axios.delete(`${baseUrl}/api/tuotteet/` + productId, product)
}

const getAllOsastot = () => {
  return axios.get(`${baseUrl}/api/osastot`)
}

const getAllSuppliers = () => {
  return axios.get(`${baseUrl}/api/toimittajat`)
}

const addSupplier = (supplier) => {
  return axios.post(`${baseUrl}/api/toimittajat`, supplier)
}

const getSupplierById = (productId) => {
  return axios.get(`${baseUrl}`+ '/api/toimittajat/' + productId)
}

const editSupplier = (supplier, supplierId) => {
  return axios.put(`${baseUrl}/api/toimittajat/` + supplierId, supplier)
}

const deleteSupplier = (supplierId, supplier) => {
  return axios.delete(`${baseUrl}/api/toimittajat/` + supplierId, supplier)
}
const getAllValmistajat = () => {
  return axios.get(`${baseUrl}/api/valmistajat`)
}

export default {getProductsByMainCategory, getProductById, getAllOsastot, getAllSuppliers, getAllValmistajat, addProduct, editProduct, getAllProducts, deleteProduct, addSupplier, editSupplier, deleteSupplier, getSupplierById}