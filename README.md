# DBrift - Database-as-a-Service Platform

## Overview

**DBrift** is a full-stack Database-as-a-Service (DBaaS) platform that empowers developers to dynamically create, manage, and provision isolated database instances through an intuitive web interface. No manual database installation or configuration needed—just sign up, log in, and launch your database in seconds.

This project demonstrates real-world full-stack development by integrating Spring Boot backend orchestration, React frontend UI, Docker containerization, and cloud-ready deployment patterns.

---

## 🎯 Key Features

### User Management
- **User Registration & Authentication**: Secure sign-up and login with credential management
- **User Dashboard**: Centralized hub to view and manage all provisioned databases

### Database Provisioning
- **One-Click Database Creation**: Instantly provision database instances with selected type and version
- **Automatic Container Management**: Backend automatically launches isolated Docker containers for each database
- **Unique Port Assignment**: Each database is assigned a unique port for secure isolation
- **Credential Generation**: Automatic username/password generation with secure storage
- **Database Metadata Storage**: All database information persisted and easily accessible

### Database Management
- **Database Listing**: View all active databases with connection details
- **Connection Information**: Display generated credentials (host, port, username, password)
- **Database Deletion**: Safe cleanup and container removal to prevent resource conflicts
- **Lifecycle Management**: Full control over database instance lifecycle

### Infrastructure & DevOps
- **Docker-Based Isolation**: Each database runs in an isolated container for maximum security and portability
- **Resource Efficiency**: Lightweight containerization enables multiple databases on single host
- **Fast Provisioning**: Container-based approach enables near-instant database deployment
- **Clean Lifecycle**: Automated cleanup prevents resource leaks and port conflicts

---

## 🏗️ Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React/Vite)                   │
│  - Authentication UI (Login/Sign-up)                        │
│  - Database Dashboard                                       │
│  - Database Creation Panel                                  │
│  - Connection Details Display                               │
└─────────────────────────────────────────────────────────────┘
                            │
                   (REST API via HTTP)
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Spring Boot)                      │
│  - User Service & Repository                                │
│  - Database Service & Repository                            │
│  - Authentication & Authorization                           │
│  - Database Provisioning Logic                              │
│  - Docker Container Orchestration                           │
│  - Port Management & Credential Generation                  │
└─────────────────────────────────────────────────────────────┘
                            │
              (Docker API / Container Runtime)
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                      │
│  - Docker Engine                                            │
│  - Containerized Database Instances                         │
│  - Isolated Networks & Port Mappings                        │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **User Registration**: Frontend → Backend → Database Storage
2. **Database Creation**: Frontend → Backend → Docker API → Container Launch
3. **Database Retrieval**: Frontend → Backend → Database Query → Dashboard Display
4. **Database Deletion**: Frontend → Backend → Container Stop/Remove → Metadata Cleanup

---

## 💻 Technology Stack

### Backend
- **Framework**: Spring Boot (Java)
- **Database Persistence**: JPA/Hibernate with SQL database
- **Container Orchestration**: Docker API integration
- **Build Tool**: Maven
- **Port Management**: Dynamic port allocation system

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: CSS3 with custom animations
- **State Management**: React Context API
- **HTTP Client**: Axios for REST API communication
- **UI Components**: Custom React components with smooth transitions

### Infrastructure
- **Containerization**: Docker
- **Supported Database Types**: PostgreSQL, MySQL, MongoDB (extensible)
- **Isolation**: Container-based network isolation
- **Lifecycle**: Automated provisioning and cleanup

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (for frontend development)
- Java 11+ (for backend)
- Maven 3.6+ (for backend builds)
- Docker Desktop (for container management)
- Git

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd DBrift-demo2
```

#### 2. Backend Setup
```bash
cd backend

# Build the backend
mvn clean install

# Run the backend (default port: 8080)
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

#### 3. Frontend Setup
```bash
cd Frontend

# Install dependencies
npm install

# Run development server (default port: 5173)
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 4. Docker Setup
Ensure Docker Desktop is running. The backend will use Docker API to provision database containers.

### Quick Start
1. Navigate to `http://localhost:5173` in your browser
2. Sign up for a new account
3. Log in with your credentials
4. Click "Create Database" to provision a new database
5. Select database type and configuration
6. Access your database connection details from the dashboard
7. Use the provided credentials to connect externally (via DBeaver, psql, mysql client, etc.)

---

## 📁 Project Structure

```
DBrift-demo2/
├── backend/                          # Spring Boot Application
│   ├── src/main/java/org/utej/backend/
│   │   ├── BackendApplication.java           # Main Spring Boot entry point
│   │   ├── User.java                         # User entity model
│   │   ├── UserService.java                  # User business logic
│   │   ├── UserController.java               # User REST endpoints
│   │   ├── UserRepository.java               # User data access layer
│   │   ├── Database.java                     # Database entity model
│   │   ├── DatabaseService.java              # Database provisioning logic
│   │   ├── DatabaseController.java           # Database REST endpoints
│   │   ├── DatabaseRepository.java           # Database data access layer
│   │   ├── CreateDatabaseRequest.java        # DTO for database creation
│   │   ├── LoginRequest.java                 # DTO for authentication
│   │   ├── GlobalPorts.java                  # Port management system
│   │   └── GlobalPorts.java                  # Port allocation logic
│   ├── src/main/resources/
│   │   ├── application.properties            # Spring Boot configuration
│   │   └── infra/scripts/postgres/           # Database setup scripts
│   ├── pom.xml                       # Maven dependencies
│   └── mvnw                          # Maven wrapper
│
├── Frontend/                         # React Application
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   ├── DatabaseGrid.jsx
│   │   │   ├── CreateDatabasePanel.jsx
│   │   │   ├── CredentialsDisplay.jsx
│   │   │   └── TopNav.jsx
│   │   ├── pages/                    # Page components
│   │   │   ├── AuthPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── LandingPage.jsx
│   │   ├── context/                  # React Context (state management)
│   │   │   └── AuthContext.jsx
│   │   ├── services/                 # API service layer
│   │   │   └── api.js
│   │   ├── styles/                   # CSS stylesheets
│   │   ├── App.jsx                   # Root component
│   │   └── main.jsx                  # Vite entry point
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js                # Vite configuration
│   └── index.html                    # HTML entry point
│
├── run.sh                            # Start both backend and frontend
├── close.sh                          # Stop services
└── README.md                         # This file
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}
```

