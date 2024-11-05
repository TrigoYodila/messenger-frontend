import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleLogin, error } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mt-4">
            {error}
          </div>
        )}
        <form className="mt-6" onSubmit={(e)=>handleLogin(e,{email,password})}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
          >
            Connexion
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Pas encore de compte ? </span>
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Inscription
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login
