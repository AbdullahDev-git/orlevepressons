const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get product by slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create product (Admin only)
const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      salePrice,
      stock,
      sizes,
      images,
      category,
      featured,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        stock: parseInt(stock),
        sizes: JSON.stringify(sizes || ["XS", "S", "M", "L", "XL"]),
        images: JSON.stringify(images || []),
        category,
        featured: featured || false,
      },
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product (Admin only)
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      salePrice,
      stock,
      sizes,
      images,
      category,
      featured,
    } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        slug,
        description,
        price: price ? parseFloat(price) : undefined,
        salePrice: salePrice ? parseFloat(salePrice) : null,
        stock: stock ? parseInt(stock) : undefined,
        sizes: sizes ? JSON.stringify(sizes) : undefined,
        images: images ? JSON.stringify(images) : undefined,
        category,
        featured,
      },
    });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product (Admin only)
const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
