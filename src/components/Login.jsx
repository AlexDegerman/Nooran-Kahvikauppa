import { useState } from "react"
import CSService from '../services/CSService'
import { useNavigate } from "react-router-dom"

export const Login = ({ setRefresh }) => {
  const navigate = useNavigate()
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

  const Login = async (e) => {
    e.preventDefault()
    try {
      const res = await CSService.Login({
        kayttajatunnus: credentials.nickname,
        salasana: credentials.password,
      })
      localStorage.setItem('token', res.data.token)
      alert("Kirjautuminen onnistui!")
      setRefresh(prev => !prev)
      navigate("/")
    } catch {
      console.error("Kirjautuminen epäonnistui")
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
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}