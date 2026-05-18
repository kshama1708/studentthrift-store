import { Conversation, Message } from "../models/Chat.js";

// GET /api/chat/conversations  — all conversations for current user
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "name email")
      .populate("product", "title emoji price")
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/chat/:conversationId/messages
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found." });
    }

    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { conversation: conversationId, sender: { $ne: req.user._id }, read: false },
      { read: true }
    );

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/chat/send  — send a message (creates conversation if needed)
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, productId, text } = req.body;

    if (!recipientId || !text) {
      return res.status(400).json({ success: false, message: "Recipient and text are required." });
    }

    // Find existing conversation between same two users about same product
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] },
      product: productId || null,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, recipientId],
        product: productId || null,
      });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      text,
    });

    // Update last message on conversation
    conversation.lastMessage = text;
    await conversation.save();

    await message.populate("sender", "name");

    res.status(201).json({ success: true, message, conversationId: conversation._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
