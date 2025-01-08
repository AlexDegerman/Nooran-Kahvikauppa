import { useState } from "react"
import CSService from '../services/CSService'
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useAlertMessages } from '../hooks/useAlertMessages'

// This component displays a login page
export const Login = ({ setRefresh }) => {
  const navigate = useNavigate()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const { showSuccess, showError } = useAlertMessages()
  const [credentials, setCredentials] = useState({
    nickname: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Log in user
  const Login = async (e) => {
    e.preventDefault()
    try {
      const res = await CSService.Login({
        kayttajatunnus: credentials.nickname,
        salasana: credentials.password,
      })
      localStorage.setItem('token', res.data.token)
      showSuccess("Kirjautuminen onnistui!")
      setRefresh(prev => !prev)
      navigate("/")
    } catch {
      showError("Kirjautuminen epäonnistui")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={Login}>
          <div>
            <label>Nickname:</label>
            <input
              type="text"
              name="nickname"
              value={credentials.nickname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="password-input-wrapper">
              <label>Password:</label>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}