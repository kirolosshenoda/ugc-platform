import { useCreators } from '../../hooks/useCreators.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CreatorDiscovery() {
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)
  const { data: response, isLoading, error } = useCreators(limit, offset)
  const creators = response?.data || []

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error loading creators</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Discover Creators</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator: any) => (
            <Link key={creator.id} to={`/creator/${creator.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <h3 className="text-xl font-bold text-gray-900">{creator.username}</h3>
                <p className="text-gray-600 mt-2">{creator.bio}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{creator.total_followers} followers</span>
                  <span className="text-yellow-500 font-semibold">★ {creator.rating.toFixed(1)}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {creator.categories?.map((cat: string) => (
                    <span key={cat} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
