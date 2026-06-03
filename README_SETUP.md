# 👥 Frontend User - NMSuperMarket Customer App

Customer application của dự án NMSuperMarket xây dựng bằng **React 19** + **Vite** + **Tailwind CSS** + **Swiper**.

---

## ⚡ Quick Start

```bash
# 1. Cài dependencies
npm install

# 2. Copy .env
copy .env.example .env

# 3. Chạy development server
npm run dev

# Truy cập: http://localhost:5173
```

---

## 📦 Yêu Cầu

- **Node.js**: 18+
- **npm**: 9+

---

## 🛠️ Cài Đặt Chi Tiết

### 1. Cài Đặt NPM Dependencies

```bash
npm install
```

**Điều này sẽ:**
- Tải về tất cả packages từ npm
- Tạo folder `node_modules/`
- Tạo file `package-lock.json`

⏱️ Mất khoảng 1-3 phút

### 2. Cấu Hình Environment

```bash
copy .env.example .env
```

**Cấu hình .env:**
```env
# API Backend URL
VITE_API_URL=http://localhost:8000/api
```

### 3. Chạy Development Server

```bash
npm run dev
```

Server sẽ chạy tại: **http://localhost:5173** hoặc **http://localhost:5174**

- Tự động reload khi code thay đổi
- Hot Module Replacement (HMR) được bật

---

## 🚀 Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

**Kết quả:**
- Folder `dist/` chứa tệp tối ưu hóa
- Kích thước nhỏ, tốc độ load nhanh

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Cấu Trúc Dự Án

```
FE_User_NMSuperMarket/
├── src/
│   ├── components/              # Reusable components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   ├── Cart/
│   │   ├── Navbar/
│   │   └── ...
│   ├── pages/                   # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── ChatbotPage.jsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useProducts.js
│   │   └── ...
│   ├── utils/                   # Utility functions
│   │   ├── api.js
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── store/                   # Zustand state management
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   ├── productStore.js
│   │   └── ...
│   ├── styles/                  # Global styles (optional)
│   ├── App.jsx                  # Root component
│   └── main.jsx                 # Entry point
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
├── dist/                        # Build output
├── .env                         # Environment variables
├── .env.example                 # Example .env
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind config
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint configuration
├── package.json                # Dependencies
├── package-lock.json           # Lock file
└── index.html                  # HTML entry point
```

---

## 📚 Thư Viện Chính

### Dependencies (Runtime)

```json
{
  "react": "^19.2.5",            // UI Framework
  "react-dom": "^19.2.5",        // React DOM
  "react-router-dom": "^7.15.0", // Routing & Navigation
  "axios": "^1.16.0",            // HTTP requests
  "zustand": "^5.0.13",          // State management
  "lucide-react": "^1.16.0",     // Icons (Lucide)
  "react-icons": "^5.6.0",       // Icons (FontAwesome, etc)
  "swiper": "^12.2.0",           // Image carousel/slider
  "tailwindcss": "^4.3.0"        // Styling
}
```

### DevDependencies

```json
{
  "vite": "^8.0.10",
  "@vitejs/plugin-react": "^6.0.1",
  "@tailwindcss/vite": "^4.3.0",
  "tailwindcss": "^4.3.0",
  "postcss": "^8.5.14",
  "autoprefixer": "^10.5.0",
  "eslint": "^10.2.1"
}
```

---

## 🎨 Styling (Tailwind CSS + PostCSS)

Dự án sử dụng **Tailwind CSS** + **PostCSS** + **Autoprefixer** cho styling:

```jsx
<div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-3xl font-bold text-white">Welcome</h1>
  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100">
    Shop Now
  </button>
</div>
```

---

## 🎠 Carousel (Swiper)

Dự án sử dụng **Swiper** cho image carousel/slider:

```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

<Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={50}
  slidesPerView={1}
  navigation
  pagination
>
  <SwiperSlide>
    <img src="image1.jpg" alt="Slide 1" />
  </SwiperSlide>
  <SwiperSlide>
    <img src="image2.jpg" alt="Slide 2" />
  </SwiperSlide>
</Swiper>
```

