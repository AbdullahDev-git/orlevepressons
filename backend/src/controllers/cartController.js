const prisma = require('../prisma');

// Get cart items
const getCart = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { customerId: req.customer.id },
      include: { product: true },
    });

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    res.json({
      success: true,
      data: {
        items: cartItems,
        totalAmount,
        itemCount: cartItems.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        customerId: req.customer.id,
        productId: parseInt(productId),
        size,
      },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      });
      return res.json({ success: true, data: updatedItem });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        sessionId: `session_${req.customer.id}`,
        customerId: req.customer.id,
        productId: parseInt(productId),
        quantity,
        size,
      },
      include: { product: true },
    });

    res.status(201).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({
        where: {
          customerId: req.customer.id,
          productId: parseInt(productId),
        },
      });
      return res.json({ success: true, message: 'Item removed from cart' });
    }

    const cartItem = await prisma.cartItem.updateMany({
      where: {
        customerId: req.customer.id,
        productId: parseInt(productId),
      },
      data: { quantity },
    });

    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    await prisma.cartItem.deleteMany({
      where: {
        customerId: req.customer.id,
        productId: parseInt(productId),
      },
    });

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { customerId: req.customer.id },
    });
    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};