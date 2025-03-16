"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { User2, Upload, LogOut } from "lucide-react"

const Navbar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Admin Dashboard
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/agents"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <User2 className="h-4 w-4" />
              Agents
            </Link>

            <Link
              to="/upload"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <Upload className="h-4 w-4" />
              Upload List
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

