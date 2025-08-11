"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "./shared/Header"
import { Link, useSearchParams } from "react-router-dom"
import { MapPinIcon, StarIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useData } from "../contexts/DataContext"

const CourtListing = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { courts, searchCourts } = useData()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState({
    sport: searchParams.get("sport") || "All Sports",
    priceRange: "",
    rating: "",
    venueType: "All",
    location: "",
  })

  const [filteredCourts, setFilteredCourts] = useState(courts)
  const courtsPerPage = 6
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    const results = searchCourts(searchQuery, filters)
    const sortedResults = sortCourts(results, sortBy)
    setFilteredCourts(sortedResults)
    setCurrentPage(1)
  }, [searchQuery, filters, sortBy, searchCourts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const newSearchParams = new URLSearchParams(searchParams)
    if (searchQuery) {
      newSearchParams.set("search", searchQuery)
    } else {
      newSearchParams.delete("search")
    }
    setSearchParams(newSearchParams)
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  const sortCourts = (courts: any[], sortOption: string) => {
    const sorted = [...courts]

    switch (sortOption) {
      case "price-low-high":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high-low":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating-high-low":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "rating-low-high":
        return sorted.sort((a, b) => a.rating - b.rating)
      case "name-a-z":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "name-z-a":
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case "distance":
        // For now, sort by location name as a proxy for distance
        return sorted.sort((a, b) => a.location.localeCompare(b.location))
      case "relevance":
      default:
        // Sort by rating and then by reviews for relevance
        return sorted.sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating
          }
          return b.reviews - a.reviews
        })
    }
  }

  const clearFilters = () => {
    setFilters({
      sport: "All Sports",
      priceRange: "",
      rating: "",
      venueType: "All",
      location: "",
    })
    setSearchQuery("")
    setSortBy("relevance")
    setSearchParams({})
  }

  // Pagination
  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage)
  const startIndex = (currentPage - 1) * courtsPerPage
  const endIndex = startIndex + courtsPerPage
  const currentCourts = filteredCourts.slice(startIndex, endIndex)

  const CourtCard = ({ court, className = "" }: { court: any; className?: string }) => (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 ${className}`}
    >
      <img src={court.image || "/placeholder.svg"} alt={court.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{court.name}</h3>
        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{court.location}</span>
        </div>
        <div className="flex items-center space-x-1 mb-3">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">
            {court.rating} ({court.reviews})
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {court.amenities.map((amenity: string, index: number) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-xs font-medium ${
                amenity === "Top Rated"
                  ? "bg-yellow-100 text-yellow-800"
                  : amenity === "Premium"
                    ? "bg-purple-100 text-purple-800"
                    : amenity === "Budget"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
              }`}
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">₹{court.price}/hour</span>
          <Link
            to={`/venue/${court.id}`}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-200 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )

  const FilterSection = ({ className = "" }: { className?: string }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sport Type</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            value={filters.sport}
            onChange={(e) => handleFilterChange("sport", e.target.value)}
          >
            <option>All Sports</option>
            <option>Badminton</option>
            <option>Football</option>
            <option>Cricket</option>
            <option>Swimming</option>
            <option>Tennis</option>
            <option>Table Tennis</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            value={filters.venueType}
            onChange={(e) => handleFilterChange("venueType", e.target.value)}
          >
            <option>All</option>
            <option>Indoor</option>
            <option>Outdoor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per hour)</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="0-200">₹0 - ₹200</option>
            <option value="200-500">₹200 - ₹500</option>
            <option value="500-800">₹500 - ₹800</option>
            <option value="800-1000">₹800+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            <option value="">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )

  const Pagination = () => {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
      const pages = []
      const maxVisible = 5

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i)
          }
          pages.push("...")
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 2) {
          pages.push(1)
          pages.push("...")
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push("...")
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push("...")
          pages.push(totalPages)
        }
      }

      return pages
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
            className={`px-3 py-2 rounded-lg transition duration-200 ${
              currentPage === page
                ? "bg-emerald-600 text-white"
                : page === "..."
                  ? "text-gray-400 cursor-default"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="bg-white p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900 mb-2">Sports Venues in Ahmedabad</h1>
          <p className="text-sm text-gray-600 mb-4">Discover and Book Nearby Venues</p>

          <form onSubmit={handleSearch} className="flex items-center space-x-3 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
          </form>

          {showMobileFilters && (
            <div className="mb-4">
              <FilterSection />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating-high-low">Rating: High to Low</option>
                  <option value="rating-low-high">Rating: Low to High</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filteredCourts.length} venues found</span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {currentCourts.length > 0 ? (
            currentCourts.map((court) => <CourtCard key={court.id} court={court} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No venues found matching your criteria</p>
              <button onClick={clearFilters} className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
                Clear filters to see all venues
              </button>
            </div>
          )}
          <Pagination />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sports Venues in Ahmedabad</h1>
            <p className="text-gray-600 mb-6">Discover and Book Nearby Venues</p>

            <form onSubmit={handleSearch} className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by venue name, sport, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <FilterSection className="w-1/4" />

            {/* Courts Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredCourts.length)} of {filteredCourts.length} venues
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating-high-low">Rating: High to Low</option>
                  <option value="rating-low-high">Rating: Low to High</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                  <option value="distance">Distance</option>
                </select>
              </div>

              {currentCourts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {currentCourts.map((court) => (
                    <CourtCard key={court.id} court={court} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-xl mb-4">No venues found matching your criteria</p>
                  <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                  <button
                    onClick={clearFilters}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourtListing
