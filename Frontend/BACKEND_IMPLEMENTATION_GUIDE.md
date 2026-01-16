# Backend Implementation Guide

## Overview
This guide explains what backend endpoints need to be implemented to make the DBrift platform fully functional.

---

## Required Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/users/create` | Create user account |
| POST | `/api/users/login` | Authenticate user |
| POST | `/api/db/create` | Create database |
| GET | `/api/db/user/:userId` | List user's databases |
| DELETE | `/api/db/:dbId` | Delete database |

---

## Detailed Endpoint Specifications

### 1. POST /api/users/create

**Request:**
```json
{
  "username": "string (required, 3+ chars)",
  "email": "string (required, valid email)",
  "password": "string (required, 6+ chars, plain text)",
  "creationDate": "ISO 8601 datetime"
}
```

**Response (200 - Success):**
```json
{
  "id": 1,
  "username": "utej",
  "email": "user@example.com",
  "creationDate": "2026-01-14T10:00:00Z"
}
```

**Errors:**
- `400`: Missing required fields or invalid format
- `409`: Email already registered
- `500`: Server error

**Backend Logic:**
- Validate all fields
- Hash password before storing
- Check if email already exists
- Create user record in database
- Return user object (WITHOUT password)

---

### 2. POST /api/users/login

**Request:**
```json
{
  "email": "string (required)",
  "password": "string (required, plain text)"
}
```

**Response (200 - Success):**
```json
{
  "id": 1,
  "username": "utej",
  "email": "user@example.com",
  "creationDate": "2026-01-14T10:00:00Z"
}
```

**Errors:**
- `401`: User not found or invalid password
- `500`: Server error

**Backend Logic:**
- Find user by email
- Compare password (use bcrypt or similar)
- If valid, return user object
- If invalid, return 401 error

---

### 3. POST /api/db/create

**Request:**
```json
{
  "userId": 1,
  "dbName": "string (required, 3-63 chars, alphanumeric + hyphens/underscores)",
  "dbType": "POSTGRES (only option for now)",
  "dbVersion": "16 (only option for now)",
  "description": "string (optional)"
}
```

**Response (200 - Success):**
```json
{
  "id": 4,
  "userId": 1,
  "dbName": "my_app_db",
  "dbType": "POSTGRES",
  "dbVersion": "16",
  "description": "Database for my application",
  "username": "my_app_db9f31ab",
  "password": "auto-generated-password",
  "port": "5400",
  "createdAt": "2026-01-14T11:06:48.128Z"
}
```

**Errors:**
- `400`: Invalid database name or missing fields
- `401`: User not authenticated
- `409`: Database name already exists for this user
- `500`: Failed to create database
- `503`: Docker service unavailable

**Backend Logic:**
1. Validate userId, dbName, dbType, dbVersion
2. Check if database name is unique for user
3. Generate random username: `{dbName}{random_suffix}`
4. Generate random password (12-16 chars, mixed case + numbers)
5. Find available port (start at 5400, increment if taken)
6. Create Docker PostgreSQL container:
   - Image: `postgres:16`
   - Port mapping: `{port}:5432`
   - Environment variables:
     - `POSTGRES_DB={dbName}`
     - `POSTGRES_USER={username}`
     - `POSTGRES_PASSWORD={password}`
7. Wait for container to be ready
8. Save metadata to database
9. Return credentials

**Example Docker Command:**
```bash
docker run -d \
  --name dbrift_db_${id} \
  -e POSTGRES_DB=my_app_db \
  -e POSTGRES_USER=my_app_db9f31ab \
  -e POSTGRES_PASSWORD=auto-generated-password \
  -p 5400:5432 \
  postgres:16
```

---

### 4. GET /api/db/user/:userId

**Request:**
- No body required
- Parameter: `userId` (required)

**Response (200 - Success):**
```json
[
  {
    "id": 4,
    "userId": 1,
    "dbName": "my_app_db",
    "dbType": "POSTGRES",
    "dbVersion": "16",
    "description": "Database for my application",
    "port": "5400",
    "createdAt": "2026-01-14T11:06:48.128Z"
  },
  {
    "id": 5,
    "userId": 1,
    "dbName": "analytics_db",
    "dbType": "POSTGRES",
    "dbVersion": "16",
    "description": "Analytics database",
    "port": "5401",
    "createdAt": "2026-01-14T12:30:00.000Z"
  }
]
```

**Errors:**
- `401`: User not authenticated
- `404`: User not found
- `500`: Server error

**Backend Logic:**
- Find all databases where userId matches
- Return array of database records
- Do NOT include credentials (username, password)

