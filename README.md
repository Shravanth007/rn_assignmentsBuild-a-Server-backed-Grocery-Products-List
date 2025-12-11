# Modern Grocery Marketplace

> A comprehensive full-stack mobile application for grocery delivery, featuring server-backed product management, real-time inventory, and seamless shopping cart experience.

**Built as part of Mobile Development & Backend Integration coursework**

---

## 🌟 Project Overview

Market is a feature-rich grocery delivery platform that demonstrates proficiency in:
- Building RESTful APIs with Node.js and Express
- Database design and management with MongoDB
- State management in React Native using Redux Toolkit
- Mobile UI/UX design with NativeWind (Tailwind CSS)
- Full-stack integration and deployment

---

## ✨ Key Features

### Customer Experience
- 🎨 **Modern UI Design** - Clean, intuitive interface with gradient backgrounds and smooth interactions
- 🛍️ **Product Browsing** - Grid layout with high-quality product images and detailed information
- 🛒 **Smart Cart** - Real-time quantity management, automatic price calculation, and free delivery threshold
- 📍 **Location Services** - Integrated location picker for accurate delivery addresses
- 🔐 **User Authentication** - Secure login/signup functionality with JWT
- ⚡ **Quick Delivery** - Promise of 10-minute express delivery

### Technical Features
- 📦 **Inventory Management** - Real-time stock tracking and low-stock indicators
- 🔍 **Search & Filter** - Query products by name or category
- 💾 **Persistent Cart** - AsyncStorage integration for cart persistence
- 🎯 **Error Handling** - Comprehensive error states with user-friendly retry options
- 📱 **Responsive Design** - Optimized for various screen sizes

---

## 🛠️ Technology Stack

### Mobile Frontend
- **Framework:** React Native (Expo SDK 54)
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS v4)
- **State Management:** Redux Toolkit
- **Navigation:** Expo Router (File-based routing)
- **Storage:** AsyncStorage

### Backend Server
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** CORS, bcryptjs for password hashing

---

## 📋 System Requirements

Before starting, ensure your development environment has:

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | 16.x or higher | JavaScript runtime |
| npm | 8.x or higher | Package manager |
| MongoDB | 6.x or Atlas | Database |
| Expo CLI | Latest | React Native tooling |
| Git | Latest | Version control |

**Mobile Testing Options:**
- Expo Go app (iOS/Android)
- Android Studio Emulator
- Xcode iOS Simulator (macOS only)

---

## 🚀 Installation Guide

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd Farm-Fresh-main
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### Step 3: Database Configuration

Choose your preferred MongoDB setup:

#### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account (M0 Sandbox cluster)
3. Create a new project and cluster
4. Navigate to: **Database → Connect → Connect your application**
5. Copy the connection string
6. Create/update `server/.env`:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/farm_fresh?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=your_secure_secret_key_here
```

#### Option B: Local MongoDB Installation

1. Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install following platform instructions
3. Start MongoDB service:

```bash
# Windows (PowerShell as Administrator)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

4. Update `server/.env`:

```env
MONGO_URL=mongodb://localhost:27017/farm_fresh
PORT=3000
JWT_SECRET=your_secure_secret_key_here
```

### Step 4: Seed Database

```bash
cd server
npm run seed
```

**Expected Output:**
```
✅ Connected to MongoDB — seeding...
🗑️  Cleared existing products
✅ Successfully seeded 8 products
📦 Products:
   - Red Apple (₹40)
   - Banana Bunch (₹30)
   - Spinach Pack (₹20)
   ...
```

### Step 5: Configure Network Settings

Update the API endpoint in `utils/api.js`:

```javascript
const getApiBaseUrl = () => {
    if (Platform.OS === 'web') {
        return 'http://localhost:3000';
    } else {
        // Replace with your machine's local IP
        return 'http://YOUR_IP_ADDRESS:3000';
    }
};
```

**Find your local IP:**
```bash
# Windows
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.105)

# macOS/Linux
ifconfig | grep "inet "
# or
ip addr show
```

---

## 🎮 Running the Application

### Starting the Backend Server

Open a terminal and run:

```bash
cd server
npm start
```

**Successful startup shows:**
```
Server is running on port 3000
Server accessible at:
  - http://localhost:3000
  - http://192.168.x.x:3000
Mongo connected
```

### Starting the Mobile App

Open a **second terminal** and run:

```bash
npm start
```

This launches Expo DevTools with several options:

- **Press `a`** - Open in Android emulator
- **Press `i`** - Open in iOS simulator (macOS only)
- **Press `w`** - Open in web browser
- **Scan QR code** - Open in Expo Go app on physical device

---

## 🧪 API Testing

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

## 📁 Project Architecture

