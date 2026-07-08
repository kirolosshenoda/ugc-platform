import { useConversations, useSendMessage } from '../../hooks/useMessages.js'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'

export default function Messages() {
  const { user } = useAuth()
  const { data: conversationsResponse, isLoading } = useConversations()
  const sendMessageMutation = useSendMessage()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [messageText, setMessageText] = useState('')

  const conversations = conversationsResponse?.data || []

  const handleSendMessage = async () => {
    if (!selectedUserId || !messageText.trim()) return

    try {
      await sendMessageMutation.mutateAsync({
        recipient_id: selectedUserId,
        content: messageText,
      })
      setMessageText('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading messages...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-bold text-gray-900">Conversations</h2>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {conversations.length === 0 ? (
                <p className="p-4 text-gray-500">No conversations yet</p>
              ) : (
                conversations.map((conv: any) => (
                  <div
                    key={conv.other_user_id}
                    onClick={() => setSelectedUserId(conv.other_user_id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedUserId === conv.other_user_id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="font-semibold text-gray-900">User {conv.other_user_id}</p>
                    <p className="text-sm text-gray-600 truncate">{conv.last_message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col">
            {selectedUserId ? (
              <>
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">Chat with User {selectedUserId}</h2>
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">Messages will appear here</div>
                <div className="p-4 border-t flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={sendMessageMutation.isPending}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
