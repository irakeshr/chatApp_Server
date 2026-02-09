const express = require("express");
const {
    addUser,
    getUsers,
    getUser,
    updateUserById,
    deleteUserById,
} = require("../controllers/userController");

const router = express.Router();

// CREATE - Add new user
router.post("/add", addUser);

// READ - Get all users
router.get("/", getUsers);

// READ - Get single user by ID
router.get("/:id", getUser);

// UPDATE - Update user by ID
router.put("/:id", updateUserById);

// DELETE - Delete user by ID
router.delete("/:id", deleteUserById);

module.exports = router;