---

### 5. DELETE /api/db/:dbId

**Request:**
- No body required
- Parameter: `dbId` (required)

**Response (200 - Success):**
```json
{
  "message": "Database deleted successfully"
}
```

**Errors:**
- `401`: User not authenticated
- `403`: Database doesn't belong to user
- `404`: Database not found
- `500`: Failed to delete database

**Backend Logic:**
1. Find database by id
2. Verify it belongs to authenticated user
3. Stop and remove Docker container
4. Delete database record from database
5. Return success message

**Example Docker Commands:**
```bash
docker stop dbrift_db_${id}
docker rm dbrift_db_${id}
```

---

## Database Schema

### users table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### databases table
```sql
CREATE TABLE databases (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dbName VARCHAR(255) NOT NULL,
  dbType VARCHAR(50) NOT NULL,
  dbVersion VARCHAR(50) NOT NULL,
  description TEXT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  port INTEGER NOT NULL UNIQUE,
  dockerContainerId VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(userId, dbName)
);
```

---

## Technology Stack Recommendations

### Backend Framework
- **Node.js + Express** (JavaScript)
- **Python + Flask/FastAPI** (Python)
- **Go + Gin** (Go)
- **.NET + ASP.NET** (C#)

### Database
- **PostgreSQL** (recommended for production)
- **MySQL** (alternative)
- **MongoDB** (if document storage preferred)

### Docker Integration
- **Docker SDK** for your language
  - Node.js: `dockerode` package
  - Python: `docker` package
  - Go: `moby/moby` package
  - .NET: `Docker.DotNet` package

### Security
- **bcryptjs** - Password hashing
- **jsonwebtoken** - Session management (future)
- **cors** - Cross-origin requests
- **helmet** - HTTP headers

---

## Implementation Timeline

### Phase 1: Basic Setup
- [ ] Set up backend project
- [ ] Configure database
- [ ] Set up Express/Framework routing
- [ ] Implement CORS

### Phase 2: Authentication (Days 1-2)
- [ ] Implement POST /api/users/create
- [ ] Implement POST /api/users/login
- [ ] Add password hashing
- [ ] Test with Postman/Insomnia

### Phase 3: Database Management (Days 2-3)
- [ ] Implement POST /api/db/create with Docker
- [ ] Implement GET /api/db/user/:userId
- [ ] Implement DELETE /api/db/:dbId
- [ ] Test Docker integration

### Phase 4: Testing & Deployment (Day 4)
- [ ] Write tests
- [ ] Error handling
- [ ] Performance optimization
- [ ] Deploy to production

---

## Local Development Setup

### Required Software
- Docker (for database containers)
- Node.js/Python/Go/etc (for backend)
- PostgreSQL client tools (for testing)

### Environment Variables (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbrift
DOCKER_HOST=unix:///var/run/docker.sock (or TCP if using Docker Desktop)
NODE_ENV=development
PORT=5000
```

### Running the Backend
```bash
# Install dependencies
npm install  # or appropriate package manager

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Testing Endpoints
```bash
# Signup
curl -X POST http://localhost:5000/api/users/create \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create database
curl -X POST http://localhost:5000/api/db/create \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"dbName":"my_db","dbType":"POSTGRES","dbVersion":"16"}'

# List databases
curl http://localhost:5000/api/db/user/1

# Delete database
curl -X DELETE http://localhost:5000/api/db/1
```

---

## Common Issues & Solutions

### Docker Connection Issues
**Problem:** "Cannot connect to Docker daemon"
**Solution:** 
- Ensure Docker is running
- Check Docker socket permissions
- Use TCP connection if Docker Desktop

### Port Already in Use
**Problem:** "Port 5400 already in use"
**Solution:**
- Check if container already exists
- Use different port range
- Remove stale containers: `docker ps -a`

### Database Connection Failed
**Problem:** "Cannot connect to database"
**Solution:**
- Verify PostgreSQL is running
- Check connection string
- Verify credentials
- Check firewall rules

### Password Hashing
**Problem:** Storing plain passwords
**Solution:**
- Use bcrypt with salt rounds (10-12)
- Never store or log plain passwords
- Use HTTPS in production

---

## Next Steps

1. Choose your backend framework
2. Set up project structure
3. Implement authentication endpoints first
4. Test with frontend
5. Implement database management endpoints
6. Set up Docker integration
7. Test end-to-end flow
8. Deploy and monitor

---

## Questions?

Refer to:
- API_DOCUMENTATION.md - Frontend API specs
- IMPLEMENTATION_SUMMARY.md - What's already implemented
- Component source files - Expected data formats
