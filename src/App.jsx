
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import { AuthProvider } from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />}/>

        {/* route proteger */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>

    </AuthProvider>
    
  )
}

export default App
