import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { setupSocketHandlers } from './sockets/handlers.js'
import { errorHandler } from './middleware/errorHandler.js'

// Routes
import authRoutes from './routes/auth.js'
import creatorRoutes from './routes/creators.js'
import contentRoutes from './routes/content.js'
import campaignRoutes from './routes/campaigns.js'
import messageRoutes from './routes/messages.js'
import reviewRoutes from './routes/reviews.js'
import paymentRoutes from './routes/payments.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.use('/api/auth', authRoutes)
app.use('/api/creators', creatorRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/admin', adminRoutes)

// Error handling
app.use(errorHandler)

// Socket.IO
setupSocketHandlers(io)

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Database: ${process.env.DATABASE_URL}`)
})
