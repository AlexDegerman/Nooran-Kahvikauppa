// ProductManager.jsx
import { useState } from 'react'
import '../styles/ProductManager.css'
import { useDatabase } from '../hooks/useDatabase'
import CSService from '../services/CSService'

const ProductManager = () => {
  const { valmistajat, toimittajat, loading } = useDatabase()
  const [showNewProductForm, setShowNewProductForm] = useState(false)
  const [product, setProduct] = useState({
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
  const handleBlur = (event) => {
    const { name, value } = event.target
    if (name === "tuotekuvalinkki" && value !== '') {
      const isValidImageLink = value.match(/\.(jpeg|jpg|png)$/i) && value.match(/^https?:\/\/.+$/)
      if (!isValidImageLink) {
        alert("Anna kelvollinen kuvalinkki, jonka pääte on .jpeg, .jpg tai .png.")
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: ''
        }))
        return
      }
    } 
    if (name === "hinta" && value !== '') {
      const isValidPrice = value.match(/^\d+([,.])\d{0,2}$|^\d+$/)
      if (!isValidPrice) {
        alert("Anna kelvollinen hinta (esim. 29,99 tai 29.99).")
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: ''
        }))
      }
    }
  }

  const addProduct = async (event) => {
    event.preventDefault()
    const newProduct = {
      ...product,
      hinta: product.hinta.replace(',', '.')
    }
    try {
      await CSService.addProduct(newProduct)
      alert(`Lisätty: ${product.nimi}`)
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
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="manager-container">
      <div className="manager-options">
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
            <label>Valitse Tuotteen Osasto</label>
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
            <label>Valitse Tuotteen Valmistaja</label>
            <select 
              name="valmistaja_id" 
              value={product.valmistaja_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Valitse valmistaja</option>
              {valmistajat.map(v => (
                <option key={v.id} value={v.id}>
                  {v.nimi}
                </option>
              ))}
            </select>
            <label>Valitse Tuotteen Toimittaja</label>
            <select 
              name="toimittaja_id" 
              value={product.toimittaja_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Valitse toimittaja</option>
              {toimittajat.map(t => (
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
        <h3>Muokkaa tuotetta</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, quam. Aperiam reiciendis, sapiente dolor nostrum numquam facere a et sit nemo commodi, laborum quisquam excepturi rem sequi dicta ducimus. Ipsum.</p>
        <h3>Poista tuote</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, quam. Aperiam reiciendis, sapiente dolor nostrum numquam facere a et sit nemo commodi, laborum quisquam excepturi rem sequi dicta ducimus. Ipsum.</p>
      </div>
    </div>
  )
}

export default ProductManager