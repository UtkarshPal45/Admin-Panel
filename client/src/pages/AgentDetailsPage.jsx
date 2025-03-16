import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { getAgentById, getAgentTasks } from "../services/api"


const AgentDetailsPage = () => {
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const agentData = await getAgentById(id);
        const tasksData = await getAgentTasks(id);
        setAgent(agentData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <Link to="/agents" className="text-blue-600 hover:text-blue-800 flex items-center">
              <FaArrowLeft className="mr-2" />
              Back to Agents
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Agent Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal information and tasks.</p>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaUser className="mr-2" /> Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{agent.name}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaEnvelope className="mr-2" /> Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{agent.email}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaPhone className="mr-2" /> Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{agent.mobile}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaCalendarAlt className="mr-2" /> Created at
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(agent.createdAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Tasks</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{tasks.length} tasks assigned to this agent.</p>
            </div>
            <div className="border-t border-gray-200">
              {tasks.length === 0 ? (
                <div className="px-4 py-5 text-center text-gray-500">No tasks assigned to this agent yet.</div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <li key={task._id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {task.status === "completed" ? (
                            <FaCheckCircle className="text-green-500 mr-3" />
                          ) : (
                            <FaTimesCircle className="text-yellow-500 mr-3" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{task.firstName}</p>
                            <p className="text-sm text-gray-500">{task.phone}</p>
                            <p className="text-sm text-gray-500">{task.notes}</p>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.status === "completed" ? "Completed" : "Pending"}
                          </span>
                        </div>
                      </div>
                      {task.status === "completed" && (
                        <p className="mt-2 text-xs text-gray-500">
                          Completed on: {new Date(task.completedAt).toLocaleString()}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AgentDetailsPage

