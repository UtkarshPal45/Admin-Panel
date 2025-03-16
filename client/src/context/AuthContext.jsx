"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem("token")
    // const userData = localStorage.getItem("user")

    if (token) {
      setIsAuthenticated(true)
      // setUser(JSON.parse(userData))
    }

    setLoading(false)
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token)
    // localStorage.setItem("user", JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(null)
  }

  const logout = () => {
    localStorage.removeItem("token")
    // localStorage.removeItem("user")
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

