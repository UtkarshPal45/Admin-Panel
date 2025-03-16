"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"

// Pages
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import AgentsPage from "./pages/AgentsPage"
import AddAgentPage from "./pages/AddAgentPage"
import AgentDetailsPage from "./pages/AgentDetailsPage"
import UploadPage from "./pages/UploadPage"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <ProtectedRoute>
                <AgentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents/add"
            element={
              <ProtectedRoute>
                <AddAgentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents/:id"
            element={
              <ProtectedRoute>
                <AgentDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

