const express = require("express");
const { askQuestion, getAllChats, deleteAllChats } = require("../controllers/chatController");

const router = express.Router();

router.post("/chat", askQuestion);
router.get("/chats", getAllChats);
router.delete("/chats", deleteAllChats);

module.exports = router;