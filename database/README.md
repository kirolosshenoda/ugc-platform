# Database Schema

PostgreSQL database schema for UGC Platform.

## Tables

- **users** - User accounts and authentication
- **creators** - Creator profiles
- **content** - User-generated content
- **campaigns** - Brand campaigns
- **campaign_applications** - Creator applications to campaigns
- **messages** - Direct messaging
- **reviews** - Creator reviews
- **payments** - Payment records

## Setup

```bash
# Using Docker Compose
docker-compose up -d postgres

# Run migrations
psql -U ugc_user -d ugc_platform -f schema.sql
```
