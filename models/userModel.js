const pool = require("../config/db");

// Table creation query - Run this once to create the table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

// Initialize table
const initializeTable = async () => {
  try {
    const [result] = await pool.query(createTableQuery);
    console.log("Table 'users_data' created or already exists");
    return result;
  } catch (error) {
    console.error("Error creating table:", error.message);
    throw error;
  }
};

// CREATE - Insert new user
const createUser = async (userData) => {
  try {
    const { name, email, phone, password } = userData;
    const query = "INSERT INTO users_data (name, email, phone, password) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [name, email, phone, password]);
    return result;
  } catch (error) {
    throw error;
  }
};

// READ - Get all users
const getAllUsers = async () => {
  try {
    const query = "SELECT * FROM users_data ORDER BY created_at DESC";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

// READ - Get user by ID
const getUserById = async (id) => {
  try {
    const query = "SELECT * FROM users_data WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// UPDATE - Update user by ID
const updateUser = async (id, userData) => {
  try {
    const { name, email, phone, password } = userData;
    const query = "UPDATE users_data SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?";
    const [result] = await pool.query(query, [name, email, phone, password, id]);
    return result;
  } catch (error) {
    throw error;
  }
};

// DELETE - Delete user by ID
const deleteUser = async (id) => {
  try {
    const query = "DELETE FROM users_data WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  initializeTable,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
