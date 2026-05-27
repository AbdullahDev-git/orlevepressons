# QUICK START GUIDE - ORLEV Press-Ons

## 🚀 Starting the Development Server

```bash
cd "c:\Users\dell\OneDrive - Punjab Group of Colleges\Desktop\orlevepressons"
npm run dev
```

Opens at: **http://localhost:3000**

---

## 👥 TEST ACCOUNTS

### Admin Account
- **URL**: http://localhost:3000/admin/login
- **Username**: `admin`
- **Password**: `orlev123`
- **Access**: Dashboard, Orders, Products, Analytics

### Customer Account
- **No login required** for customer
- **Browse**: http://localhost:3000
- **Shop**: /shop
- **Checkout**: /checkout

---

## 📝 TESTING CHECKLIST

### Test 1: Place an Order
```
1. Go to http://localhost:3000
2. Click "Shop Now" button
3. Select any product (click on a product card)
4. Customize: Select Size (XS-XL) and Color
5. Click "Add to Cart"
6. Go to /cart (click cart icon in navbar)
7. Review items and click "Proceed to Checkout"
8. Fill shipping form:
   - Full Name: Test User
   - Email: test@example.com
   - Phone: +92 300 1234567
   - Address: 123 Main Street
   - City: Karachi
   - Postal Code: 75500
   - Country: Pakistan
9. Click "Save Shipping Details"
10. Bank details appear below
11. Upload any image as payment proof
12. Click "Upload Screenshot"
13. See success page with Order ID
14. Note the Order ID (e.g., ORD1716316800000)
```

### Test 2: View Order in Admin Dashboard
```
1. Go to http://localhost:3000/admin/login
2. Login: admin / orlev123
3. You should see dashboard with stats
4. Click "Orders" in sidebar (or visit /admin/orders)
5. You should see the order you just created
   - Order ID: ORD1716316800000
   - Customer: Test User
   - Amount: $145.99
   - Status: pending
   - Payment Status: awaiting-screenshot
6. Try updating status dropdown to "processing"
7. Try updating payment status to "verified"
8. Go back to dashboard - stats should update
```

### Test 3: Manage Products (Admin)
```
1. In admin dashboard, click "Products" in sidebar
2. Click "+ Add Product" button
3. Fill form:
   - Product Name: Test Nails
   - Price: 59.99
   - Collection: Premium
   - In Stock: ✓ (checked)
   - Description: Beautiful test product
4. Click "Add Product"
5. See product added to grid
6. Click "Edit" to modify
7. Click "Delete" to remove
8. Check inventory summary at bottom
```

### Test 4: Test Analytics
```
1. Click "Analytics" in admin sidebar
2. See charts and metrics
3. Should show:
   - Total orders
   - Revenue trends
   - Order status breakdown
   - Sales by collection
```

### Test 5: Test Website Features
```
Customer Pages to Test:
- [ ] Homepage (/): Scroll through all sections
- [ ] Shop (/shop): Use filters and sorting
- [ ] Product (/product/1): Check tabs, sizes, colors
- [ ] About (/about): Read heritage section
- [ ] Size Guide (/size-guide): View measurements
- [ ] FAQ (/faq): Test accordion expand/collapse
- [ ] Contact (/contact): Fill contact form
- [ ] Cart (/cart): Add/remove items, apply coupon

Coupons to Test:
- ORLEV10 (10% off)
- ORLEV20 (20% off)
```

### Test 6: Theme Toggle
```
1. Click moon/sun icon in top navbar
2. Entire site should switch between light/dark mode
3. Check that colors are readable in both modes
4. Theme preference should persist on refresh
```

---

## 📊 SAMPLE DATA

### Built-in Test Products:
1. **Matte Red Nails** - $49.99 - Premium Collection
2. **Glitter Gold Nails** - $59.99 - Luxury Collection
3. **Nude Classic** - $44.99 - Everyday Collection
4. **Maroon Velvet** - $54.99 - Premium Collection
5. And more...

### Built-in Test Orders (Admin Dashboard):
1. Order #ORD001 - Ahmed Hassan - $145.99 - Pending
2. Order #ORD002 - Fatima Khan - $89.50 - Processing
3. Order #ORD003 - Ali Ahmed - $234.75 - Shipped

---

## 🔧 USEFUL COMMANDS

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (ESLint)
npm run lint

