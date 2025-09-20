# DSA Tracker - Multi-Page Structure

A modern, multi-page Data Structures and Algorithms learning platform with beautiful UI and Google authentication.

## 📁 Project Structure

```
dsa-master/
├── index.html              # Main entry point (redirects to login/home)
├── login.html              # Login and signup page
├── home.html               # Main application dashboard
├── styles/
│   ├── shared.css          # Common styles and design system
│   ├── login.css           # Login page specific styles
│   └── home.css            # Home page specific styles
├── js/
│   ├── shared.js           # Shared functionality and data
│   ├── auth.js             # Authentication logic
│   ├── login.js            # Login page specific functionality
│   └── home.js             # Home page functionality
├── GOOGLE_AUTH_SETUP.md    # Google OAuth setup guide
└── README.md               # This file
```

## 🚀 How to Run

1. **Start the local server:**
   ```bash
   python -m http.server 8000
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:8000
   ```

3. **The app will automatically redirect you to:**
   - `login.html` if you're not logged in
   - `home.html` if you're already logged in

## 📄 Page Structure

### **index.html**
- Entry point that checks authentication status
- Automatically redirects to login or home page
- Shows a beautiful loading screen during redirect

### **login.html**
- Complete authentication interface
- Traditional username/password login
- Google Sign-In integration
- Beautiful glassmorphism design with animations
- Form validation and error handling

### **home.html**
- Main application dashboard
- Navigation between different views (Dashboard, Patterns, Profile)
- Interactive DSA pattern exploration
- Progress tracking and statistics
- Question management system

## 🎨 Design System

### **Shared Styles (styles/shared.css)**
- CSS custom properties for consistent theming
- Common component styles (buttons, forms, cards)
- Animation keyframes and transitions
- Responsive design utilities

### **Login Styles (styles/login.css)**
- Authentication-specific styling
- Glassmorphism effects
- Google Sign-In button customization
- Loading screen animations

### **Home Styles (styles/home.css)**
- Dashboard and navigation styling
- Pattern cards and progress bars
- Question cards and status badges
- Responsive grid layouts

## 🔧 JavaScript Architecture

### **Shared Functionality (js/shared.js)**
- DSA patterns data structure
- Question database generation
- User data management functions
- Navigation helpers
- Authentication utilities

### **Authentication (js/auth.js)**
- Login/signup form handling
- Google OAuth integration
- JWT token decoding
- User session management

### **Home Page (js/home.js)**
- Dashboard statistics
- Pattern exploration
- Question management
- Progress tracking
- Achievement system

## 🔐 Authentication Features

- **Traditional Login**: Username/password authentication
- **Google Sign-In**: One-click OAuth authentication
- **Session Persistence**: Users stay logged in across browser sessions
- **User Data Isolation**: Each user's progress is stored separately
- **Secure Logout**: Proper session cleanup

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Proper touch targets and interactions
- **Adaptive Layouts**: Components adjust to screen size
- **Smooth Animations**: All animations work on mobile devices

## 🎯 Key Features

### **Dashboard**
- Progress statistics overview
- Pattern completion tracking
- Quick action buttons
- Achievement display

### **Patterns**
- 10 DSA pattern categories
- Search and filter functionality
- Progress visualization
- Interactive pattern cards

### **Questions**
- 300+ algorithm questions
- Difficulty-based organization
- Company tags for each question
- LeetCode integration

### **Profile**
- Detailed user statistics
- Achievement system
- Account information
- Progress history

## 🛠️ Development

### **Adding New Features**
1. Add HTML structure to appropriate page
2. Add styles to corresponding CSS file
3. Add functionality to appropriate JavaScript file
4. Update shared.js if needed for common functionality

### **Styling Guidelines**
- Use CSS custom properties from shared.css
- Follow the established design system
- Maintain responsive design principles
- Use consistent spacing and typography

### **JavaScript Guidelines**
- Keep page-specific logic in respective JS files
- Use shared.js for common functionality
- Maintain clean separation of concerns
- Follow modern JavaScript practices

## 🔧 Configuration

### **Google Authentication**
1. Follow the guide in `GOOGLE_AUTH_SETUP.md`
2. Update the client ID in `js/auth.js` and `login.html`
3. Configure authorized origins in Google Cloud Console

### **Customization**
- Modify color scheme in `styles/shared.css` CSS custom properties
- Add new DSA patterns in `js/shared.js`
- Customize animations and transitions
- Add new question categories

## 📦 Dependencies

- **Google Identity Services**: For OAuth authentication
- **Modern Browser**: ES6+ support required
- **Local Storage**: For user data persistence

## 🚀 Deployment

1. **Static Hosting**: Upload all files to any static hosting service
2. **Update Google OAuth**: Configure production domains in Google Cloud Console
3. **HTTPS Required**: Google OAuth requires HTTPS in production
4. **Environment Variables**: Consider using environment variables for client IDs

## 🎉 Features Added

- ✅ Multi-page architecture
- ✅ Separated login and home pages
- ✅ Modular CSS and JavaScript
- ✅ Google authentication integration
- ✅ Beautiful UI with animations
- ✅ Responsive design
- ✅ Progress tracking
- ✅ Achievement system
- ✅ Question management
- ✅ Pattern exploration

Your DSA Tracker is now a professional, multi-page application with a clean architecture and beautiful design! 🚀