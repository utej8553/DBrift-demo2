# DBrift API Documentation

Complete API specification for the DBrift database provisioning platform.

## Base URL
```
http://localhost:5000/api
```

---

## 1️⃣ USER SIGNUP

### Purpose
Create a new platform user account.

### Endpoint
```
POST /api/users/create
```

### Request Body
```json
{
  "username": "utej",
  "email": "user@example.com",
  "password": "plain_password",
  "creationDate": "2026-01-14T10:00:00Z"
}
```

### Success Response (200)
```json
{
  "id": 1,
  "username": "utej",
  "email": "user@example.com",
  "creationDate": "2026-01-14T10:00:00Z"
}
```

### Error Responses
- **400**: Validation error (missing fields, invalid email, etc.)
- **409**: Email already exists
- **500**: Server error

### Validation Rules
- Username: 3+ characters, alphanumeric + underscores
- Email: Valid email format
- Password: 6+ characters (plain text in request)

---

## 2️⃣ USER LOGIN

### Purpose
Authenticate user with email and password (simple password comparison).

### Endpoint
```
POST /api/users/login
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "plain_password"
}
```

### Success Response (200)
```json
{
  "id": 1,
  "username": "utej",
  "email": "user@example.com",
  "creationDate": "2026-01-14T10:00:00Z"
}
```

### Error Responses
| Status | Message |
|--------|---------|
| 401 | User not found |
| 401 | Invalid password |
| 500 | Server error |

---

## 3️⃣ CREATE DATABASE (CORE FEATURE)

### Purpose
Provision a new PostgreSQL database in Docker and return credentials.

### Endpoint
```
POST /api/db/create
```

### Request Body
```json
{
  "userId": 1,
  "dbName": "my_app_db",
  "dbType": "POSTGRES",
  "dbVersion": "16",
  "description": "Database for my application"
}
```

### UI Fields
- **Database Name** (text, required): 3-63 chars, alphanumeric + hyphens/underscores
- **Database Type** (dropdown): POSTGRES (only option for now)
- **Database Version** (dropdown): 16
- **Description** (textarea, optional): Additional info about the database

### What Happens Internally
1. Docker Postgres container is created with random port (5400+)
2. Unique DB username & password are generated
3. Metadata is saved in backend database
4. Port mapping is configured

### Success Response (200)
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

### Error Responses
- **400**: Invalid database name or missing required fields
- **401**: User not authenticated
- **409**: Database name already exists for this user
- **500**: Failed to create Docker container or database
- **503**: Docker service unavailable

### Frontend Display (IMPORTANT)
Show credentials modal with:
```
Host: <server-ip>
Port: 5400
Database: my_app_db
Username: my_app_db9f31ab
Password: ••••••••
```

**Action Buttons:**
- 📋 Copy Connection URL
- 📋 Copy Username
- 📋 Copy Password

### Connection String (Frontend Generated)
```
postgresql://username:password@SERVER_IP:PORT/dbName
```

Example:
```
postgresql://my_app_db9f31ab:pass@54.196.8.224:5400/my_app_db
```

---

## 4️⃣ LIST USER DATABASES

### Purpose
Show all databases owned by a user.

### Endpoint
```
GET /api/db/user/{userId}
```

### Example
```
GET /api/db/user/1
```

### Success Response (200)
```json
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
  },
  {
    "id": 5,
    "userId": 1,
    "dbName": "analytics_db",
    "dbType": "POSTGRES",
    "dbVersion": "16",
    "port": "5401",
    "description": "Analytics database",
    "createdAt": "2026-01-14T12:30:00.000Z"
  }
]
```

### Error Responses
- **401**: User not authenticated
- **404**: User not found
- **500**: Server error

---

## 5️⃣ DELETE DATABASE

### Purpose
Delete database and remove Docker container.

### Endpoint
```
DELETE /api/db/{dbId}
```

### Example
```
DELETE /api/db/4
```

### Success Response (200)
```json
{
  "message": "Database deleted successfully"
}
```

### Error Responses
- **401**: User not authenticated
- **403**: Database doesn't belong to user
- **404**: Database not found
- **500**: Failed to delete Docker container

---

## 🔄 FRONTEND FLOW (END-TO-END)

### User Journey
1. **Landing Page** → User sees platform features and "Get Started" button
2. **Sign Up** → Create new account (username, email, password)
3. **Login** → Authenticate with email and password
4. **Dashboard** → View list of created databases
5. **Create Database Form** → Fill in database details
6. **Credentials Display** → Show connection info (password hidden initially)
7. **Copy Actions** → Copy connection string, username, password
8. **External Use** → User connects via psql or applications

### State Management
- **Auth State**: User ID stored in Context & localStorage
- **Database List**: Fetched on dashboard load
- **Credentials**: Shown once after creation, can be closed
- **Error Handling**: Inline error messages with retry options

---

## 📋 Frontend API Integration

### SignupForm Component
- Validates username (3+ chars), email format, password (6+ chars)
- Calls `POST /api/users/create`
- Shows success message and redirects to dashboard on success

### LoginForm Component
- Validates email format and password
- Calls `POST /api/users/login`
- Stores user data in context and localStorage
- Redirects to dashboard on success

### DashboardPage Component
- Loads user's databases on mount using `GET /api/db/user/{userId}`
- Shows empty state if no databases exist
- Handles database creation flow
- Displays credentials modal after successful creation
- Handles database deletion with confirmation

### CredentialsDisplay Component
- Shows all connection details
- Copy buttons for each field
- Password visibility toggle
- Auto-generated connection string

---

## 🔐 Security Notes

- Passwords are transmitted in plain text in requests (in production, use HTTPS)
- Consider password hashing on backend
- Database credentials should be securely managed
- Implement rate limiting on auth endpoints
- Add CORS headers for production

---

## 📱 Error Handling Examples

### Signup Errors
```json
{
  "message": "Email already registered",
  "field": "email"
}
```

### Database Creation Errors
```json
{
  "message": "Database name already exists for this user",
  "field": "dbName"
}
```

### Authentication Errors
```json
{
  "message": "Invalid email or password"
}
```

---

## 🚀 Deployment Checklist

- [ ] Database backend set up
- [ ] Docker daemon running and accessible
- [ ] API endpoints implemented
- [ ] Frontend connected to correct API base URL
- [ ] Environment variables configured
- [ ] CORS headers set up
- [ ] Error handling implemented
- [ ] Testing completed
- [ ] SSL/HTTPS enabled in production
- [ ] Rate limiting configured
- [ ] Logging and monitoring set up
