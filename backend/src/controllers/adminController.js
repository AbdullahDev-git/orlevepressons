const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');
const { generateAdminToken } = require('../middleware/auth');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateAdminToken(admin.id);

    res.json({
      success: true,
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();

    const distinctCustomers = await prisma.order.groupBy({
      by: ['customerId'],
      where: { customerId: { not: null } },
    });
    const totalCustomersFromOrders = distinctCustomers.length;

    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const processingOrders = orders.filter((o) => o.status === 'processing').length;
    const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
    const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ordersToday = orders.filter((o) => new Date(o.createdAt) >= today).length;

    const lowStockItems = await prisma.product.findMany({
      where: { stock: { lt: 5 } },
      select: { id: true, name: true, stock: true, slug: true },
      orderBy: { stock: 'asc' },
    });

    const recentOrders = orders.slice(0, 5).map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName || 'Guest',
      total: o.total,
      status: o.status,
      items: o.items.length,
      date: o.createdAt,
    }));

    res.json({
      success: true,
      data: {
        stats: {
          totalOrders,
          totalRevenue,
          totalCustomers: totalCustomersFromOrders,
          pendingOrders,
          processingOrders,
          shippedOrders,
          ordersToday,
        },
        lowStockItems,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDashboardStatsV2 = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();

    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
    });

    const distinctCustomers = await prisma.order.groupBy({
      by: ['customerId'],
      where: { customerId: { not: null } },
    });

    const lowStockItems = await prisma.product.findMany({
      where: { stock: { lt: 5 } },
      select: { id: true, name: true, stock: true, slug: true },
      orderBy: { stock: 'asc' },
    });

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalCustomers: distinctCustomers.length,
        lowStockItems,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
      },
    });

    const totalOrders = orders.length;

    const distinctCustomers = await prisma.order.groupBy({
      by: ['customerId'],
      where: { customerId: { not: null } },
    });
    const totalCustomers = distinctCustomers.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const ordersByStatus = {
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    // Revenue by last 6 months
    const revenueByLast6Months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const monthOrders = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= month && d < monthEnd;
      });
      const revenue = monthOrders.reduce((sum, o) => sum + o.total, 0);
      revenueByLast6Months.push({
        month: month.toLocaleString('default', { month: 'short' }),
        revenue,
        orders: monthOrders.length,
      });
    }

    // Top 5 products by quantity sold
    const productSales = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        const productId = item.productId;
        if (!productSales[productId]) {
          productSales[productId] = { id: productId, name: item.product?.name || `Product #${productId}`, quantity: 0, revenue: 0 };
        }
        productSales[productId].quantity += item.quantity;
        productSales[productId].revenue += item.price * item.quantity;
      });
    });
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        averageOrderValue,
        ordersByStatus,
        revenueByLast6Months,
        topProducts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = messages.filter(m => !m.isRead).length;

    res.json({
      success: true,
      data: {
        messages,
        unreadCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginAdmin, getDashboardStats, getDashboardStatsV2, getAnalytics, getContactMessages };
