"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface User {
  id: string
  fullName: string
  email: string
  userType: string
  profileImage?: string
  isEmailVerified: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: {
    userType: string
    fullName: string
    email: string
    password: string
    profileImage?: string
  }) => Promise<void>
  verifyOTP: (otp: string) => Promise<void>
  resendOTP: () => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock email service
const sendOTPEmail = async (email: string, otp: string) => {
  // In a real app, this would call your backend API to send email
  console.log(`Sending OTP ${otp} to ${email}`)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, show the OTP in console
  alert(`OTP sent to ${email}: ${otp} (Check console for demo)`)
  console.log(`Demo OTP for ${email}: ${otp}`)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pendingOTP, setPendingOTP] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("quickcourt_user")
    const savedAuth = localStorage.getItem("quickcourt_auth")

    if (savedUser && savedAuth === "true") {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(userData.isEmailVerified)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user exists in localStorage (mock database)
    const users = JSON.parse(localStorage.getItem("quickcourt_users") || "[]")
    const existingUser = users.find((u: any) => u.email === email)

    if (!existingUser) {
      throw new Error("User not found. Please sign up first.")
    }

    if (existingUser.password !== password) {
      throw new Error("Invalid password")
    }

    if (!existingUser.isEmailVerified) {
      throw new Error("Please verify your email first")
    }

    const userData: User = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      userType: existingUser.userType,
      profileImage: existingUser.profileImage,
      isEmailVerified: existingUser.isEmailVerified,
    }

    setUser(userData)
    setIsAuthenticated(true)

    // Save to localStorage
    localStorage.setItem("quickcourt_user", JSON.stringify(userData))
    localStorage.setItem("quickcourt_auth", "true")
  }

  const signup = async (userData: {
    userType: string
    fullName: string
    email: string
    password: string
    profileImage?: string
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("quickcourt_users") || "[]")
    const existingUser = users.find((u: any) => u.email === userData.email)

    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setPendingOTP(otp)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      isEmailVerified: false,
      createdAt: new Date().toISOString(),
    }

    // Save to mock database
    users.push(newUser)
    localStorage.setItem("quickcourt_users", JSON.stringify(users))

    // Set user in context (but not authenticated until email verified)
    const userForContext: User = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      userType: newUser.userType,
      profileImage: newUser.profileImage,
      isEmailVerified: false,
    }

    setUser(userForContext)

    // Send OTP email
    await sendOTPEmail(userData.email, otp)
  }

  const verifyOTP = async (otp: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!pendingOTP || otp !== pendingOTP) {
      throw new Error("Invalid OTP")
    }

    if (!user) {
      throw new Error("No user found")
    }

    // Update user verification status
    const users = JSON.parse(localStorage.getItem("quickcourt_users") || "[]")
    const userIndex = users.findIndex((u: any) => u.id === user.id)

    if (userIndex !== -1) {
      users[userIndex].isEmailVerified = true
      localStorage.setItem("quickcourt_users", JSON.stringify(users))
    }

    // Update context
    const verifiedUser = { ...user, isEmailVerified: true }
    setUser(verifiedUser)
    setIsAuthenticated(true)
    setPendingOTP(null)

    // Save to localStorage
    localStorage.setItem("quickcourt_user", JSON.stringify(verifiedUser))
    localStorage.setItem("quickcourt_auth", "true")
  }

  const resendOTP = async () => {
    if (!user?.email) {
      throw new Error("No email found")
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setPendingOTP(otp)

    // Send OTP email
    await sendOTPEmail(user.email, otp)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setPendingOTP(null)
    localStorage.removeItem("quickcourt_user")
    localStorage.removeItem("quickcourt_auth")
  }

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)

    // Update in localStorage
    localStorage.setItem("quickcourt_user", JSON.stringify(updatedUser))

    // Update in mock database
    const users = JSON.parse(localStorage.getItem("quickcourt_users") || "[]")
    const userIndex = users.findIndex((u: any) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData }
      localStorage.setItem("quickcourt_users", JSON.stringify(users))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        verifyOTP,
        resendOTP,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
