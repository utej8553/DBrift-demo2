// Authentication API Service
export const authService = {
  // Create a new user
  async signup(username, email, password) {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        creationDate: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    return response.json();
  },

  // Login user
  async login(email, password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const user = await response.json();
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout user
  logout() {
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('user');
  },
};

// Database API Service
export const databaseService = {
  // Create a new database
  async createDatabase(userId, dbName, dbType, dbVersion, description) {
    const response = await fetch('/api/db/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        dbName,
        dbType,
        dbVersion,
        description,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create database');
    }

    return response.json();
  },

  // Get user's databases
  async getUserDatabases(userId) {
    const response = await fetch(`/api/db/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch databases');
    }

    return response.json();
  },

  // Delete a database
  async deleteDatabase(dbId) {
    const response = await fetch(`/api/db/${dbId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete database');
    }

    return response.json();
  },

  // Generate connection string
  generateConnectionString(credentials) {
    const { username, password, port, dbName } = credentials;
    const host = window.location.hostname || 'localhost';
    return `postgresql://${username}:${password}@${host}:${port}/${dbName}`;
  },
};
