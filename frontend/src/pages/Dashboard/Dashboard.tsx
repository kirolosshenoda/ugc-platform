import { useAuth } from '../../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Profile</h3>
            <p className="text-2xl font-bold text-gray-900">{user?.first_name} {user?.last_name}</p>
            <p className="text-sm text-gray-600 capitalize mt-2">{user?.role}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Email</h3>
            <p className="text-lg font-bold text-gray-900">{user?.email}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Verification Status</h3>
            <p className={`text-lg font-bold ${user?.is_verified ? 'text-green-600' : 'text-yellow-600'}`}>
              {user?.is_verified ? 'Verified' : 'Pending'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Account Active</h3>
            <p className={`text-lg font-bold ${user?.is_active ? 'text-green-600' : 'text-red-600'}`}>
              {user?.is_active ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/creators" className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:bg-blue-100 transition">
              <h3 className="font-semibold text-blue-900">Browse Creators</h3>
              <p className="text-sm text-blue-700">Discover talented content creators</p>
            </a>
            <a href="/campaigns" className="bg-green-50 border-2 border-green-300 rounded-lg p-4 hover:bg-green-100 transition">
              <h3 className="font-semibold text-green-900">View Campaigns</h3>
              <p className="text-sm text-green-700">Find collaboration opportunities</p>
            </a>
            <a href="/messages" className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 hover:bg-purple-100 transition">
              <h3 className="font-semibold text-purple-900">Messages</h3>
              <p className="text-sm text-purple-700">Chat with other users</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
