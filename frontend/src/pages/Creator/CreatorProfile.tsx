import { useParams } from 'react-router-dom'
import { useCreatorProfile } from '../../hooks/useCreators.js'
import { useQuery } from '@tanstack/react-query'
import { contentAPI, reviewAPI } from '../../services/api-calls.js'

export default function CreatorProfile() {
  const { id } = useParams()
  const creatorId = parseInt(id!)
  const { data: creatorResponse, isLoading } = useCreatorProfile(creatorId)
  const creator = creatorResponse?.data
  const { data: contentResponse } = useQuery({
    queryKey: ['content', creatorId],
    queryFn: () => contentAPI.getContent(creatorId),
  })
  const { data: reviewsResponse } = useQuery({
    queryKey: ['reviews', creatorId],
    queryFn: () => reviewAPI.getCreatorReviews(creatorId),
  })

  const content = contentResponse?.data || []
  const reviews = reviewsResponse?.data || []

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!creator) return <div className="min-h-screen flex items-center justify-center">Creator not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{creator.username}</h1>
              <p className="text-gray-600 mt-2">{creator.bio}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl text-yellow-500 font-bold">★ {creator.rating.toFixed(1)}</div>
              <p className="text-gray-600">({creator.review_count} reviews)</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-600 text-sm">Followers</p>
              <p className="text-2xl font-bold text-gray-900">{creator.total_followers}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-gray-600 text-sm">Rate per Video</p>
              <p className="text-2xl font-bold text-gray-900">${creator.rate_per_video}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <p className="text-gray-600 text-sm">Status</p>
              <p className="text-2xl font-bold text-green-600 capitalize">{creator.availability_status}</p>
            </div>
          </div>

          {creator.categories && creator.categories.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {creator.categories.map((cat: string) => (
                  <span key={cat} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.map((item: any) => (
                  <div key={item.id} className="bg-gray-100 rounded-lg p-4 hover:shadow transition">
                    {item.thumbnail_url && (
                      <img src={item.thumbnail_url} alt={item.title} className="w-full h-40 object-cover rounded mb-2" />
                    )}
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.views_count} views</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reviews ({reviews.length})</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{review.first_name} {review.last_name}</span>
                      <span className="text-yellow-500">★ {review.rating}</span>
                    </div>
                    {review.comment && <p className="text-gray-600 text-sm mt-2">{review.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
