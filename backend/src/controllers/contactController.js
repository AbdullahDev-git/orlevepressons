const prisma = require('../prisma');

const submitContact = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const contact = await prisma.contactMessage.create({
      data: { fullName, email, subject, message },
    });

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isRead: true },
    });

    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contactMessage.delete({
      where: { id: parseInt(id) },
    });

    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact, getAllMessages, markAsRead, deleteMessage };
