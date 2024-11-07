
import './index.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import { AuthProvider } from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ChatLayout from './Layouts/ChatLayout/ChatLayout'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login />}/>

        {/* route proteger */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <ChatLayout>
              <Dashboard />
            </ChatLayout>
          </ProtectedRoute>
        }/>
      </Routes>

    </AuthProvider>
    
  )
}

export default App
