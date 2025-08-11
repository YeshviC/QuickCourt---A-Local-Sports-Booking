"use client"

import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/solid"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

const CourtDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const court = {
    id: 1,
    name: "SBR Badminton",
    location: "Satellite, Jodhpur Village",
    sport: "Badminton",
    rating: 4.5,
    reviews: 6,
    price: 200,
    operatingHours: "7:00AM - 11:00PM",
    address: "Sat Rasta, Ramji Mandir Rd, Satellite, Jodhpur Village, Ahmedabad, Gujarat",
    images: [
      "https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg",
      "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg",
      "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg",
    ],
    amenities: [
      { name: "Parking", available: true },
      { name: "Restroom", available: true },
      { name: "Refreshment", available: true },
      { name: "CCTV Surveillance", available: true },
      { name: "Nearby Air Conditioned", available: true },
      { name: "Wifi", available: true },
      { name: "Library", available: false },
    ],
    aboutVenue: [
      "Tournament Training Arena",
      "We have top 5 players for 1v1 extra per person",
      "Equipment available on rent",
    ],
    reviews: [
      {
        id: 1,
        user: "Mitchell Admin",
        rating: 5,
        date: "16 June 2024, 5:34 PM",
        comment: "Very fast, well maintained",
      },
      {
        id: 2,
        user: "Mitchell Admin",
        rating: 5,
        date: "16 June 2024, 5:34 PM",
        comment: "Very fast, well maintained",
      },
      {
        id: 3,
        user: "Mitchell Admin",
        rating: 4,
        date: "16 June 2024, 5:34 PM",
        comment: "Very fast, well maintained",
      },
      {
        id: 4,
        user: "Mitchell Admin",
        rating: 5,
        date: "16 June 2024, 5:34 PM",
        comment: "Very fast, well maintained",
      },
      {
        id: 5,
        user: "Mitchell Admin",
        rating: 5,
        date: "16 June 2024, 5:34 PM",
        comment: "Very fast, well maintained",
      },
    ],
  }

  const sportsAvailable = [
    { name: "Badminton", icon: "🏸" },
    { name: "Cricket", icon: "🏏" },
    { name: "Football", icon: "⚽" },
  ]

  const handleBookVenue = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("intendedDestination", `/booking/${id}`)
      navigate("/login")
      return
    }
    navigate(`/booking/${id}`)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/courts")}
              className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-xl font-bold">QUICKCOURT</span>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <UserIcon className="h-6 w-6 text-gray-600" />
                <span className="text-sm text-gray-700">{user?.fullName}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <span className="text-gray-400">/</span>
                <Link to="/signup" className="text-gray-600 hover:text-gray-900">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Venue Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{court.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-4 w-4 text-red-500" />
                    <span>{court.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium">
                      {court.rating} ({court.reviews})
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookVenue}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-200"
              >
                📅 Book This Venue
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div>
                <div className="relative bg-gray-200 rounded-lg overflow-hidden" style={{ height: "300px" }}>
                  <img
                    src={court.images[selectedImageIndex] || "/placeholder.svg"}
                    alt="Venue"
                    className="w-full h-full object-cover"
                  />

                  {court.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition duration-200"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(Math.min(court.images.length - 1, selectedImageIndex + 1))}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition duration-200"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <p className="text-white text-sm bg-black/50 px-3 py-1 rounded-lg">Images / Videos</p>
                  </div>
                </div>
              </div>

              {/* Sports Available */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sports Available{" "}
                  <span className="text-sm font-normal text-gray-500">[Choose what sports on which court]</span>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {sportsAvailable.map((sport, index) => (
                    <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl mb-2">{sport.icon}</div>
                      <span className="text-sm font-medium text-gray-700">{sport.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {court.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon
                        className={`h-5 w-5 ${amenity.available ? "text-green-500" : "text-gray-300"}`}
                      />
                      <span className={amenity.available ? "text-gray-700" : "text-gray-400"}>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Venue */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About Venue</h3>
                <ul className="space-y-2">
                  {court.aboutVenue.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-1">—</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Player Reviews & Ratings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Player Reviews & Ratings</h3>
                <div className="space-y-4">
                  {court.reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{review.user}</span>
                          <div className="flex items-center">{renderStars(review.rating)}</div>
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Load more reviews
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Operating Hours */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ClockIcon className="h-5 w-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Operating Hours</h4>
                </div>
                <p className="text-gray-700 font-medium">{court.operatingHours}</p>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-2 mb-2">
                  <MapPinIcon className="h-5 w-5 text-red-500 mt-0.5" />
                  <h4 className="font-semibold text-gray-900">Address</h4>
                </div>
                <p className="text-gray-700 text-sm">{court.address}</p>
              </div>

              {/* Location Map */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Location Map</h4>
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Map will be displayed here</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourtDetails
