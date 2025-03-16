"use client"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"
import { FaUsers, FaUpload, FaTasks } from "react-icons/fa"
import { Link } from "react-router-dom"

const DashboardPage = () => {
  const { user } = useAuth()

  // Dashboard stats (mock data)
  const stats = [
    { id: 1, name: "Total Agents", value: 24, icon: <FaUsers className="h-6 w-6" /> },
    { id: 2, name: "Active Tasks", value: 156, icon: <FaTasks className="h-6 w-6" /> },
    { id: 3, name: "Lists Uploaded", value: 12, icon: <FaUpload className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user?.name || "Admin"}</h1>
          <p className="mt-1 text-sm text-gray-600">Here's what's happening with your agents today.</p>

          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-500 rounded-md p-3 text-white">{stat.icon}</div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to={stat.id === 1 ? "/agents" : stat.id === 3 ? "/upload" : "#"}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        View all
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {item % 2 === 0 ? "New agent registered" : "List uploaded"}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item % 3 === 0 ? "Completed" : "Active"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {item % 2 === 0 ? "Agent ID: A00" + item : "List ID: L00" + item}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>{new Date(Date.now() - item * 3600000).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage

