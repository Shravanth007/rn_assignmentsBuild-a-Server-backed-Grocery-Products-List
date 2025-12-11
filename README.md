# 🛒 Fresh Market - Modern Grocery Marketplace

> A full-stack mobile application for grocery delivery with server-backed product management, real-time inventory tracking, category browsing, and smart shopping cart functionality.

**Mobile Development & Backend Integration Project**

---

## 🌟 Overview

Fresh Market is a feature-rich grocery delivery platform showcasing:
- RESTful API development with Node.js & Express
- MongoDB database design and management
- React Native state management using Redux Toolkit
- Modern mobile UI/UX with NativeWind (Tailwind CSS)
- Full-stack integration and navigation patterns

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Grid** - Browse products in an easy-to-scan 2-column grid layout
- **Category Navigation** - Explore products by categories (Fruits, Vegetables, Dairy, etc.)
- **Smart Search** - Filter categories and products by name
- **Smart Cart** - Add/remove items, update quantities, auto-calculated totals
- **Location Picker** - Set delivery address with integrated location services
- **Express Delivery** - 10-minute delivery promise with free shipping over ₹500

### 🎨 User Interface
- **Modern Design** - Gradient backgrounds, smooth transitions, emerald green theme
- **Category Cards** - Colorful category browsing with product counts
- **Product Cards** - High-quality images, stock indicators, pricing displays
- **Empty States** - Friendly messaging when no data is available
- **Loading States** - Branded loading indicators
- **Error Handling** - User-friendly error messages with retry options

### 🔧 Technical Features
- **Real-time Inventory** - Live stock tracking with low-stock warnings
- **Category Filtering** - Filter products by category with dynamic routing
- **Search Functionality** - Search products and categories by name
- **Cart Persistence** - AsyncStorage integration for cart data
- **API Integration** - RESTful endpoints for products and categories
- **Error Boundaries** - Comprehensive error handling throughout the app

---

## 🏗️ Tech Stack

**Frontend**
- React Native (Expo SDK 54)
- TypeScript
- NativeWind (Tailwind CSS v4)
- Redux Toolkit (State Management)
- Expo Router (File-based Navigation)
- AsyncStorage (Local Data Persistence)

**Backend**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- CORS enabled
- RESTful API design

---

## 📋 Requirements

**Software Needed:**
- Node.js v16+ 
- MongoDB (Local or Atlas Cloud)
- Expo CLI
- Mobile device with Expo Go app OR emulator

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 2. Setup Database

**MongoDB Atlas (Recommended):**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and get connection string
3. Update `server/.env`:
   ```
   MONGO_URL=your_connection_string_here
   ```

**OR Local MongoDB:**
```bash
# Start MongoDB service
net start MongoDB  # Windows
# Update server/.env with: mongodb://localhost:27017/farm_fresh
```

### 3. Seed Database

```bash
cd server
npm run seed  # Creates 8 sample products
```

### 4. Configure Network

Update your computer's IP in `utils/api.js`:
```javascript
return 'http://YOUR_IP:3000';  // e.g., 192.168.1.105:3000
```

Find your IP:
```bash
ipconfig  # Windows - look for IPv4 Address
```

### 5. Start the App

**Terminal 1 - Backend:**
```bash
cd server
npm start  # Runs on port 3000
```

**Terminal 2 - Frontend:**
```bash
npm start  # Opens Expo DevTools
```

Then scan QR code with Expo Go app or press 'a' for Android emulator.

---

## 📱 App Structure

### Testing with cURL (PowerShell)

```powershell
# Fetch all products
Invoke-RestMethod -Uri "http://localhost:3000/products" -Method GET

# Get single product (replace with actual ID)
Invoke-RestMethod -Uri "http://localhost:3000/products/<product_id>" -Method GET

# Search products
Invoke-RestMethod -Uri "http://localhost:3000/products?q=apple" -Method GET

# Filter by category
Invoke-RestMethod -Uri "http://localhost:3000/products?category=Fruits" -Method GET

# Create new product
$body = @{
    name = "Fresh Mango"
    price = 80
    category = "Fruits"
    stock = 50
    imageUrl = "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400"
    description = "Sweet Alphonso mangoes"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/products" -Method POST -Body $body -ContentType "application/json"
```

