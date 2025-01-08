import { useEffect, useState } from 'react'
import { useDatabase } from '../hooks/useDatabase'
import CSService from '../services/CSService'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAlertMessages } from '../hooks/useAlertMessages'

// This component displays a manufacturer control panel for the administrator
const ManufacturerManager = ({ token }) => {
  const { valmistajat, loading, refreshData } = useDatabase()
  const [showNewManufacturerForm, setShowNewManufacturerForm] = useState(false)
  const [showEditManufacturerForm, setShowEditManufacturerForm] = useState(false)
  const [selectedManufacturerToEditId, setSelectedManufacturerToEditId] = useState('')
  const [selectedManufacturerToDeleteId, setSelectedManufacturerToDeleteId] = useState('')
  const navigate = useNavigate()
  const {showSuccess, showError, showInfo, showWarning } = useAlertMessages()
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
  
  // Validate manufacturer link
  const handleBlur = (event) => {
    const { name, value } = event.target
    if (name === "url" && value !== '') {
      if (!/^(https?:\/\/)?(www\.)[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(value)) {
        showInfo("Anna kelvollinen URL-osoite (esimerkiksi: www.example.com).")
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
      } catch {
        showError('Error fetching manufacturer details.')
      }
    }

    fetchManufacturerDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedManufacturerToEditId])

  const handleManufacturerToEditSelect = (event) => {
    setSelectedManufacturerToEditId(event.target.value)
  }
  const handleManufacturerToDeleteSelect = (event) => {
    setSelectedManufacturerToDeleteId(event.target.value)
  }
  
  // Add a new manufacturer
  const addManufacturer = async (event) => {
    event.preventDefault()

    try {
      await CSService.addManufacturer(manufacturer, token)
      refreshData()
      showSuccess(`Lisätty: ${manufacturer.nimi}`)
      setShowNewManufacturerForm(false)
      setManufacturer({ 
        nimi: "",
        url: ""
      })
    } catch {
      showError("Error adding manufacturer.")
    }
  }

  // Edit existing manufacturer 
  const editManufacturer = async (event) => {
    event.preventDefault()
    try {
      const manufacturerId = Number(selectedManufacturerToEditId)
      
      const manufacturerToUpdate = {
        nimi: manufacturerForEdit.nimi,
        url: manufacturerForEdit.url,
        urlnEmail: manufacturerForEdit.urlnEmail
      }
      await CSService.editManufacturer(manufacturerToUpdate, manufacturerId, token)
      refreshData()
      showSuccess('Valmistaja päivitetty onnistuneesti!')
      setShowEditManufacturerForm(false)
    } catch {
      showError('Virhe tuotteen päivityksessä')
    }
  }

  // Delete existing manufacturer
  const deleteManufacturer = (event) => {
    event.preventDefault()
  
    if (!selectedManufacturerToDeleteId) {
      showInfo('Valitse ensin poistettava valmistaja.')
      return
    }
    // Ask user for confirmation to delete
    showWarning('Oletko varma, että haluat poistaa tämän valmistajan?', {
      onConfirm: async () => {
        try {
          const manufacturerId = Number(selectedManufacturerToDeleteId)
          await CSService.deleteManufacturer(manufacturerId, token)
          refreshData()
          showSuccess('Valmistaja poistettu onnistuneesti!')
        } catch {
          showError('Virhe valmistajan poistamisessa.')
        }
      },
      onCancel: () => {
        setTimeout(() => {
          showInfo('Valmistajan poistaminen peruutettu.')
        }, 100)
      }
    })
  }
  
  // Conditional render
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
        {/* New Manufacturer Form */}
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
        {/* Edit Manufacturer Form */}
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
        {/* Delete Manufacturer Select */}
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