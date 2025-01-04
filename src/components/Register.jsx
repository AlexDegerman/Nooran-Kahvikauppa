import { useState } from 'react'
import CSService from '../services/CSService'
import '../styles/Auth.css'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAlertMessages } from '../hooks/useAlertMessages'

const Register = ({ token }) => {
  const navigate = useNavigate()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const { showSuccess, showInfo, showError } = useAlertMessages()
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
    email:""  
  })
  
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

const handleBlur = (event) => {
  const { name, value } = event.target

  if (name === "nickname" && value !== '') {
    if (value.length < 3 || value.length > 50) {
      showInfo("Käyttäjätunnuksen tulee olla 3-50 merkkiä pitkä.")
      setFormData(prevData => ({
        ...prevData,
        [name]: ''
      }))
      return
    }

    if (!/^[a-zA-Z0-9_]*$/.test(value)) {
      showInfo("Käyttäjätunnus voi sisältää vain kirjaimia, numeroita ja alaviivoja.")
      setFormData(prevData => ({
        ...prevData,
        [name]: ''
      }))
      return
    }
  }

  if (name === "password" && value !== '') {
    if (!/(?=.*\d)(?=.*[A-Z]).{8,20}/.test(value)) {
      showInfo("Salasanassa on oltava vähintään yksi numero ja yksi iso kirjain, pituus 8-20 merkkiä.")
      setFormData(prevData => ({
        ...prevData,
        [name]: ''
      }))
      return
    }
  }

  if (name === "email" && value !== '') {
    if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(value)) {
      showInfo("Anna kelvollinen sähköpostiosoite (esimerkiksi: example@example.com).")
      setFormData(prevData => ({
        ...prevData,
        [name]: ''
      }))
      return
    }
    if (value.length > 100) {
      showInfo("Sähköposti voi olla enintään 100 merkkiä pitkä.")
      setFormData(prevData => ({
        ...prevData,
        [name]: ''
      }))
      return
      }
    }
  }

  const registerMember = async (event) => {
    event.preventDefault()
    try {
      await CSService.registerMember({
        kayttajatunnus: formData.nickname,
        salasana: formData.password,
        email: formData.email,
        token
      })
      showSuccess(`Käyttäjä ${formData.nickname} rekisteröity onnistuneesti`)

      setFormData({ nickname: '', email: '', password: '' })
    } catch {
      showError("Rekisteröinti epäonnistui.")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Back Button */}
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft/>
          </button>
        </div>
        <h2>Register</h2>
        <form onSubmit={registerMember}>
          <div>
            <label>Nickname:</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <div className="password-input-wrapper">
              <label>Password:</label>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="password-toggle-visibility"
              >
                {showCurrentPassword ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register