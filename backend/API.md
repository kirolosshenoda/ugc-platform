# UGC Platform API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Auth
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout user

### Creators
- `GET /creators` - List all creators
- `GET /creators/:id` - Get creator details
- `POST /creators` - Create creator profile
- `PUT /creators/:id` - Update creator profile
- `GET /creators/:id/content` - Get creator's content
- `GET /creators/:id/reviews` - Get creator reviews

### Content
- `POST /content` - Upload content
- `GET /content/:id` - Get content details
- `PUT /content/:id` - Update content
- `DELETE /content/:id` - Delete content
- `POST /content/:id/like` - Like content
- `POST /content/:id/comment` - Add comment

### Campaigns
- `GET /campaigns` - List campaigns
- `POST /campaigns` - Create campaign
- `GET /campaigns/:id` - Get campaign details
- `PUT /campaigns/:id` - Update campaign
- `POST /campaigns/:id/apply` - Apply to campaign
- `POST /campaigns/:id/accept` - Accept creator for campaign

### Messages
- `GET /messages` - Get conversations
- `POST /messages` - Send message
- `GET /messages/:conversationId` - Get conversation messages

### Payments
- `POST /payments/create-payment-intent` - Create Stripe payment
- `POST /payments/webhook` - Stripe webhook
- `GET /payments/history` - Payment history

### Reviews
- `POST /reviews` - Create review
- `GET /reviews/:creatorId` - Get creator reviews
- `PUT /reviews/:id` - Update review

### Admin
- `GET /admin/users` - List all users
- `GET /admin/stats` - Platform statistics
- `POST /admin/moderate` - Moderate content
- `POST /admin/ban-user` - Ban user
