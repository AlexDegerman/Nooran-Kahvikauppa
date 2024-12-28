import { useEffect, useState } from 'react'
import { useDatabase } from '../hooks/useDatabase'
import CSService from '../services/CSService'

const ManufacturerManager = () => {
  const { valmistajat, loading, refreshData } = useDatabase()
  const [showNewManufacturerForm, setShowNewManufacturerForm] = useState(false)
  const [showEditManufacturerForm, setShowEditManufacturerForm] = useState(false)
  const [selectedManufacturerToEditId, setSelectedManufacturerToEditId] = useState('')
  const [selectedManufacturerToDeleteId, setSelectedManufacturerToDeleteId] = useState('')
  const [manufacturer, setManufacturer] = useState({
    nimi: "",
    url: ""
  })
  const [manufacturerForEdit, setManufacturerForEdit] = useState({
    nimi: "",
    url: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setManufacturer(prevManufacturer => ({
      ...prevManufacturer,
      [name]: value
    }))
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setManufacturerForEdit(prevManufacturer => ({
      ...prevManufacturer,
      [name]: value
    }))
  }
  
  const handleBlur = (event) => {
    const { name, value } = event.target
    if (name === "url" && value !== '') {
      const isValidUrl = value.match(/^(https?:\/\/)?(www\.)[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i)
      if (!isValidUrl) {
        alert("Virhe: Anna kelvollinen URL-osoite (esimerkiksi: www.example.com).")
        setManufacturer(prevManufacturer => ({
          ...prevManufacturer,
          [name]: ''
        }))
      }
    } 
  }

  // Fetch selected manufacturer's details
  useEffect(() => {
    const fetchManufacturerDetails = async () => {
      if (!selectedManufacturerToEditId) return
      
      try {
        const response = await CSService.getManufacturerById(selectedManufacturerToEditId)
        const manufacturerData = response.data
        
        setManufacturerForEdit({
          nimi: manufacturerData.nimi,
          url: manufacturerData.url
        })
      } catch (error) {
        console.error('Error fetching manufacturer details:', error)
      }
    }

    fetchManufacturerDetails()
  }, [selectedManufacturerToEditId])

  const handleManufacturerToEditSelect = (event) => {
    setSelectedManufacturerToEditId(event.target.value)
  }
  const handleManufacturerToDeleteSelect = (event) => {
    setSelectedManufacturerToDeleteId(event.target.value)
  }
  
  const addManufacturer = async (event) => {
    event.preventDefault()

    try {
      await CSService.addManufacturer(manufacturer)
      refreshData()
      alert(`Lisätty: ${manufacturer.nimi}`)
      setShowNewManufacturerForm(false)
      setManufacturer({ 
        nimi: "",
        url: ""
      })
    } catch (error) {
      console.error("Error adding manufacturer:", error)
    }
  }

  const editManufacturer = async (event) => {
    event.preventDefault()
    try {
      const manufacturerId = Number(selectedManufacturerToEditId)
      
      const manufacturerToUpdate = {
        nimi: manufacturerForEdit.nimi,
        url: manufacturerForEdit.url,
        urlnEmail: manufacturerForEdit.urlnEmail
      }
      await CSService.editManufacturer(manufacturerToUpdate, manufacturerId)
      refreshData()
      alert('Valmistaja päivitetty onnistuneesti!')
      setShowEditManufacturerForm(false)
    } catch (error) {
      console.error('Error updating manufacturer:', error)
      alert('Virhe tuotteen päivityksessä')
    }
  }

  const deleteManufacturer = async (event) => {
    event.preventDefault()
    try {
      if (!selectedManufacturerToDeleteId) {
        alert('Valitse ensin poistettava valmistaja.')
        return
      }
      const confirmDelete = window.confirm('Oletko varma, että haluat poistaa tämän valmistajan?')
      if (!confirmDelete) {
        return
      }
      const manufacturerId = Number(selectedManufacturerToDeleteId)
      await CSService.deleteManufacturer(manufacturerId)
      refreshData()
      alert('Valmistaja poistettu onnistuneesti!')
    } catch (error) {
      console.error('Error deleting manufacturer:', error)
      alert('Virhe valmistajan poistamisessa')
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="manager-container">
      <div className="manager-options">
        <h3>Lisää uusi valmistaja</h3>
        <button onClick={() => setShowNewManufacturerForm(!showNewManufacturerForm)}>
          {!showNewManufacturerForm ? "Näytä lisäys lomake" : "Piilota lisäys lomake"}
        </button>
        {showNewManufacturerForm && (
          <form onSubmit={addManufacturer} className="new-form">
            <label>Valmistajan nimi</label>
            <input
              name="nimi"
              value={manufacturer.nimi}
              onChange={handleChange}
              required
            />
            <label>Valmistajan kotisivu</label>
            <input
              name="url"
              value={manufacturer.url}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <button type="submit" className="form-btn">
              Lisää valmistaja
            </button>
          </form>
        )}
  
        <h3>Muokkaa valmistajaa</h3>
        <button onClick={() => setShowEditManufacturerForm(!showEditManufacturerForm)}>
          {!showEditManufacturerForm ? "Näytä muokkaus lomake" : "Piilota muokkaus lomake"}
        </button>
        {showEditManufacturerForm && (
          <div>
            <div className="data-select-container">
            <label>Valitse muokattava valmistaja</label>
            <select
              value={selectedManufacturerToEditId}
              onChange={handleManufacturerToEditSelect}
              required
              className="data-select"
            >
              <option value="">Valitse valmistaja</option>
              {valmistajat.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nimi}
                </option>
              ))}
            </select>
            </div>
  
            {selectedManufacturerToEditId && (
              <form onSubmit={editManufacturer} className="new-form">
                <label>Valmistajan nimi</label>
                <input
                  name="nimi"
                  value={manufacturerForEdit.nimi}
                  onChange={handleEditChange}
                  required
                />
                <label>Valmistajan kotisivu</label>
                <textarea
                  name="url"
                  value={manufacturerForEdit.url}
                  onChange={handleEditChange}
                  onBlur={handleBlur}
                  required
                />
                <button type="submit" className="form-btn">
                  Muokkaa
                </button>
              </form>
            )}
          </div>
        )}
        <h3>Poista valmistaja</h3>
        <div className="Manufacturer-select-container">
            <label>Valitse poistettava valmistaja</label>
            <select
              value={selectedManufacturerToDeleteId}
              onChange={handleManufacturerToDeleteSelect}
              required
              className="data-select"
            >
              <option value="">Valitse valmistaja</option>
              {valmistajat.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nimi}
                </option>
              ))}
            </select>
            </div>
            <button onClick={deleteManufacturer}>Poista</button>
      </div>
    </div>
  )
}

export default ManufacturerManager