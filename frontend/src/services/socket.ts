import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initializeSocket = (userId: number) => {
  const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
  
  socket = io(socketUrl, {
    query: { userId: userId.toString() },
    reconnection: true,
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id)
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  return socket
}

export const getSocket = (): Socket | null => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const sendMessage = (recipientId: number, content: string) => {
  if (socket) {
    socket.emit('send_message', { recipient_id: recipientId, content })
  }
}

export const onMessageReceived = (callback: (message: any) => void) => {
  if (socket) {
    socket.on('receive_message', callback)
  }
}

export const onTyping = (callback: (data: any) => void) => {
  if (socket) {
    socket.on('user_typing', callback)
  }
}

export const onStopTyping = (callback: (data: any) => void) => {
  if (socket) {
    socket.on('user_stop_typing', callback)
  }
}

export const sendTypingIndicator = (recipientId: number) => {
  if (socket) {
    socket.emit('user_typing', { recipient_id: recipientId })
  }
}

export const sendStopTypingIndicator = (recipientId: number) => {
  if (socket) {
    socket.emit('user_stop_typing', { recipient_id: recipientId })
  }
}
