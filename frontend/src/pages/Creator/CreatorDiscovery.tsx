export default function CreatorDiscovery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Discover Creators</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Creator cards will be rendered here */}
          <div className="bg-white rounded-lg shadow p-6">Creator Card</div>
        </div>
      </div>
    </div>
  )
}
