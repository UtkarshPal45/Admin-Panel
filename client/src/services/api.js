import axios from "axios"

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Auth services
export const loginAdmin = async (email, password) => {
  try {
    const response = await api.post("/admin/login", { email, password })
    // console.log(response.data)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during login" }
  }
}

// Agent services
export const getAgents = async () => {
  try {
    const response = await api.get("/agents")
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch agents" }
  }
}

export const getAgentById = async (id) => {
  try {
    const response = await api.get(`/agents/${id}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch agent details" }
  }
}

export const createAgent = async (agentData) => {
  try {
    const response = await api.post("/agents/add", agentData)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Failed to create agent" }
  }
}

// Task services
export const getAgentTasks = async (agentId) => {
  try {
    const response = await api.get(`/tasks/${agentId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch agent tasks" }
  }
}

// Upload services
export const uploadList = async (file) => {

  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await api.post("tasks/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Failed to upload file" }
  }
}

export default api

