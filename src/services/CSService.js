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
const addProduct = (product, token) => {
  return axios.post(`${baseUrl}/api/tuotteet`, product, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const editProduct = (product, productId, token) => {
  return axios.put(`${baseUrl}/api/tuotteet/` + productId, product, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteProduct = (productId, token) => {
  return axios.delete(`${baseUrl}/api/tuotteet/` + productId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getAllSuppliers = () => {
  return axios.get(`${baseUrl}/api/toimittajat`)
}

const addSupplier = (supplier, token) => {
  return axios.post(`${baseUrl}/api/toimittajat`, supplier, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getSupplierById = (supplierId) => {
  return axios.get(`${baseUrl}`+ '/api/toimittajat/' + supplierId)
}

const editSupplier = (supplier, supplierId, token) => {
  return axios.put(`${baseUrl}/api/toimittajat/` + supplierId, supplier, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteSupplier = (supplierId, token) => {
  return axios.delete(`${baseUrl}/api/toimittajat/` + supplierId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
const getAllManufacturers = () => {
  return axios.get(`${baseUrl}/api/valmistajat`)
}
const addManufacturer = (manufacturer, token) => {
  return axios.post(`${baseUrl}/api/valmistajat`, manufacturer, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getManufacturerById = (manufacturerId) => {
  return axios.get(`${baseUrl}`+ '/api/valmistajat/' + manufacturerId)
}

const editManufacturer = (manufacturer, manufacturerId, token) => {
  return axios.put(`${baseUrl}/api/valmistajat/` + manufacturerId, manufacturer, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteManufacturer = (manufacturerId, token) => {
  return axios.delete(`${baseUrl}/api/valmistajat/` + manufacturerId, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const registerMember = (nickname, email, password, token) => {
  return axios.post(`${baseUrl}/api/auth/rekisteroi`, nickname, email, password, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const Login = (nickname, password) => {
  return axios.post(`${baseUrl}/api/auth/kirjaudu`, nickname, password)
}

export default {getProductsByMainCategory, getProductById, getAllSuppliers, addProduct, editProduct, getAllProducts, deleteProduct, addSupplier, editSupplier, deleteSupplier, getSupplierById, getAllManufacturers, addManufacturer, getManufacturerById, editManufacturer, deleteManufacturer, registerMember, Login}