# Format code (Prettier)
npm run format
```

---

## 📁 KEY FILES TO UNDERSTAND

### Order Integration (The Core Feature):
- `src/context/AdminContext.jsx` - Where orders are created
- `src/components/features/Checkout/PaymentScreenshot.jsx` - Calls createOrder
- `src/components/features/Checkout/CheckoutSection.jsx` - Order state flow
- `src/components/admin/AdminOrders.jsx` - Displays orders

### Admin Pages:
- `src/components/admin/AdminDashboard.jsx` - Stats and overview
- `src/components/admin/AdminOrders.jsx` - Order management
- `src/components/admin/AdminProducts.jsx` - Product management
- `src/components/admin/AdminAnalytics.jsx` - Analytics charts

### Website Pages:
- `src/pages/Home.jsx` - Homepage
- `src/pages/Shop.jsx` - Product listing
- `src/pages/ProductDetail.jsx` - Single product
- `src/pages/Checkout.jsx` - Checkout process
- `src/pages/Cart.jsx` - Shopping cart

---

## 🎨 STYLING NOTES

### Color Scheme:
- **Primary**: Accent Gold (#8B7D1D)
- **Text Light**: Gray-900
- **Text Dark**: White
- **Backgrounds**: White (light), Gray-950 (dark)
- **Borders**: Gray-200 (light), Gray-700 (dark)

### Responsive Breakpoints:
- **Mobile**: `sm:` (640px)
- **Tablet**: `md:` (768px)
- **Desktop**: `lg:` (1024px)
- **Large**: `xl:` (1280px)

### Tailwind Config:
- Located in `tailwind.config.js`
- Accent color: #8B7D1D
- Dark mode: Enabled (class strategy)

---

## 🐛 TROUBLESHOOTING

### Page Shows Blank/White
```
Solution: Check browser console (F12) for errors
- Clear cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check that all imports are correct
```

### Images Not Loading
```
Solution: Image URLs are placeholders (via.placeholder.com)
To fix: Replace with real product images in mockProducts.js
```

### Form Not Submitting
```
Solution: Check form validation
- All fields must be filled
- Email must be valid format
- Check browser console for errors
```

### Orders Not Appearing in Admin
```
Solution: Orders stored in memory only
- Refresh will clear orders (this is by design for demo)
- To persist: Set up backend database
- Check that you're logged in as admin
```

### Dark Mode Not Working
```
Solution: Theme toggle issue
- Check that ThemeContext is imported
- Verify Tailwind dark mode in config
- Check localStorage for theme preference
```

---

## 📱 RESPONSIVE TESTING

### Breakpoints to Test:
- **Mobile (320px)**: iPhone SE, 6, 7, 8
- **Tablet (768px)**: iPad, Android tablets
- **Desktop (1024px+)**: Laptops, desktops

### Test in Chrome DevTools:
1. Press F12 to open DevTools
2. Click device toggle (Ctrl+Shift+M)
3. Select device or custom size
4. Test all pages

---

## 🔐 SECURITY NOTES (DEMO ONLY)

⚠️ **This is a demonstration build - NOT production ready**

Security improvements needed:
- [ ] Replace mock authentication with real JWT
- [ ] Validate all form inputs on backend
- [ ] Use HTTPS for all connections
- [ ] Protect admin routes with proper auth
- [ ] Don't store payment screenshots in URL
- [ ] Add rate limiting to API endpoints
- [ ] Sanitize user inputs to prevent XSS
- [ ] Use environment variables for secrets

---

## 📚 DOCUMENTATION FILES

Created documentation files in project root:

1. **PROJECT_SUMMARY.md**
   - Complete project overview
   - File structure
   - Database schema
   - All routes and features

2. **ORDER_FLOW_EXPLAINED.md**
   - Detailed order process
   - Data flow diagrams
   - Code examples
   - Integration points

3. **STYLING_FIXES_SUMMARY.md**
   - UI improvements applied
   - Styling standards
   - Color palette
   - Responsive design notes

---

## ✅ WHAT'S WORKING

✅ **Customer Features**
- Browse products with filters
- Add/remove from cart
- Apply discount coupons
- Checkout with shipping form
- Upload payment proof
- Receive order confirmation

✅ **Admin Features**
- Secure login (admin/orlev123)
- View orders dashboard
- Update order status
- Verify payments
- Manage products (add/edit/delete)
- View analytics
- Real-time stats updates

✅ **Technical**
- React 18 with Vite
- Tailwind CSS with dark mode
- Context API state management
- Responsive design
- Form validation
- Error handling
- Animations

---

## ⚠️ KNOWN LIMITATIONS

❌ **Not Persistent**
- Orders cleared on page refresh
- No user accounts
- No email notifications
- No payment processing

❌ **Mock Data**
- Products are hardcoded
- No image uploads
- No inventory tracking
- No real payment

❌ **Not Production Ready**
- No backend database
- No API authentication
- No error logging
- No monitoring

---

## 🚀 NEXT STEPS

### To Deploy:
1. Set up Node.js backend (Express/NestJS)
2. Set up MongoDB database
3. Implement API endpoints
4. Add JWT authentication
5. Connect payment gateway (Stripe/PayPal)
6. Deploy to Vercel/Netlify (frontend)
7. Deploy to Heroku/AWS (backend)

### To Enhance:
1. Add user accounts and login
2. Implement real payment processing
3. Add email notifications
4. Create inventory management
5. Add product reviews
6. Implement wishlist
7. Add order tracking
8. Create mobile app

---

## 📞 SUPPORT

For issues or questions:
1. Check browser console (F12)
2. Review documentation files
3. Check component imports
4. Verify Tailwind config

---

**Happy Testing! 🎉**

Everything is ready to use. Start the dev server and explore the app!
