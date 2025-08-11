import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import OTPVerification from './components/OTPVerification';
import Dashboard from './components/Dashboard';
import ProfileScreen from './components/ProfileScreen';
import CourtListing from './components/CourtListing';
import CourtDetails from './components/CourtDetails';
import BookingScreen from './components/BookingScreen';
import PaymentScreen from './components/PaymentScreen';
import SearchExplore from './components/SearchExplore';
import PlayerProfiles from './components/PlayerProfiles';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/courts" element={<CourtListing />} />
            <Route path="/court/:id" element={<CourtDetails />} />
            <Route path="/booking/:id" element={<BookingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/search" element={<SearchExplore />} />
            <Route path="/players" element={<PlayerProfiles />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;