### Testing with Postman

Import this collection or manually test:

**Base URL:** `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Retrieve all products |
| GET | `/products?q=search` | Search products |
| GET | `/products?category=Fruits` | Filter by category |
| GET | `/products/:id` | Get single product |
| POST | `/products` | Create new product |

---

## 📱 App Structure

```
app/
├── (auth)/
│   ├── login.tsx              # User login
│   └── signup.tsx             # User registration
├── (main)/
│   ├── home.tsx              # Product grid & browsing
│   ├── categories.tsx        # Category browsing (NEW)
│   ├── cart.tsx              # Shopping cart
│   ├── orders.tsx            # Order history
│   └── profile.tsx           # User profile
├── category/
│   └── [name].tsx            # Dynamic category filter (NEW)
├── index.tsx                 # Welcome screen
└── _layout.tsx               # App navigation

components/
├── CategoryCard.tsx          # Reusable category card (NEW)
├── LocationPicker.tsx        # Location selection
└── CartLoader.tsx            # Loading skeleton

server/
├── models/
│   ├── product.js           # Product schema
│   └── user.model.js        # User schema
├── routes/
│   ├── product.routes.js    # Product API endpoints
│   └── auth.routes.js       # Auth endpoints
├── index.js                 # Express server
└── seed.js                  # Database seeder

store/
├── cartSlice.ts             # Cart state (Redux)
└── store.ts                 # Redux store config

utils/
├── api.js                   # API client
└── constants.ts             # Shared constants (NEW)
```

---

## 🎯 Key Features Explained

### 1. Product Browsing (Home Screen)
- **2-column grid layout** for better product visibility
- Product cards show: image, name, price, category, stock
- Low stock badges for items under 20 units
- Add to cart with single tap
- Loading and error states with retry

### 2. Category Navigation (NEW)
- **Browse Categories page** with search functionality
- 6 categories: Fruits, Vegetables, Dairy, Electronics, Clothes, Snacks
- Each card shows category icon and product count
- Tap any category to see filtered products
- Dynamic routing to `/category/[name]`

### 3. Shopping Cart
- Add/remove items
- Increment/decrement quantities
- Auto-calculated subtotal, delivery fee, and total
- Free delivery over ₹500
- Empty cart state
- Persistent storage with AsyncStorage

### 4. Search & Filter
- Search categories by name
- Filter products by category
- Query parameters: `?q=search&category=filter`

---

## 🧪 Testing the API

### Issue: "Cannot connect to remote server"
**Symptoms:** App shows network errors, products don't load

**Solutions:**
1. Verify backend is running: Check terminal for "Server is running on port 3000"
2. Check IP address in `utils/api.js` matches your machine
3. Ensure mobile device and computer are on the **same WiFi network**
4. For Android emulator, use `10.0.2.2:3000` instead of localhost
5. For iOS simulator, `localhost:3000` works
6. Temporarily disable firewall/antivirus and test

### Issue: "MongoDB connection failed"
**Symptoms:** Backend crashes with connection errors

**Solutions:**
1. **MongoDB Atlas:** 
   - Verify connection string in `.env`
   - Check network access whitelist (allow 0.0.0.0/0 for testing)
   - Confirm credentials are correct
2. **Local MongoDB:**
   - Check if service is running: `net start MongoDB`
   - Verify port 27017 is not blocked
   - Try `mongodb://127.0.0.1:27017/farm_fresh`

### Issue: "No products displaying"
**Symptoms:** Empty home screen despite successful API connection

**Solutions:**
1. Seed the database: `cd server && npm run seed`
2. Test API directly: `curl http://localhost:3000/products`
3. Check browser console/Expo logs for errors
4. Verify MongoDB connection in backend logs

### Issue: "Cart not updating"
**Symptoms:** Add to cart doesn't work, quantities don't change

**Solutions:**
1. Check Redux DevTools (if configured)
2. Verify AsyncStorage permissions
3. Clear app data and restart
4. Check console for Redux action logs

### Issue: "Images not loading"
**Symptoms:** Broken image icons in product cards

**Solutions:**
1. Check internet connection
2. Verify imageUrl fields in database
3. Unsplash images may require network access
4. Fallback images are configured for failures

