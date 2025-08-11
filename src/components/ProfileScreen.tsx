"use client"

import type React from "react"
import { useState } from "react"
import Header from "./shared/Header"
import { useAuth } from "../contexts/AuthContext"
import { useData } from "../contexts/DataContext"
import { useSearchParams } from "react-router-dom"
import { PencilIcon, EyeIcon, EyeSlashIcon, XMarkIcon, StarIcon } from "@heroicons/react/24/outline"
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid"

const ProfileScreen = () => {
  const { user, updateProfile } = useAuth()
  const { courts, addReview, getUserBookings } = useData()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "details")
  const [isEditing, setIsEditing] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  })
  const [submittingReview, setSubmittingReview] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    oldPassword: "",
    newPassword: "",
  })

  const bookings = getUserBookings(user?.id || "")

  const [bookingFilter, setBookingFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    if (bookingFilter === "all") return true
    if (bookingFilter === "confirmed") return booking.status === "Confirmed"
    if (bookingFilter === "cancelled") return booking.status === "Cancelled"
    return true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateProfile({
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      email: editForm.email,
      phone: editForm.phone,
    })
    setIsEditing(false)
  }

  const handleReset = () => {
    setEditForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      oldPassword: "",
      newPassword: "",
    })
    setIsEditing(false)
  }

  const handleCancelBooking = (bookingId: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      // Handle booking cancellation
      console.log("Cancelling booking:", bookingId)
    }
  }

  const handleWriteReview = (booking: any) => {
    setSelectedBooking(booking)
    setShowReviewModal(true)
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !selectedBooking) return

    setSubmittingReview(true)

    try {
      // Find the venue
      const venue = courts.find((c) => c.name === selectedBooking.venue)
      if (venue) {
        await addReview({
          venueId: venue.id,
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
      }

      setShowReviewModal(false)
      setSelectedBooking(null)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
          <button
            onClick={() => {
              setShowReviewModal(false)
              setSelectedBooking(null)
              setReviewForm({ rating: 5, comment: "" })
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {selectedBooking && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">{selectedBooking.venue}</h4>
            <p className="text-sm text-gray-600">
              {selectedBooking.date} • {selectedBooking.time}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
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
              onClick={() => {
                setShowReviewModal(false)
                setSelectedBooking(null)
                setReviewForm({ rating: 5, comment: "" })
              }}
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
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Sidebar */}
            <div className="lg:w-1/4 bg-gray-50 p-6 border-r border-gray-200">
              <div className="text-center mb-6">
                <div className="relative mx-auto w-20 h-20 mb-4">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-xl">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-sm text-gray-600">{user?.phone}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition duration-200 ${
                    activeTab === "details" ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition duration-200 ${
                    activeTab === "bookings" ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  My Bookings ({bookings.length})
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 p-6">
              {activeTab === "details" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            name="firstName"
                            type="text"
                            value={editForm.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            name="lastName"
                            type="text"
                            value={editForm.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          name="phone"
                          type="tel"
                          value={editForm.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                        <div className="relative">
                          <input
                            name="oldPassword"
                            type={showOldPassword ? "text" : "password"}
                            value={editForm.oldPassword}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showOldPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={editForm.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={handleReset}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <p className="text-gray-900 text-lg">
                            {user?.firstName} {user?.lastName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <p className="text-gray-900 text-lg">{user?.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <p className="text-gray-900 text-lg">{user?.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "bookings" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                    <div className="flex items-center space-x-4">
                      <select
                        value={bookingFilter}
                        onChange={(e) => setBookingFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="all">All Bookings</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <span className="text-2xl">
                                  {booking.sport === "Badminton" ? "🏸" : booking.sport === "Football" ? "⚽" : "🏃"}
                                </span>
                                <div>
                                  <h3 className="font-semibold text-gray-900 text-lg">{booking.venue}</h3>
                                  <span className="text-emerald-600 font-medium">{booking.sport}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center space-x-2">
                                  <CalendarDaysIcon className="h-4 w-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span>🕐</span>
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPinIcon className="h-4 w-4" />
                                  <span>{booking.location}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                                  >
                                    {booking.status}
                                  </span>
                                  <span className="text-lg font-semibold text-gray-900">₹{booking.amount}</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                  {booking.canCancel && booking.status === "Confirmed" && (
                                    <button
                                      onClick={() => handleCancelBooking(booking.id)}
                                      className="text-red-600 hover:text-red-700 text-sm font-medium border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50 transition duration-200"
                                    >
                                      Cancel Booking
                                    </button>
                                  )}
                                  {booking.status === "Confirmed" && (
                                    <button
                                      onClick={() => handleWriteReview(booking)}
                                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium border border-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-50 transition duration-200"
                                    >
                                      Write Review
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {!booking.canCancel && booking.status === "Confirmed" && (
                            <p className="text-xs text-gray-500 mt-3 italic">
                              Cancellation not available for past bookings
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No bookings found</p>
                        <p className="text-gray-400 mb-6">
                          {bookingFilter === "all"
                            ? "You haven't made any bookings yet"
                            : `No ${bookingFilter} bookings found`}
                        </p>
                        <button
                          onClick={() => setBookingFilter("all")}
                          className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          {bookingFilter !== "all" ? "View all bookings" : "Browse venues to make your first booking"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && <ReviewModal />}
    </div>
  )
}

export default ProfileScreen