---

## 🔗 Routing (React Router)

Routes được định nghĩa trong `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/orders" element={<OrdersPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/chatbot" element={<ChatbotPage />} />
</Routes>
```

---

## 🗂️ State Management (Zustand)

Sử dụng **Zustand** để quản lý state:

```javascript
// store/authStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));

// store/cartStore.js
export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set(state => ({
    items: state.items.filter(i => i.id !== id)
  })),
}));
```

---

## 🌐 API Communication (Axios)

HTTP requests được handle bằng **Axios**:

```javascript
// utils/api.js
import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🎯 Icons

### Lucide React Icons

```jsx
import { Heart, ShoppingCart, User } from 'lucide-react';

<Heart size={24} />
<ShoppingCart size={24} />
<User size={24} />
```

### React Icons

```jsx
import { FaFacebook, FaTwitter } from 'react-icons/fa';

<FaFacebook size={30} />
<FaTwitter size={30} />
```

---

## 🔐 Authentication

**JWT Token stored in localStorage:**

```javascript
// Login
const token = response.data.token;
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(response.data.user));

// Logout
localStorage.removeItem('token');
localStorage.removeItem('user');

// Check if logged in
const token = localStorage.getItem('token');
const isLoggedIn = !!token;
```

---

## 🤖 AI Chatbot Integration

Customer có thể sử dụng AI chatbot để:
- Tìm sản phẩm phù hợp
- Lên menu nấu ăn
- Tư vấn mua sắm

```jsx
import { ChatbotPage } from './pages/ChatbotPage';

// Integrated in app routing
<Route path="/chatbot" element={<ChatbotPage />} />
```

---

## 📖 Các Lệnh Hữu Ích

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Lint code
npm run lint

# Install package
npm install package-name

# Uninstall package
npm uninstall package-name

# Update packages
npm update

# Check outdated packages
npm outdated

# Clear cache
npm cache clean --force
```

---

## 🐛 Troubleshooting

### 1. "Port 5173 already in use"
```bash
npm run dev -- --port 5175
```

### 2. "Cannot find module"
```bash
npm install
```

### 3. "CORS error when calling API"
- Kiểm tra Backend đang chạy: http://localhost:8000
- Kiểm tra VITE_API_URL trong .env
- Kiểm tra CORS được enable trong backend

### 4. "Blank page or white screen"
- Mở DevTools (F12)
- Kiểm tra Console for errors
- Kiểm tra Network tab

### 5. "npm ERR! code ERESOLVE"
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🌟 Best Practices

1. **Components:** Giữ components nhỏ và tái sử dụng
2. **Hooks:** Tạo custom hooks cho logic phức tạp
3. **State:** Sử dụng Zustand cho global state, useState cho local state
4. **API:** Tạo utility functions cho API calls
5. **Images:** Optimize hình ảnh trước khi sử dụng
6. **Performance:** Lazy load components và images
7. **Accessibility:** Sử dụng semantic HTML và ARIA attributes
8. **Testing:** Viết tests cho critical features

---

## 📝 Environment Variables

```env
# API Backend URL
VITE_API_URL=http://localhost:8000/api
```

---

## 🎯 Features

- ✅ Đăng ký & Đăng nhập
- ✅ Duyệt sản phẩm
- ✅ Tìm kiếm sản phẩm
- ✅ Quản lý giỏ hàng
- ✅ Thanh toán
- ✅ Lịch sử đơn hàng
- ✅ AI Chatbot Assistant
- ✅ Quản lý tài khoản

---

## 🚢 Deployment

### Build cho Production

```bash
npm run build
```

### Upload `dist/` folder

Folder `dist/` sẵn sàng deploy lên:
- Netlify
- Vercel
- GitHub Pages
- Server tĩnh (Nginx, Apache)

### Deploy lên Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy lên Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 📱 Mobile Responsive

Dự án hoàn toàn responsive:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

```jsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

---

**Version**: 1.0  
**Last Updated**: June 2024  
**User Frontend Documentation**