```
Farm-Fresh-main/
│
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Authentication flow
│   │   ├── login.tsx            # Login screen
│   │   └── signup.tsx           # Signup screen
│   │
│   ├── (main)/                   # Main application
│   │   ├── _layout.tsx          # Tab navigation
│   │   ├── home.tsx             # Product grid (REDESIGNED)
│   │   ├── cart.tsx             # Shopping cart (FUNCTIONAL)
│   │   ├── categories.tsx       # Category browser
│   │   ├── orders.tsx           # Order history
│   │   └── profile.tsx          # User profile
│   │
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Welcome screen (REDESIGNED)
│   └── global.css               # TailwindCSS styles
│
├── components/                   # Reusable components
│   ├── CartLoader.tsx           # Loading skeleton
│   └── LocationPicker.tsx       # Map integration
│
├── server/                       # Backend API
│   ├── config/
│   │   └── dbConfig.js          # MongoDB connection
│   │
│   ├── models/
│   │   ├── product.js           # Product schema
│   │   └── user.model.js        # User schema
│   │
│   ├── routes/
│   │   ├── product.routes.js    # Product endpoints
│   │   └── auth.routes.js       # Auth endpoints
│   │
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT verification
│   │
│   ├── utils/
│   │   └── generateToken.js     # Token generation
│   │
│   ├── index.js                 # Express server
│   ├── seed.js                  # Database seeder
│   ├── .env                     # Environment config
│   └── package.json
│
├── store/                        # Redux state
│   ├── store.ts                 # Store configuration
│   └── cartSlice.ts             # Cart state logic
│
├── utils/
│   └── api.js                   # API client
│
├── assets/
│   └── images/                  # Static assets
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md                     # This file
├── SETUP_GUIDE.md               # Quick start
└── IMPROVEMENTS.md              # Change log
```

---

## 🎨 Design & UI Enhancements

This project features a complete UI/UX redesign from basic templates to production-quality interfaces.

### Design Philosophy
- **Consistency:** Unified emerald green theme across all screens
- **Clarity:** Clear visual hierarchy and intuitive navigation
- **Feedback:** Immediate user feedback for all interactions
- **Delight:** Subtle animations and micro-interactions

### Screen Improvements

#### 1. Welcome Screen (`app/index.tsx`)
**Enhancements:**
- Gradient background with floating decorative circles
- Branded app icon with shadow effects
- Feature showcase section
- Guest browsing option
- Improved CTA button hierarchy

#### 2. Product Home (`app/(main)/home.tsx`)
**Key Changes:**
- **Layout:** Horizontal scroll → 2-column responsive grid
- **Product Cards:** Enhanced with square images, low-stock badges, price comparisons
- **Loading States:** Branded spinner with descriptive text
- **Error Handling:** User-friendly error messages with retry functionality
- **Empty States:** Contextual messaging with icons

#### 3. Shopping Cart (`app/(main)/cart.tsx`)
**Major Upgrades:**
- ✅ Fully functional quantity increment/decrement
- ✅ Working remove item feature
- ✅ Real-time total calculation
- ✅ Bill breakdown (subtotal, delivery fee, total)
- ✅ Free delivery threshold indicator (₹500+)
- ✅ Empty cart state with helpful messaging
- ✅ Item-level total display

### Color Palette
- **Primary:** Emerald 600 (#059669)
- **Secondary:** Emerald 700 (#047857)
- **Background:** Emerald 50 (#f0fdf4)
- **Accent:** Red for warnings/errors
- **Neutral:** Gray scale for text hierarchy

---

## 🔧 Technical Implementation Highlights

### Frontend Architecture

**State Management (Redux Toolkit)**
```typescript
// Enhanced cart slice with proper actions
cartSlice.ts includes:
- addToCart: Add/update items with quantity
- removeFromCart: Complete item removal
- updateQuantity: Direct quantity updates
- clearCart: Reset cart state
- loadCart: Hydrate from AsyncStorage
```

**API Integration**
```javascript
// Dynamic API endpoint configuration
getApiBaseUrl() handles:
- Web platform: localhost
- Mobile platforms: Local network IP
- Environment-based switching
```

**Persistent Storage**
- AsyncStorage integration for cart persistence
- Location data caching
- User preference storage

### Backend Architecture

**Database Schema (Mongoose)**
```javascript
Product Schema:
- name: String (required)
- price: Number (required)
- imageUrl: String
- category: String
- description: String
- stock: Number (default: 0)
- createdAt: Date (auto-generated)
```

**API Endpoints**
```
GET    /products              # List all products
GET    /products?q=search     # Search by name
GET    /products?category=X   # Filter by category
GET    /products/:id          # Single product
POST   /products              # Create product
```

**Security Features**
- CORS configuration for cross-origin requests
- JWT-based authentication
- Password hashing with bcryptjs
- Input validation

---

## 🐛 Troubleshooting Guide

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
