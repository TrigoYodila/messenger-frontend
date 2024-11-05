/* eslint-disable react/prop-types */
import { createContext,useState,useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axios, baseURL } from '../config/axios'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e, data) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseURL}/api/messanger/users/login`,data)

      if(res.data){
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('user', JSON.stringify(res.data.user))
        setIsAuthenticated(true)
        setError(null); 
        navigate('/dashboard')
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Connexion échouée. Veuillez vérifier vos informations.') 
      setIsAuthenticated(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    setIsAuthenticated(false)
    navigate('/login')
  }

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      setIsAuthenticated(true)
    }
  },[])

  return (
    <AuthContext.Provider value={{isAuthenticated,handleLogin,handleLogout,error}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

