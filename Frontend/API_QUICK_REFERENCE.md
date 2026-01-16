# 🔌 API Quick Reference

Quick lookup for all API endpoints and their contracts.

---

## 📍 Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication

### Sign Up
```
POST /api/users/create

Request:
{
  "username": "utej",
  "email": "user@example.com",
  "password": "password123",
  "creationDate": "2026-01-14T10:00:00Z"
}

Response (200):
{
  "id": 1,
  "username": "utej",
  "email": "user@example.com",
  "creationDate": "2026-01-14T10:00:00Z"
}
```

### Log In
```
POST /api/users/login

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "id": 1,
  "username": "utej",
  "email": "user@example.com",
  "creationDate": "2026-01-14T10:00:00Z"
}

Errors:
401 - User not found
401 - Invalid password
```

---

## 📦 Database Management

### Create Database
```
POST /api/db/create

Request:
{
  "userId": 1,
  "dbName": "my_app_db",
  "dbType": "POSTGRES",
  "dbVersion": "16",
  "description": "Database for my application"
}

Response (200):
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

Errors:
400 - Invalid database name
409 - Database name already exists
```

### List Databases
```
GET /api/db/user/1

Response (200):
[
  {
    "id": 4,
    "userId": 1,
    "dbName": "my_app_db",
    "dbType": "POSTGRES",
    "dbVersion": "16",
    "port": "5400",
    "description": "Database for my application",
    "createdAt": "2026-01-14T11:06:48.128Z"
  }
]
```

### Delete Database
```
DELETE /api/db/4

Response (200):
{
  "message": "Database deleted successfully"
}

Errors:
404 - Database not found
403 - Not your database
```

---

## 🧪 Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:5000/api/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "creationDate": "2026-01-14T10:00:00Z"
  }'
```

### Log In
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Database
```bash
curl -X POST http://localhost:5000/api/db/create \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "dbName": "my_app_db",
    "dbType": "POSTGRES",
    "dbVersion": "16",
    "description": "My test database"
  }'
```

### List Databases
```bash
curl http://localhost:5000/api/db/user/1
```

### Delete Database
```bash
curl -X DELETE http://localhost:5000/api/db/4
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request / validation error |
| 401 | Unauthorized / authentication failed |
| 403 | Forbidden / permission denied |
| 404 | Not found |
| 409 | Conflict / duplicate entry |
| 500 | Server error |
| 503 | Service unavailable |

---

## 💾 Database Schema

### users
```
id (PRIMARY KEY)
username (UNIQUE, NOT NULL)
email (UNIQUE, NOT NULL)
password (NOT NULL, hashed)
createdAt (TIMESTAMP)
```

### databases
```
id (PRIMARY KEY)
userId (FOREIGN KEY → users.id)
dbName (NOT NULL)
dbType (NOT NULL) = POSTGRES
dbVersion (NOT NULL) = 16
description (OPTIONAL)
username (NOT NULL)
password (NOT NULL)
port (UNIQUE, NOT NULL)
dockerContainerId (OPTIONAL)
createdAt (TIMESTAMP)

UNIQUE CONSTRAINT: (userId, dbName)
```

---

## 🐳 Docker Commands Reference

### Create Container
```bash
docker run -d \
  --name dbrift_db_4 \
  -e POSTGRES_DB=my_app_db \
  -e POSTGRES_USER=my_app_db9f31ab \
  -e POSTGRES_PASSWORD=auto-generated-password \
  -p 5400:5432 \
  postgres:16
```

### Stop Container
```bash
docker stop dbrift_db_4
```

### Remove Container
```bash
docker rm dbrift_db_4
```

### List Containers
```bash
docker ps -a
```

---

## 🔗 Connection String Format

```
postgresql://username:password@host:port/database

Example:
postgresql://my_app_db9f31ab:auto-generated-password@localhost:5400/my_app_db
```

---

## ✅ Implementation Checklist

- [ ] Choose backend framework
- [ ] Set up project
- [ ] Create database schema
- [ ] Implement signup endpoint
- [ ] Implement login endpoint
- [ ] Implement create database endpoint
- [ ] Implement Docker integration
- [ ] Implement list databases endpoint
- [ ] Implement delete database endpoint
- [ ] Add error handling
- [ ] Test all endpoints
- [ ] Add CORS headers
- [ ] Test with frontend
- [ ] Deploy

---

## 🛠️ Quick Troubleshooting

### Frontend shows "Connection error"
- Check backend is running on port 5000
- Check CORS headers are set
- Verify API base URL in frontend

### Database creation fails
- Check Docker is running
- Check port 5400 is available
- Verify database name is valid

### Login returns 401
- Verify email exists in database
- Check password is correct
- Ensure password is hashed correctly

### Docker commands fail
- Ensure Docker daemon is running
- Check Docker socket permissions
- Verify Docker is installed

---

## 📚 File References

| File | Purpose |
|------|---------|
| API_DOCUMENTATION.md | Complete API specifications |
| BACKEND_IMPLEMENTATION_GUIDE.md | Detailed backend setup |
| IMPLEMENTATION_SUMMARY.md | Frontend implementation details |
| SETUP_COMPLETE.md | Project overview |
| API_QUICK_REFERENCE.md | This file |

---

## 🎯 Key Points

1. **User Creation**: Returns user ID for future API calls
2. **Database Creation**: Auto-generates credentials and port
3. **Credentials**: Should NOT be stored in frontend (shown once)
4. **Connection**: Use port from response to connect externally
5. **Deletion**: Removes Docker container and database record
6. **Errors**: Always return JSON with meaningful messages

---

## 🚀 You're Ready!

All frontend components are implemented and waiting for your backend API.

**Start implementing the 5 endpoints and you'll be done!**
