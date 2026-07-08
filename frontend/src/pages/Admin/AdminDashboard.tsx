import { adminAPI } from '../../services/api-calls.js'
import { useQuery } from '@tanstack/react-query'

export default function AdminDashboard() {
  const { data: statsResponse } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminAPI.getPlatformStats(),
  })
  const { data: usersResponse } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminAPI.getAllUsers(),
  })

  const stats = statsResponse?.data
  const users = usersResponse?.data || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_users || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Total Creators</p>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_creators || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Total Content</p>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_content || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Total Campaigns</p>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_campaigns || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Revenue</p>
            <p className="text-3xl font-bold text-green-600">${stats?.total_revenue.toFixed(2) || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{user.email}</td>
                    <td className="py-3 px-4 text-gray-900">{user.first_name} {user.last_name}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        user.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
