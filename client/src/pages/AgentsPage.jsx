"use client"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Plus, Search } from "lucide-react"
import { getAgents } from "../services/api"

const AgentsPage = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgents()
        setAgents(data)
      } catch (error) {
        console.error("Error fetching agents:", error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])


  const navigate = useNavigate()

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.mobile.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Agents</h1>
          <Link
            to="/agents/add"
            className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Agent
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-medium">Agent Management</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-gray-400 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-500">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Mobile</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredAgents.map((agent) => (
                    <tr
                      key={agent._id}
                      className="group cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/agents/${agent._id}`)}
                    >
                      <td className="py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                      <td className="py-4 text-sm text-gray-500">{agent.email}</td>
                      <td className="py-4 text-sm text-gray-500">{agent.mobile}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            agent.status === "active" ? "bg-black text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {/* {agent.status} */}
                          active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentsPage

