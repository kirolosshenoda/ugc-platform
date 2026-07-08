# UGC Platform

A comprehensive User-Generated Content platform for creators, campaigns, and brand collaborations.

## Features

- 👤 Creator profiles & discovery
- 📸 Content upload & management
- 🎯 Campaign management
- 💬 Real-time messaging
- ⭐ Reviews & ratings
- 💳 Payment processing
- 🔐 Secure authentication
- 📊 Admin dashboard

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit (state management)
- React Query (data fetching)
- Socket.IO (real-time features)

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Stripe (payments)
- AWS S3 (file storage)
- Socket.IO (real-time messaging)

## Project Structure

```
ugc-platform/
├── frontend/          # React + TypeScript
├── backend/           # Node.js + Express
├── database/          # PostgreSQL schemas
├── docker-compose.yml # Local development
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Installation

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (in another terminal)
cd backend
npm install
npm run dev
```

## Environment Variables

See `.env.example` files in frontend and backend directories.

## Documentation

- [Frontend Setup](./frontend/README.md)
- [Backend Setup](./backend/README.md)
- [Database Schema](./database/schema.sql)
- [API Documentation](./backend/API.md)

## License

MIT
