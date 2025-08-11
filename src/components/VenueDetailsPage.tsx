"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useData } from "../contexts/DataContext"
import {
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

const VenueDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { courts, addReview, getVenueReviews } = useData()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  })
  const [submittingReview, setSubmittingReview] = useState(false)

  // Find the court by ID
  const court = courts.find((c) => c.id === Number.parseInt(id || "1")) || courts[0]
  const venueReviews = getVenueReviews(court.id)

  const sportsAvailable = [
    { name: "Badminton", icon: "🏸" },
    { name: "Cricket", icon: "🏏" },
    { name: "Football", icon: "⚽" },
  ]

  const amenities = [
    { name: "Parking", available: true },
    { name: "Restroom", available: true },
    { name: "Refreshment", available: true },
    { name: "CCTV Surveillance", available: true },
    { name: "Nearby Air Conditioned", available: true },
    { name: "Wifi", available: true },
    { name: "Library", available: false },
  ]

  const aboutVenue = [
    "Tournament Training Arena",
    "We have top 5 players for 1v1 extra per person",
    "Equipment available on rent",
  ]

  const images = [
    court.image,
    "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg",
    "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg",
  ]

  const handleBookVenue = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("intendedDestination", `/venue-booking/${id}`)
      navigate("/login")
      return
    }
    navigate(`/venue-booking/${id}`)
  }

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setShowReviewModal(true)
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSubmittingReview(true)

    try {
      await addReview({
        venueId: court.id,
        userId: user.id,
        userName: user.fullName,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      })

      setShowReviewModal(false)
      setReviewForm({ rating: 5, comment: "" })
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setSubmittingReview(false)
    }
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"} ${
          interactive ? "cursor-pointer hover:text-yellow-300" : ""
        }`}
        onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
      />
    ))
  }

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
          <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating for {court.name}</label>
            <div className="flex items-center space-x-1">
              {renderStars(reviewForm.rating, true, (rating) => setReviewForm((prev) => ({ ...prev, rating })))}
              <span className="ml-2 text-sm text-gray-600">
                ({reviewForm.rating} star{reviewForm.rating !== 1 ? "s" : ""})
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              value={reviewForm.comment}
              onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Share your experience with this venue..."
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submittingReview || !reviewForm.comment.trim()}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-xl font-bold">QUICKCOURT</span>
          </div>

          <div className="flex items-center space-x-6">
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">📖 Book</button>

            {isAuthenticated ? (
              <span className="text-sm text-gray-700">👤 {user?.fullName}</span>
            ) : (
              <div className="flex items-center space-x-4 text-sm">
                <button onClick={() => navigate("/login")} className="text-gray-600 hover:text-gray-900">
                  🔐 Login / Sign Up
                </button>
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
                      {court.rating} ({venueReviews.length} review{venueReviews.length !== 1 ? "s" : ""})
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
                    src={images[selectedImageIndex] || "/placeholder.svg"}
                    alt="Venue"
                    className="w-full h-full object-cover"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition duration-200"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(Math.min(images.length - 1, selectedImageIndex + 1))}
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
                  {amenities.map((amenity, index) => (
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
                  {aboutVenue.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-1">—</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Player Reviews & Ratings */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Player Reviews & Ratings</h3>
                  <button
                    onClick={handleWriteReview}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                    <span>Write Review</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {venueReviews.length > 0 ? (
                    venueReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {review.userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">{review.userName}</span>
                            <div className="flex items-center">{renderStars(review.rating)}</div>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border border-gray-200 rounded-lg">
                      <p className="text-gray-500 mb-4">No reviews yet</p>
                      <button
                        onClick={handleWriteReview}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Be the first to write a review
                      </button>
                    </div>
                  )}
                </div>

                {venueReviews.length > 5 && (
                  <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Load more reviews
                  </button>
                )}
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

      {/* Review Modal */}
      {showReviewModal && <ReviewModal />}
    </div>
  )
}

export default VenueDetailsPage
