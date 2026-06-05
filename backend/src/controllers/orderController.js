const bcrypt = require('bcryptjs');
const prisma = require('../prisma');

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order (Admin only)
const getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get my orders (Customer)
const getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.customer.id },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create order (Customer)
const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress, paymentMethod, customerName, customerEmail, customerPhone, customerImage, paymentScreenshot } = req.body;

    const orderNumber = `ORD-${Date.now()}`;

    const orderData = {
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      total: parseFloat(total),
      status: 'pending',
      shippingAddress,
      paymentMethod,
      paymentScreenshot,
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
        })),
      },
    };

    // Find or create customer by email for unique customer tracking
    if (customerEmail) {
      let customer = await prisma.customer.findUnique({ where: { email: customerEmail } });
      if (!customer) {
        const placeholderHash = await bcrypt.hash(Math.random().toString(36), 10);
        customer = await prisma.customer.create({
          data: {
            email: customerEmail,
            password: placeholderHash,
            name: customerName || '',
          },
        });
      }
      orderData.customerId = customer.id;
    } else if (req.customer) {
      orderData.customerId = req.customer.id;
    }

    if (customerImage) {
      orderData.customerImage = customerImage;
    }

    const order = await prisma.order.create({
      data: orderData,
      include: {
        items: true,
      },
    });

    // Clear cart after order
    if (req.customer) {
      await prisma.cartItem.deleteMany({
        where: { customerId: req.customer.id },
      });
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
    });

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete order (Admin only)
const deleteOrder = async (req, res) => {
  try {
    await prisma.order.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  getMyOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};