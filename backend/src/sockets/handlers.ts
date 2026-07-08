import { Server as SocketIOServer, Socket } from 'socket.io'
import { MessageService } from '../services/messageService.js'

const userSockets = new Map<number, string>()

export const setupSocketHandlers = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    const userId = parseInt(socket.handshake.query.userId as string)
    userSockets.set(userId, socket.id)

    console.log(`User ${userId} connected with socket ${socket.id}`)

    // Handle new message
    socket.on('send_message', async (data: { recipient_id: number; content: string }) => {
      try {
        const message = await MessageService.sendMessage(userId, data.recipient_id, data.content)
        
        // Send to recipient if online
        const recipientSocketId = userSockets.get(data.recipient_id)
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('receive_message', message)
        }
        
        socket.emit('message_sent', message)
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    // Handle typing indicator
    socket.on('user_typing', (data: { recipient_id: number }) => {
      const recipientSocketId = userSockets.get(data.recipient_id)
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('user_typing', { sender_id: userId })
      }
    })

    // Handle stop typing
    socket.on('user_stop_typing', (data: { recipient_id: number }) => {
      const recipientSocketId = userSockets.get(data.recipient_id)
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('user_stop_typing', { sender_id: userId })
      }
    })

    // Handle notifications
    socket.on('campaign_notification', (data: { recipient_id: number; message: string }) => {
      const recipientSocketId = userSockets.get(data.recipient_id)
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('campaign_notification', data)
      }
    })

    socket.on('disconnect', () => {
      userSockets.delete(userId)
      console.log(`User ${userId} disconnected`)
    })
  })
}