---

## 📊 Project Requirements Fulfillment

### Assignment Objectives

#### Backend Requirements (100% Complete)
- ✅ Node.js + Express server implementation
- ✅ Mongoose Product model with required fields
- ✅ RESTful routes:
  - ✅ `GET /products` - List all products
  - ✅ `GET /products/:id` - Single product retrieval
  - ✅ `POST /products` - Product creation
- ✅ Database seeding with 8+ products
- ✅ CORS configuration for cross-origin requests

#### Frontend Requirements (100% Complete)
- ✅ Removed placeholder/mock data
- ✅ Fetch data from backend API
- ✅ Render products using FlatList
- ✅ Loading indicator implementation
- ✅ Error UI with user feedback
- ✅ Cart functionality with state management

#### Documentation (100% Complete)
- ✅ Comprehensive README
- ✅ Setup instructions
- ✅ API testing examples
- ✅ Troubleshooting guide
- ✅ Architecture documentation

#### Bonus Features (Implemented)
- ✅ Query parameters: `?q=search&category=filter`
- ✅ Search functionality
- ✅ Category filtering
- ✅ Complete UI/UX redesign
- ✅ Enhanced cart management (CRUD operations)
- ✅ Persistent storage (AsyncStorage)
- ✅ Free delivery threshold logic
- ✅ Low stock indicators

---

## 🚀 Future Enhancements

### Planned Features
- [ ] User authentication flow completion
- [ ] Order placement and tracking
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Push notifications for orders
- [ ] Admin dashboard for inventory management
- [ ] Advanced search with filters (price range, ratings)
- [ ] Product recommendations
- [ ] Multi-language support

### Performance Optimizations
- [ ] Image lazy loading and caching
- [ ] API response caching
- [ ] Pagination for product lists
- [ ] Debounced search queries
- [ ] Optimistic UI updates

### Code Quality
- [ ] Unit tests (Jest)
- [ ] E2E tests (Detox)
- [ ] API integration tests
- [ ] Continuous Integration setup
- [ ] Code coverage reports

---

## 📚 Learning Outcomes

This project demonstrates proficiency in:

1. **Full-Stack Development**
   - Frontend-backend integration
   - RESTful API design
   - Database modeling

2. **React Native/Expo**
   - File-based routing (Expo Router)
   - State management (Redux Toolkit)
   - Native features (location, storage)

3. **Backend Development**
   - Express.js middleware
   - MongoDB operations
   - API security practices

4. **Software Engineering**
   - Git version control
   - Documentation
   - Error handling
   - Code organization

---

## 🤝 Contributing

This is an academic project, but suggestions and improvements are welcome!

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes as part of a mobile development course.

---

## 👨‍💻 Author

**Developed by:** [Your Name]  
**Course:** Full-Stack Mobile Development  
**Institution:** [Your Institution]  
**Date:** December 2025

---

## 🙏 Acknowledgments

- Expo team for excellent React Native framework
- MongoDB for flexible database solution
- Unsplash for product images
- Course instructors and peers for guidance

---

## 📞 Support

For questions or issues:
- 📧 Email: [your-email@example.com]
- 💬 GitHub Issues: [repository-issues-url]

---

**Happy Coding! 🎉**

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Setting up NativeWind

NativeWind allows you to use Tailwind CSS in React Native. Follow these steps to set it up:

### 1. Install dependencies

```bash
npm install nativewind
npm install --save-dev tailwindcss
```

### 2. Initialize Tailwind CSS

```bash
npx tailwindcss init
```

### 3. Configure tailwind.config.js

Update your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Configure babel.config.js

Add the NativeWind Babel plugin to your `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### 5. Create global.css

Create a `global.css` file in the root directory:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Import global styles

Import the global styles in your root layout file (`app/_layout.tsx` or `app/_layout.js`):

```tsx
import "../global.css";
```

### 7. Add TypeScript types (Optional)

If using TypeScript, create or update `nativewind-env.d.ts`:

```typescript
/// <reference types="nativewind/types" />
```

### 8. Usage

Now you can use Tailwind classes with the `className` prop:

```tsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">
        Hello NativeWind!
      </Text>
    </View>
  );
}
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
