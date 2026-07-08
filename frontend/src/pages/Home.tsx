export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">UGC Platform</h1>
          <p className="text-xl text-gray-600 mb-10">Connect creators with brands. Scale your content.</p>
          <div className="flex gap-4 justify-center">
            <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">Get Started</a>
            <a href="/creators" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50">Browse Creators</a>
          </div>
        </div>
      </div>
    </div>
  )
}
