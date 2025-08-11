import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { DataProvider } from "./contexts/DataContext"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginScreen from "./components/LoginScreen"
import SignupScreen from "./components/SignupScreen"
import OTPVerification from "./components/OTPVerification"
import Dashboard from "./components/Dashboard"
import ProfileScreen from "./components/ProfileScreen"
import CourtListing from "./components/CourtListing"
import CourtDetails from "./components/CourtDetails"
import VenueDetailsPage from "./components/VenueDetailsPage"
import VenueBookingPage from "./components/VenueBookingPage"
import BookingScreen from "./components/BookingScreen"
import PaymentScreen from "./components/PaymentScreen"
import SearchExplore from "./components/SearchExplore"
import PlayerProfiles from "./components/PlayerProfiles"

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/verify-otp" element={<OTPVerification />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courts"
                element={
                  <ProtectedRoute>
                    <CourtListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/court/:id"
                element={
                  <ProtectedRoute>
                    <CourtDetails />
                  </ProtectedRoute>
                }
              />
              {/* New separate venue details page */}
              <Route
                path="/venue/:id"
                element={
                  <ProtectedRoute>
                    <VenueDetailsPage />
                  </ProtectedRoute>
                }
              />
              {/* New separate venue booking page */}
              <Route
                path="/venue-booking/:id"
                element={
                  <ProtectedRoute>
                    <VenueBookingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking/:id"
                element={
                  <ProtectedRoute>
                    <BookingScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <SearchExplore />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/players"
                element={
                  <ProtectedRoute>
                    <PlayerProfiles />
                  </ProtectedRoute>
                }
              />

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
