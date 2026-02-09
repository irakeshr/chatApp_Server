const {
  createMessage,
  getAllMessages,
  getMessagesByUserId,
  getMessageById,
  updateMessage,
  deleteMessage,
  deleteMessagesByUserId,
} = require("../models/chatMessage");

// CREATE - Add new message
const addMessage = async (req, res) => {
  try {
    const { user_id, message,user_name,created_at } = req.body;

    // Validation
    if (!user_id || !message) {
      return res.status(400).json({
        success: false,
        message: "User ID and message are required",
      });
    }

    const result = await createMessage({ user_id, message });

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: {
        id: result.insertId,
        user_id,
        message,
        user_name,
        created_at
      },
    });
  } catch (error) {
    console.error("Error creating message:", error.message);
    res.status(500).json({
      success: false,
      message:
        error.code === "ER_NO_REFERENCED_ROW_2" ?
          "User not found"
        : "Error creating message",
      error: error.message,
    });
  }
};

// READ - Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// READ - Get messages by user ID
const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await getMessagesByUserId(userId);

    res.status(200).json({
      success: true,
      message: "User messages retrieved successfully",
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching user messages:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user messages",
      error: error.message,
    });
  }
};

// READ - Get single message by ID
const getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await getMessageById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message retrieved successfully",
      data: message,
    });
  } catch (error) {
    console.error("Error fetching message:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching message",
      error: error.message,
    });
  }
};

// UPDATE - Update message by ID
const updateMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { message } = req.body;

    // Validation
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message content is required",
      });
    }

    const result = await updateMessage(id, { message });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: {
        id,
        message,
      },
    });
  } catch (error) {
    console.error("Error updating message:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating message",
      error: error.message,
    });
  }
};

// DELETE - Delete message by ID
const deleteMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteMessage(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting message",
      error: error.message,
    });
  }
};

// DELETE - Delete all messages by user ID
const deleteUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await deleteMessagesByUserId(userId);

    res.status(200).json({
      success: true,
      message: `Deleted ${result.affectedRows} message(s)`,
      count: result.affectedRows,
    });
  } catch (error) {
    console.error("Error deleting user messages:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting user messages",
      error: error.message,
    });
  }
};

module.exports = {
  addMessage,
  getMessages,
  getUserMessages,
  getMessage,
  updateMessageById,
  deleteMessageById,
  deleteUserMessages,
};
