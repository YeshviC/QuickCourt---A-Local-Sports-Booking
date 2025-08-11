import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">QUICKCOURT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/courts"
              className="text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
            >
              Book
            </Link>
            <Link
              to="/search"
              className="text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
            >
              Search
            </Link>
            <Link
              to="/players"
              className="text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
            >
              Community
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courts"
                className="block px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Book
              </Link>
              <Link
                to="/search"
                className="block px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                to="/players"
                className="block px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;