const pool = require("../config/db");

// Table is already created in the database with foreign key constraint
// No need to create it again, but keeping this for reference
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS chatmessage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
      FOREIGN KEY (user_id)
      REFERENCES users_data(id)
      ON DELETE CASCADE
  )
`;

// Initialize table (optional - table already exists)
const initializeChatTable = async () => {
  try {
    const [result] = await pool.query(createTableQuery);
    console.log("Table 'chatmessage' created or already exists");
    return result;
  } catch (error) {
    console.error("Error creating chatmessage table:", error.message);
    throw error;
  }
};

// CREATE - Insert new chat message
const createMessage = async (messageData) => {
  try {
    const { user_id, message } = messageData;
    const query = "INSERT INTO chatmessage (user_id, message) VALUES (?, ?)";
    const [result] = await pool.query(query, [user_id, message]);
    return result;
  } catch (error) {
    throw error;
  }
};

// READ - Get all messages with user details
const getAllMessages = async () => {
  try {
    const query = `
      SELECT 
        chatmessage.id, 
        chatmessage.user_id, 
        chatmessage.message, 
        chatmessage.created_at,
        users_data.name as user_name,
        users_data.email as user_email
      FROM chatmessage
      INNER JOIN users_data ON chatmessage.user_id = users_data.id
      ORDER BY chatmessage.created_at ASC
    `;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

// READ - Get messages by user ID
const getMessagesByUserId = async (user_id) => {
  try {
    const query = `
      SELECT 
        chatmessage.id, 
        chatmessage.user_id, 
        chatmessage.message, 
        chatmessage.created_at,
        users_data.name as user_name,
        users_data.email as user_email
      FROM chatmessage
      INNER JOIN users_data ON chatmessage.user_id = users_data.id
      WHERE chatmessage.user_id = ?
      ORDER BY chatmessage.created_at DESC
    `;
    const [rows] = await pool.query(query, [user_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// READ - Get single message by ID
const getMessageById = async (id) => {
  try {
    const query = `
      SELECT 
        chatmessage.id, 
        chatmessage.user_id, 
        chatmessage.message, 
        chatmessage.created_at,
        users_data.name as user_name,
        users_data.email as user_email
      FROM chatmessage
      INNER JOIN users_data ON chatmessage.user_id = users_data.id
      WHERE chatmessage.id = ?
    `;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// UPDATE - Update message by ID
const updateMessage = async (id, messageData) => {
  try {
    const { message } = messageData;
    const query = "UPDATE chatmessage SET message = ? WHERE id = ?";
    const [result] = await pool.query(query, [message, id]);
    return result;
  } catch (error) {
    throw error;
  }
};

// DELETE - Delete message by ID
const deleteMessage = async (id) => {
  try {
    const query = "DELETE FROM chatmessage WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

// DELETE - Delete all messages by user ID
const deleteMessagesByUserId = async (user_id) => {
  try {
    const query = "DELETE FROM chatmessage WHERE user_id = ?";
    const [result] = await pool.query(query, [user_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  initializeChatTable,
  createMessage,
  getAllMessages,
  getMessagesByUserId,
  getMessageById,
  updateMessage,
  deleteMessage,
  deleteMessagesByUserId,
};