#### Login User
```
POST /api/users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}
```

### Database Endpoints

#### Create Database
```
POST /api/databases/create
Content-Type: application/json
Authorization: Bearer <token>

{
  "databaseType": "postgres",
  "version": "15",
  "userId": "<user_id>"
}
```

#### Get User Databases
```
GET /api/databases/<userId>
Authorization: Bearer <token>
```

#### Delete Database
```
DELETE /api/databases/<databaseId>
Authorization: Bearer <token>
```

For detailed API documentation, see [API_DOCUMENTATION.md](Frontend/API_DOCUMENTATION.md)

---

## 🐳 Docker Integration

### How It Works
1. **Database Request**: User submits database creation request via frontend
2. **Backend Processing**: Spring Boot service receives request
3. **Port Allocation**: System assigns available port from pool
4. **Container Launch**: Docker API creates new container with:
   - Selected database image (PostgreSQL, MySQL, etc.)
   - Assigned port mapping
   - Auto-generated credentials
   - Persistent volume (if configured)
5. **Metadata Storage**: Database connection info stored in application database
6. **Frontend Display**: User sees credentials and connection details

### Container Lifecycle
- **Create**: Automated on database provisioning request
- **Run**: Continuous execution until deletion
- **Delete**: Safe cleanup with container stop and removal
- **Cleanup**: Automatic port deallocation and metadata removal

---

## 🛠️ Development

### Backend Development
```bash
cd backend

# Build without running
mvn clean package

# Run tests
mvn test

# Run with debug mode
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"
```

### Frontend Development
```bash
cd Frontend

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Useful Docker Commands
```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs for a database container
docker logs <container_id>

# Stop all containers
docker stop $(docker ps -q)

# Remove all containers
docker rm $(docker ps -aq)
```

---

## 📊 Key Design Patterns

### Backend
- **Service Layer Pattern**: Business logic separated from controllers
- **Repository Pattern**: Data access abstraction
- **DTO (Data Transfer Object)**: Request/response objects for clean API contracts
- **Dependency Injection**: Spring IoC container for loose coupling

### Frontend
- **Component-Based Architecture**: Reusable UI components
- **Context API**: Global state management for authentication
- **Service Layer**: Centralized API communication
- **Responsive Design**: Mobile-friendly UI

### Infrastructure
- **Container Isolation**: Each database in separate, independent container
- **Port Namespacing**: Dynamic port allocation prevents conflicts
- **Credential Generation**: Automatic, secure credential creation

---

## 🔒 Security Features

- **User Authentication**: Secure login with credential validation
- **Password Security**: Encrypted password storage (Spring Security)
- **Container Isolation**: Each database runs in isolated container
- **Port Isolation**: Unique port assignment per database
- **Credential Management**: Auto-generated, unique credentials per database
- **Resource Access Control**: Users can only access their own databases

---

## 🐛 Troubleshooting

### Backend Won't Start
- Ensure Java 11+ is installed: `java -version`
- Check if port 8080 is available
- Verify Maven is installed: `mvn -version`
- Check logs for database connection errors

### Frontend Won't Start
- Ensure Node.js is installed: `node --version`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check if port 5173 is available

### Docker Issues
- Ensure Docker Desktop is running
- Check Docker daemon: `docker ps`
- Verify Docker API is accessible

### Database Container Won't Start
- Check Docker logs: `docker logs <container_id>`
- Ensure required Docker images are pulled
- Verify port isn't already in use: `netstat -an | grep 5432` (example)

---

## 📚 Additional Resources

- [Frontend README](Frontend/README.md)
- [API Quick Reference](Frontend/API_QUICK_REFERENCE.md)
- [Backend Implementation Guide](Frontend/BACKEND_IMPLEMENTATION_GUIDE.md)
- [UI Guide](Frontend/UI_GUIDE.md)

---

## 🎓 Learning Outcomes

This project demonstrates:
- **Full-Stack Development**: Complete application from frontend to backend
- **Docker Containerization**: Practical container orchestration
- **Microservices Concepts**: Isolated database instances as "services"
- **REST API Design**: Clean, RESTful backend API
- **Frontend State Management**: React Context for authentication
- **DevOps Fundamentals**: Infrastructure automation and container lifecycle
- **User Authentication**: Secure login and authorization
- **Database Integration**: ORM and persistent data storage

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is provided for educational and demonstration purposes.

---

## 📞 Support

For issues, questions, or suggestions:
- Check existing issues and documentation
- Review the troubleshooting section above
- Examine API documentation for endpoint details
- Check Docker and Java logs for detailed error information

---

## 🎉 Acknowledgments

Built as a demonstration of modern full-stack development practices combining:
- Spring Boot for robust backend services
- React for responsive frontend UI
- Docker for scalable infrastructure
- Cloud-ready architecture for production deployment

**Happy database provisioning! 🚀**
