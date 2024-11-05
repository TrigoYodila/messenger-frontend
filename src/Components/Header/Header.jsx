
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header className="bg-white border-b shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <div className="flex-shrink-0">
            <Link to="/">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Logo"
              />
            </Link>
          </div> */}

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-900 hover:text-indigo-600 transition duration-150 ease-in-out"
            >
              Dashboard
            </Link>
          </div>

          {/* User Account Dropdown */}
          <div className="flex items-center">
            {user ? (
              <div className="ml-4 relative">
                <button className="flex items-center text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring">
                  <span className="mr-2">{user.name}</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar || "/default-avatar.png"} // Remplacez par le chemin par défaut si l'avatar est nul
                    alt="User Avatar"
                  />
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-900 hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
    user: PropTypes.object,
    onLogout:PropTypes.func
};

export default Header;
