import { useCampaigns } from '../../hooks/useCampaigns.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Campaigns() {
  const [limit] = useState(20)
  const [offset] = useState(0)
  const { data: response, isLoading } = useCampaigns(limit, offset)
  const campaigns = response?.data || []

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading campaigns...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Available Campaigns</h1>
          <Link to="/campaigns/create" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Create Campaign
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign: any) => (
            <Link key={campaign.id} to={`/campaign/${campaign.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex-1">{campaign.title}</h2>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold">{campaign.status}</span>
                </div>
                <p className="text-gray-600 mb-4">{campaign.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Budget</p>
                    <p className="text-2xl font-bold text-gray-900">${campaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{campaign.applications_count}</p>
                  </div>
                </div>
                {campaign.content_type && campaign.content_type.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {campaign.content_type.map((type: string) => (
                      <span key={type} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
