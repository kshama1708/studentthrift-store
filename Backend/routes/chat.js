import express from "express";
import { getConversations, getMessages, sendMessage } from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); // all chat routes require auth

router.get("/conversations", getConversations);
router.get("/:conversationId/messages", getMessages);
router.post("/send", sendMessage);

export default router;
