"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Court {
  id: number
  name: string
  location: string
  sport: string
  rating: number
  reviews: number
  price: number
  image: string
  amenities: string[]
  venueType: "Indoor" | "Outdoor"
  operatingHours: string
  address: string
  description?: string
}

export interface Player {
  id: number
  name: string
  sport: string
  location: string
  rating: number
  matches: number
  image: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional"
  bio: string
}

export interface Review {
  id: string
  venueId: number
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface Booking {
  id: number
  userId: string
  venue: string
  sport: string
  date: string
  time: string
  location: string
  status: "Confirmed" | "Cancelled" | "Pending"
  canCancel: boolean
  amount: number
}

interface DataContextType {
  courts: Court[]
  players: Player[]
  reviews: Review[]
  bookings: Booking[]
  searchCourts: (query: string, filters: any) => Court[]
  searchPlayers: (query: string, filters: any) => Player[]
  addReview: (review: Omit<Review, "id">) => Promise<void>
  getVenueReviews: (venueId: number) => Review[]
  getUserBookings: (userId: string) => Booking[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const courts: Court[] = [
    {
      id: 1,
      name: "SBR Badminton",
      location: "Satellite, Jodhpur Village",
      sport: "Badminton",
      rating: 4.5,
      reviews: 6,
      price: 200,
      image: "https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg",
      amenities: ["Badminton", "Indoor", "Top Rated", "Budget"],
      venueType: "Indoor",
      operatingHours: "7:00AM - 11:00PM",
      address: "Sat Rasta, Ramji Mandir Rd, Satellite, Jodhpur Village, Ahmedabad, Gujarat",
    },
    {
      id: 2,
      name: "Elite Sports Complex",
      location: "Vaishnavdevi Cir",
      sport: "Football",
      rating: 4.3,
      reviews: 8,
      price: 500,
      image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
      amenities: ["Football", "Outdoor", "Premium"],
      venueType: "Outdoor",
      operatingHours: "6:00AM - 10:00PM",
      address: "Vaishnavdevi Circle, Ahmedabad, Gujarat",
    },
    {
      id: 3,
      name: "Premier Cricket Ground",
      location: "Vaishnavdevi Cir",
      sport: "Cricket",
      rating: 4.5,
      reviews: 12,
      price: 800,
      image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg",
      amenities: ["Cricket", "Outdoor", "Top Rated"],
      venueType: "Outdoor",
      operatingHours: "5:00AM - 9:00PM",
      address: "Vaishnavdevi Circle, Ahmedabad, Gujarat",
    },
    {
      id: 4,
      name: "Aqua Sports Center",
      location: "Vaishnavdevi Cir",
      sport: "Swimming",
      rating: 4.5,
      reviews: 6,
      price: 300,
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg",
      amenities: ["Swimming", "Indoor", "Premium"],
      venueType: "Indoor",
      operatingHours: "6:00AM - 10:00PM",
      address: "Vaishnavdevi Circle, Ahmedabad, Gujarat",
    },
    {
      id: 5,
      name: "Tennis Academy Pro",
      location: "Vaishnavdevi Cir",
      sport: "Tennis",
      rating: 4.5,
      reviews: 9,
      price: 400,
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
      amenities: ["Tennis", "Outdoor", "Top Rated"],
      venueType: "Outdoor",
      operatingHours: "6:00AM - 10:00PM",
      address: "Vaishnavdevi Circle, Ahmedabad, Gujarat",
    },
    {
      id: 6,
      name: "Table Tennis Hub",
      location: "Vaishnavdevi Cir",
      sport: "Table Tennis",
      rating: 4.5,
      reviews: 4,
      price: 150,
      image: "https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg",
      amenities: ["Table Tennis", "Indoor", "Budget"],
      venueType: "Indoor",
      operatingHours: "7:00AM - 11:00PM",
      address: "Vaishnavdevi Circle, Ahmedabad, Gujarat",
    },
  ]

  const players: Player[] = [
    {
      id: 1,
      name: "Alex Johnson",
      sport: "Badminton",
      location: "Satellite, Ahmedabad",
      rating: 4.8,
      matches: 45,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      level: "Advanced",
      bio: "Passionate badminton player with 5+ years experience. Love playing doubles!",
    },
    {
      id: 2,
      name: "Sarah Williams",
      sport: "Tennis",
      location: "Pali Road, Jodhpur",
      rating: 4.6,
      matches: 32,
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      level: "Intermediate",
      bio: "Tennis enthusiast seeking practice partners for weekend sessions.",
    },
    {
      id: 3,
      name: "Mike Chen",
      sport: "Football",
      location: "Residency Road, Jodhpur",
      rating: 4.9,
      matches: 78,
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
      level: "Professional",
      bio: "Former college football player, now looking to play recreationally.",
    },
    {
      id: 4,
      name: "Emma Davis",
      sport: "Swimming",
      location: "Circuit House, Jodhpur",
      rating: 4.7,
      matches: 28,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      level: "Advanced",
      bio: "Competitive swimmer and coach. Open to training sessions.",
    },
    {
      id: 5,
      name: "James Wilson",
      sport: "Cricket",
      location: "Vaishali, Ahmedabad",
      rating: 4.5,
      matches: 52,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      level: "Intermediate",
      bio: "Cricket lover seeking team for weekend matches.",
    },
    {
      id: 6,
      name: "Lisa Rodriguez",
      sport: "Table Tennis",
      location: "Satellite, Ahmedabad",
      rating: 4.4,
      matches: 36,
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      level: "Intermediate",
      bio: "Table tennis player looking for regular practice partners.",
    },
  ]

  // State for reviews and bookings
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      venueId: 1,
      userId: "demo-user",
      userName: "Mitchell Admin",
      rating: 5,
      comment: "Very fast, well maintained",
      date: "16 June 2024, 5:34 PM",
    },
    {
      id: "2",
      venueId: 1,
      userId: "demo-user-2",
      userName: "Sarah Johnson",
      rating: 4,
      comment: "Great facilities and friendly staff",
      date: "15 June 2024, 3:20 PM",
    },
  ])

  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      userId: "demo-user",
      venue: "SBR Badminton Court",
      sport: "Badminton",
      date: "10 June 2024",
      time: "5:00 PM - 6:00 PM",
      location: "Rajkot, Gujarat",
      status: "Confirmed",
      canCancel: false,
      amount: 1200,
    },
    {
      id: 2,
      userId: "demo-user",
      venue: "Skyline Badminton Court",
      sport: "Badminton",
      date: "18 June 2024",
      time: "5:00 PM - 6:00 PM",
      location: "Rajkot, Gujarat",
      status: "Confirmed",
      canCancel: true,
      amount: 1500,
    },
    {
      id: 3,
      userId: "demo-user",
      venue: "Elite Football Ground",
      sport: "Football",
      date: "25 June 2024",
      time: "7:00 PM - 8:00 PM",
      location: "Ahmedabad, Gujarat",
      status: "Cancelled",
      canCancel: false,
      amount: 800,
    },
  ])

  const searchCourts = (query: string, filters: any): Court[] => {
    let filtered = courts

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(
        (court) =>
          court.name.toLowerCase().includes(searchTerm) ||
          court.location.toLowerCase().includes(searchTerm) ||
          court.sport.toLowerCase().includes(searchTerm) ||
          court.amenities.some((amenity) => amenity.toLowerCase().includes(searchTerm)) ||
          court.address.toLowerCase().includes(searchTerm),
      )
    }

    // Sport filter
    if (filters.sport && filters.sport !== "All Sports") {
      filtered = filtered.filter((court) => court.sport === filters.sport)
    }

    // Venue type filter
    if (filters.venueType && filters.venueType !== "All") {
      filtered = filtered.filter((court) => court.venueType === filters.venueType)
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      if (max) {
        filtered = filtered.filter((court) => court.price >= min && court.price <= max)
      } else {
        filtered = filtered.filter((court) => court.price >= min)
      }
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter((court) => court.rating >= Number.parseFloat(filters.rating))
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (court) =>
          court.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          court.address.toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    return filtered
  }

  const searchPlayers = (query: string, filters: any): Player[] => {
    let filtered = players

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm) ||
          player.sport.toLowerCase().includes(searchTerm) ||
          player.location.toLowerCase().includes(searchTerm) ||
          player.bio.toLowerCase().includes(searchTerm),
      )
    }

    // Sport filter
    if (filters.sport && filters.sport !== "All Sports") {
      filtered = filtered.filter((player) => player.sport === filters.sport)
    }

    // Level filter
    if (filters.level && filters.level !== "All Levels") {
      filtered = filtered.filter((player) => player.level === filters.level)
    }

    // Location filter
    if (filters.location && filters.location !== "All Locations") {
      filtered = filtered.filter((player) => player.location.includes(filters.location))
    }

    return filtered
  }

  const addReview = async (review: Omit<Review, "id">): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
    }

    setReviews((prev) => [newReview, ...prev])
  }

  const getVenueReviews = (venueId: number): Review[] => {
    return reviews.filter((review) => review.venueId === venueId)
  }

  const getUserBookings = (userId: string): Booking[] => {
    return bookings.filter((booking) => booking.userId === userId)
  }

  return (
    <DataContext.Provider
      value={{
        courts,
        players,
        reviews,
        bookings,
        searchCourts,
        searchPlayers,
        addReview,
        getVenueReviews,
        getUserBookings,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
