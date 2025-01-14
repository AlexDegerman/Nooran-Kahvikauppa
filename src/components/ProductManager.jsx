import { useEffect, useState } from 'react'
import '../styles/DataManager.css'
import { useDatabase } from '../hooks/useDatabase'
import CSService from '../services/CSService'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAlertMessages } from '../hooks/useAlertMessages'
// This component displays a product control panel for the administrator
const ProductManager = ({ token }) => {
  const { tuotteet, valmistajat, toimittajat, loading, refreshData } = useDatabase()
  const [showNewProductForm, setShowNewProductForm] = useState(false)
  const [showEditProductForm, setShowEditProductForm] = useState(false)
  const [selectedProductToEditId, setSelectedProductToEditId] = useState('')
  const [selectedProductToDeleteId, setSelectedProductToDeleteId] = useState('')
  const {showSuccess, showError, showInfo, showWarning} = useAlertMessages()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    nimi: "",
    kuvaus: "",
    hinta: "",
    tuotekuvalinkki: "",
    osasto_id: "",
    valmistaja_id: "",
    toimittaja_id: ""
  })
  const [productForEdit, setProductForEdit] = useState({
    nimi: "",
    kuvaus: "",
    hinta: "",
    tuotekuvalinkki: "",
    osasto_id: "",
    valmistaja_id: "",
    toimittaja_id: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }))
  }
  const handleEditChange = (event) => {
    const { name, value } = event.target
    setProductForEdit(prevProduct => ({
      ...prevProduct,
      [name]: value
    }))
  }
  // Validate product image link and price
  const handleBlur = (event) => {
    const { name, value } = event.target
    if (name === "tuotekuvalinkki" && value !== '') {
      if (!/\.(jpeg|jpg|png)$/i.test(value) || !/^https?:\/\/.+$/i.test(value)) {
        showInfo("Anna kelvollinen kuvalinkki, jonka pääte on .jpeg, .jpg tai .png.")
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: ''
        }))
        return
      }
    }
    if (name === "hinta" && value !== '') {
      if (!/^\d+([,.])\d{0,2}$|^\d+$/.test(value)) {
        showInfo("Anna kelvollinen hinta (esim. 29,99 tai 29.99).")
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: ''
        }))
      }
    }
  }
  // Fetch selected product's details
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!selectedProductToEditId) return
      
      try {
        const response = await CSService.getProductById(selectedProductToEditId)
        const productData = response.data
        
        setProductForEdit({
          nimi: productData.nimi,
          kuvaus: productData.kuvaus,
          hinta: productData.hinta,
          tuotekuvalinkki: productData.tuotekuvalinkki,
          osasto_id: productData.osasto.id,
          valmistaja_id: productData.valmistaja.id,
          toimittaja_id: productData.toimittaja.id
        })
      } catch {
        showError('Error fetching product details.')
      }
    }

    fetchProductDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductToEditId])

  const handleProductToEditSelect = (event) => {
    setSelectedProductToEditId(event.target.value)
  }
  const handleProductToDeleteSelect = (event) => {
    setSelectedProductToDeleteId(event.target.value)
  }
  // Add a new product
  const addProduct = async (event) => {
    event.preventDefault()
    
    if (tuotteet.length >= 18) {
      showInfo("Ei voi lisätä enempää tuotteita. Enimmäisraja, 18, on saavutettu.")
      return
    }

    const newProduct = {
      ...product,
      hinta: product.hinta.replace(',', '.')
    }
    try {
      await CSService.addProduct(newProduct, token)
      refreshData()
      showSuccess(`Lisätty: ${product.nimi}`)
      setShowNewProductForm(false)
      setProduct({ 
        nimi: "", 
        kuvaus: "", 
        hinta: "", 
        tuotekuvalinkki: "", 
        osasto_id: "", 
        valmistaja_id: "", 
        toimittaja_id: "" 
      })
    } catch {
      showError("Error adding product.")
    }
  }
  // Edit existing manufacturer 
  const editProduct = async (event) => {
    event.preventDefault()
    try {
      const productId = Number(selectedProductToEditId)
      
      const productToUpdate = {
        nimi: productForEdit.nimi,
        kuvaus: productForEdit.kuvaus,
        hinta: productForEdit.hinta,
        tuotekuvalinkki: productForEdit.tuotekuvalinkki,
        osasto_id: Number(productForEdit.osasto_id),
        valmistaja_id: Number(productForEdit.valmistaja_id),
        toimittaja_id: Number(productForEdit.toimittaja_id)
      }
  
      await CSService.editProduct(productToUpdate, productId, token)
      refreshData()
      showSuccess('Tuote päivitetty onnistuneesti!')
      setShowEditProductForm(false)
    } catch {
      showError, ('Virhe tuotteen päivityksessä')
    }
  }
  // Delete existing manufacturer
  const deleteProduct = (event) => {
    event.preventDefault()
  
    if (!selectedProductToDeleteId) {
      showInfo('Valitse ensin poistettava tuote.')
      return
    }
    // Ask user for confirmation to delete
    showWarning('Oletko varma, että haluat poistaa tämän tuotteen?', {
      onConfirm: async () => {
        try {
          const productId = Number(selectedProductToDeleteId)
          await CSService.deleteProduct(productId, token)
          refreshData()
          showSuccess('Tuote poistettu onnistuneesti!')
        } catch {
          showError('Virhe tuotteen poistamisessa.')
        }
      },
      onCancel: () => {
        setTimeout(() => {
          showInfo('Tuotteen poistaminen peruutettu.')
        }, 100)
      }
    })
  }

  if (loading) {
    return <div className="loading">Ladataan...</div>
  }

  return (
    <div className="manager-container">
      <div className="manager-options">
        {/* Back Button */}
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft/>
          </button>
        </div>
        {/* New Product Form */}
        <h3>Lisää uusi tuote</h3>
        <button onClick={() => setShowNewProductForm(!showNewProductForm)}>
          {!showNewProductForm ? "Näytä lisäys lomake" : "Piilota lisäys lomake"}
        </button>
        {showNewProductForm && (
          
          <form onSubmit={addProduct} className="new-form">
            <label>Tuotteen nimi</label>
            <input
              name="nimi"
              value={product.nimi}
              onChange={handleChange}
              required
            />
            <label>Tuotteen kuvaus</label>
            <textarea
              name="kuvaus"
              value={product.kuvaus}
              onChange={handleChange}
              required
            />
            <label>Tuotteen hinta</label>
            <input
              name="hinta"
              value={product.hinta}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label>Tuotteen kuva linkkinä</label>
            <input
              name="tuotekuvalinkki"
              value={product.tuotekuvalinkki}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label>Valitse tuotteen osasto</label>
            <select
              name="osasto_id"
              value={product.osasto_id}
              onChange={handleChange}
              required
            >
              <option value="">Valitse osasto</option>
              <optgroup label="Kahvilaitteet">
                <option value="3">Espressolaitteet</option>
                <option value="4">Suodatinkahvi</option>
              </optgroup>
              <optgroup label="Kulutustuotteet">
                <option value="6">Suodattimet</option>
              </optgroup>
              <optgroup label="Kahvi">
                <option value="8">Espressot</option>
                <option value="9">Suodatinkahvit</option>
              </optgroup>
            </select>
            <label>Valitse tuotteen valmistaja</label>
            <select
              name="valmistaja_id"
              value={product.valmistaja_id}
              onChange={handleChange}
              required
            >
              <option value="">Valitse valmistaja</option>
              {valmistajat.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nimi}
                </option>
              ))}
            </select>
            <label>Valitse tuotteen toimittaja</label>
            <select
              name="toimittaja_id"
              value={product.toimittaja_id}
              onChange={handleChange}
              required
            >
              <option value="">Valitse toimittaja</option>
              {toimittajat.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nimi}
                </option>
              ))}
            </select>
            <button type="submit" className="form-btn">
              Lisää tuote
            </button>
          </form>
        )}
         {/* Edit Product Form */}
        <h3>Muokkaa tuotetta</h3>
        <button onClick={() => setShowEditProductForm(!showEditProductForm)}>
          {!showEditProductForm ? "Näytä muokkaus lomake" : "Piilota muokkaus lomake"}
        </button>
        {showEditProductForm && (
          <div>
            <div className="data-select-container">
            <label>Valitse muokattava tuote</label>
            <select
              value={selectedProductToEditId}
              onChange={handleProductToEditSelect}
              required
              className="data-select"
            >
              <option value="">Valitse tuote</option>
              {tuotteet.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nimi}
                </option>
              ))}
            </select>
            </div>
  
            {selectedProductToEditId && (
              <form onSubmit={editProduct} className="new-form">
                <label>Tuotteen nimi</label>
                <input
                  name="nimi"
                  value={productForEdit.nimi}
                  onChange={handleEditChange}
                  required
                />
                <label>Tuotteen kuvaus</label>
                <textarea
                  name="kuvaus"
                  value={productForEdit.kuvaus}
                  onChange={handleEditChange}
                  required
                />
                <label>Tuotteen hinta</label>
                <input
                  name="hinta"
                  value={productForEdit.hinta}
                  onChange={handleEditChange}
                  onBlur={handleBlur}
                  required
                />
                <label>Tuotteen kuva linkkinä</label>
                <input
                  name="tuotekuvalinkki"
                  value={productForEdit.tuotekuvalinkki}
                  onChange={handleEditChange}
                  onBlur={handleBlur}
                  required
                />
                <label>Valitse tuotteen osasto</label>
                <select
                  name="osasto_id"
                  value={productForEdit.osasto_id}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Valitse osasto</option>
                  <optgroup label="Kahvilaitteet">
                    <option value="3">Espressolaitteet</option>
                    <option value="4">Suodatinkahvi</option>
                  </optgroup>
                  <optgroup label="Kulutustuotteet">
                    <option value="6">Suodattimet</option>
                  </optgroup>
                  <optgroup label="Kahvi">
                    <option value="8">Espressot</option>
                    <option value="9">Suodatinkahvit</option>
                  </optgroup>
                </select>
                <label>Valitse tuotteen valmistaja</label>
                <select
                  name="valmistaja_id"
                  value={productForEdit.valmistaja_id}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Valitse valmistaja</option>
                  {valmistajat.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.nimi}
                    </option>
                  ))}
                </select>
                <label>Valitse tuotteen toimittaja</label>
                <select
                  name="toimittaja_id"
                  value={productForEdit.toimittaja_id}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Valitse toimittaja</option>
                  {toimittajat.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nimi}
                    </option>
                  ))}
                </select>
                <button type="submit" className="form-btn">
                  Muokkaa
                </button>
              </form>
            )}
          </div>
        )}
        {/* Delete Product Select */}
        <h3>Poista tuote</h3>
        <div className="data-select-container">
            <label>Valitse poistettava tuote</label>
            <select
              value={selectedProductToDeleteId}
              onChange={handleProductToDeleteSelect}
              required
              className="data-select"
            >
              <option value="">Valitse tuote</option>
              {tuotteet.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nimi}
                </option>
              ))}
            </select>
            </div>
            <button onClick={deleteProduct}>Poista</button>
      </div>
    </div>
  )
}

export default ProductManager