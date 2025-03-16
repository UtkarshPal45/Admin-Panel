"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { ArrowLeft } from "lucide-react"
import { createAgent } from "../services/api"

const AddAgentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }))
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone number is too short"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const data ={...formData, mobile: formData.phone}
      const response = await createAgent(data)
      
      if(response.success){
        navigate("/agents")
      }
      else{
        throw new Error(response.message || "Failed to create agent");
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: error.message || "Failed to create agent",
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate("/agents")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Agents
        </button>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-xl font-semibold">Add New Agent</h1>

          {errors.form && <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600">{errors.form}</div>}

          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-sm focus:border-gray-400 focus:outline-none`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-sm focus:border-gray-400 focus:outline-none`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <PhoneInput
                  country="us"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputClass={`!w-full !rounded-md !border ${
                    errors.phone ? "!border-red-500" : "!border-gray-300"
                  } !px-3 !py-2 !text-sm focus:!border-gray-400 !outline-none`}
                  containerClass="!w-full"
                  buttonClass={`!border-0 !border-r !rounded-l-md ${
                    errors.phone ? "!border-red-500" : "!border-gray-300"
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-sm focus:border-gray-400 focus:outline-none`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-sm focus:border-gray-400 focus:outline-none`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/agents")}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`rounded-md bg-black px-4 py-2 text-sm font-medium text-white ${
                  loading ? "cursor-not-allowed opacity-50" : "hover:bg-gray-800"
                }`}
              >
                {loading ? "Creating..." : "Create Agent"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAgentPage

