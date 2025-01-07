import { useEffect, useState } from 'react'
import { useDatabase } from '../hooks/useDatabase'
import CSService from '../services/CSService'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAlertMessages } from '../hooks/useAlertMessages'

const SupplierManager = ({ token }) => {
  const { toimittajat, loading, refreshData } = useDatabase()
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false)
  const [showEditSupplierForm, setShowEditSupplierForm] = useState(false)
  const [selectedSupplierToEditId, setSelectedSupplierToEditId] = useState('')
  const [selectedSupplierToDeleteId, setSelectedSupplierToDeleteId] = useState('')
  const navigate = useNavigate()
  const {showSuccess, showError, showInfo, showWarning} = useAlertMessages()
  const [supplier, setSupplier] = useState({
    nimi: "",
    yhteyshenkilo: "",
    yhteyshenkilonEmail: ""
  })
  const [supplierForEdit, setSupplierForEdit] = useState({
    nimi: "",
    yhteyshenkilo: "",
    yhteyshenkilonEmail: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setSupplier(prevSupplier => ({
      ...prevSupplier,
      [name]: value
    }))
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setSupplierForEdit(prevSupplier => ({
      ...prevSupplier,
      [name]: value
    }))
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    if (name === "yhteyshenkilonEmail" && value !== '') {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        showInfo("Anna kelvollinen sähköpostiosoite (esimerkiksi: example@example.com).")
        setSupplier(prevSupplier => ({
          ...prevSupplier,
          [name]: ''
        }))
      }
    }
  }

  // Fetch selected supplier's details
  useEffect(() => {
    const fetchSupplierDetails = async () => {
      if (!selectedSupplierToEditId) return
      
      try {
        const response = await CSService.getSupplierById(selectedSupplierToEditId)
        const supplierData = response.data
        
        setSupplierForEdit({
          nimi: supplierData.nimi,
          yhteyshenkilo: supplierData.yhteyshenkilo,
          yhteyshenkilonEmail: supplierData.yhteyshenkilonEmail
        })
      } catch {
        showError('Error fetching supplier details:')
      }
    }

    fetchSupplierDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSupplierToEditId])

  const handleSupplierToEditSelect = (event) => {
    setSelectedSupplierToEditId(event.target.value)
  }
  const handleSupplierToDeleteSelect = (event) => {
    setSelectedSupplierToDeleteId(event.target.value)
  }
  
  const addSupplier = async (event) => {
    event.preventDefault()

    try {
      await CSService.addSupplier(supplier, token)
      refreshData()
      showSuccess(`Lisätty: ${supplier.nimi}`)
      setShowNewSupplierForm(false)
      setSupplier({ 
        nimi: "",
        yhteyshenkilo: "",
        yhteyshenkilonEmail: ""
      })
    } catch {
      showError("Error adding supplier:")
    }
  }

  const editSupplier = async (event) => {
    event.preventDefault()
    try {
      const supplierId = Number(selectedSupplierToEditId)
      
      const supplierToUpdate = {
        nimi: supplierForEdit.nimi,
        yhteyshenkilo: supplierForEdit.yhteyshenkilo,
        yhteyshenkilonEmail: supplierForEdit.yhteyshenkilonEmail
      }
      await CSService.editSupplier(supplierToUpdate, supplierId, token)
      refreshData()
      showSuccess('Toimittaja päivitetty onnistuneesti!')
      setShowEditSupplierForm(false)
    } catch {
      showError('Virhe tuotteen päivityksessä')
    }
  }

    const deleteSupplier = (event) => {
      event.preventDefault()
    
      if (!selectedSupplierToDeleteId) {
        showInfo('Valitse ensin poistettava toimittaja.')
        return
      }
    
      showWarning('Oletko varma, että haluat poistaa tämän toimittajan?', {
        onConfirm: async () => {
          try {
            const supplierId = Number(selectedSupplierToDeleteId)
            await CSService.deleteSupplier(supplierId, token)
            refreshData()
            showSuccess('Toimittaja poistettu onnistuneesti!')
          } catch {
            showError('Virhe toimittajan poistamisessa.')
          }
        },
        onCancel: () => {
          setTimeout(() => {
            showInfo('Toimittajan poistaminen peruutettu.')
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
        <h3>Lisää uusi toimittaja</h3>
        <button onClick={() => setShowNewSupplierForm(!showNewSupplierForm)}>
          {!showNewSupplierForm ? "Näytä lisäys lomake" : "Piilota lisäys lomake"}
        </button>
        {showNewSupplierForm && (
          <form onSubmit={addSupplier} className="new-form">
            <label>Toimittajan nimi</label>
            <input
              name="nimi"
              value={supplier.nimi}
              onChange={handleChange}
              required
            />
            <label>Toimittajan yhteyshenkilö</label>
            <input
              name="yhteyshenkilo"
              value={supplier.yhteyshenkilo}
              onChange={handleChange}
              required
            />
            <label>Toimittajan yhteyshenkilön sähköpostiosoite</label>
            <input
              name="yhteyshenkilonEmail"
              value={supplier.yhteyshenkilonEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <button type="submit" className="form-btn">
              Lisää toimittaja
            </button>
          </form>
        )}
  
        <h3>Muokkaa toimittajaa</h3>
        <button onClick={() => setShowEditSupplierForm(!showEditSupplierForm)}>
          {!showEditSupplierForm ? "Näytä muokkaus lomake" : "Piilota muokkaus lomake"}
        </button>
        {showEditSupplierForm && (
          <div>
            <div className="data-select-container">
            <label>Valitse muokattava toimittaja</label>
            <select
              value={selectedSupplierToEditId}
              onChange={handleSupplierToEditSelect}
              required
              className="data-select"
            >
              <option value="">Valitse toimittaja</option>
              {toimittajat.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nimi}
                </option>
              ))}
            </select>
            </div>
  
            {selectedSupplierToEditId && (
              <form onSubmit={editSupplier} className="new-form">
                <label>Toimittajan nimi</label>
                <input
                  name="nimi"
                  value={supplierForEdit.nimi}
                  onChange={handleEditChange}
                  required
                />
                <label>Toimittajan yhteyshenkilö</label>
                <textarea
                  name="yhteyshenkilo"
                  value={supplierForEdit.yhteyshenkilo}
                  onChange={handleEditChange}
                  required
                />
                <label>Toimittajan yhteyshenkilön sähköpostiosoite</label>
                <input
                  name="yhteyshenkilonEmail"
                  value={supplierForEdit.yhteyshenkilonEmail}
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
        <h3>Poista toimittaja</h3>
        <div className="Supplier-select-container">
            <label>Valitse poistettava toimittaja</label>
            <select
              value={selectedSupplierToDeleteId}
              onChange={handleSupplierToDeleteSelect}
              required
              className="data-select"
            >
              <option value="">Valitse toimittaja</option>
              {toimittajat.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nimi}
                </option>
              ))}
            </select>
            </div>
            <button onClick={deleteSupplier}>Poista</button>
      </div>
    </div>
  )
}

export default SupplierManager