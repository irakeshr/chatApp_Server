const express = require("express");
const {
  addMessage,
  getMessages,
  getUserMessages,
  getMessage,
  updateMessageById,
  deleteMessageById,
  deleteUserMessages,
} = require("../controllers/chatMessageController");

const router = express.Router();

// CREATE - Add new message
router.post("/add", addMessage);

// READ - Get all messages
router.get("/", getMessages);

// READ - Get all messages by user ID
router.get("/user/:userId", getUserMessages);

// READ - Get single message by ID
router.get("/:id", getMessage);

// UPDATE - Update message by ID
router.put("/:id", updateMessageById);

// DELETE - Delete message by ID
router.delete("/:id", deleteMessageById);

// DELETE - Delete all messages by user ID
router.delete("/user/:userId", deleteUserMessages);

module.exports = router;
