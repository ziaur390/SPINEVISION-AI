# SPINEVISION-AI Frontend

> React + Vite frontend for the AI-Powered Spine Disease Detection System

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Access the app at: http://localhost:5173

## 📁 Project Structure

```
frontend/
├── public/
│   ├── logo.png               # App icon / favicon
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── logo.png           # Logo used in components
│   ├── components/
│   │   ├── Navbar.jsx         # Top nav bar (user menu, quick upload)
│   │   ├── Sidebar.jsx        # Desktop sidebar + mobile bottom nav
│   │   └── ProtectedRoute.jsx # JWT auth guard
│   ├── context/
│   │   └── AuthContext.jsx    # Global auth state (token, user)
│   ├── pages/
│   │   ├── Home.jsx           # Public landing page
│   │   ├── Login.jsx          # Doctor login
│   │   ├── Register.jsx       # Doctor registration
│   │   ├── Dashboard.jsx      # Stats, quick actions, model info
│   │   ├── Upload.jsx         # Drag & drop upload + grayscale check
│   │   ├── Processing.jsx     # Analysis loading state
│   │   ├── Result.jsx         # Predictions, heatmap, AI recommendation
│   │   ├── History.jsx        # Paginated scan history table
│   │   └── AdminDashboard.jsx # Doctor approval management
│   ├── services/
│   │   └── api.js             # Axios client + all API calls
│   ├── App.jsx                # Route configuration
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind CSS + custom animations
├── index.html                 # HTML template + Google Fonts (Inter)
├── vite.config.js             # Vite + React config
├── tailwind.config.js
├── netlify.toml               # Netlify SPA routing
└── package.json
```

## 📱 Pages

| Page | Route | Auth | Description |
|------|-------|------|-------------|
| Home | `/` | Public | Landing page with hero, features, How It Works, blog, about |
| Login | `/login` | Public | Split-screen login with pending approval message |
| Register | `/register` | Public | Doctor registration (name, hospital, license) |
| Dashboard | `/dashboard` | 🔒 | Stats cards, recent scans, AI model info (v2.0) |
| Upload | `/upload` | 🔒 | Drag & drop with grayscale validation |
| Processing | `/processing/:id` | 🔒 | Animated loading while AI analyzes |
| Result | `/result/:id` | 🔒 | Predictions, heatmap, Gemini recommendation, PDF |
| History | `/history` | 🔒 | Sortable table with confidence bars, pagination |
| Admin | `/admin` | 🔒 Admin | Approve/reject doctor registrations |

## ✨ Key Features

### Grayscale Validation
Before uploading, the frontend draws the image to a hidden `<canvas>`, samples 200 random pixels, and checks if R/G/B channels diverge by more than a threshold. If >10% of pixels are colored, the upload is blocked — preventing users from uploading photos of cars, nature, etc.

### Mobile Bottom Navigation
On mobile devices (< md breakpoint), the desktop sidebar is hidden and replaced with a fixed bottom navigation bar (iOS/Android style) with Dashboard, Upload, and History tabs.

### AI Recommendation Display
The Result page shows a beautiful indigo-gradient card with the Gemini-generated clinical recommendation, including Clinical Summary, Detailed Findings, and Actionable Recommendations.

### Doctor Approval Flow
1. Doctor registers → sees "Pending Approval" message
2. Admin sees new account in Admin Panel → clicks Approve
3. Doctor can now login and use the platform

## 🔌 Backend Connection

The frontend connects to the FastAPI backend. Configure the API URL:

```bash
# .env file
VITE_API_URL=http://localhost:8000
```

For production (Netlify), this is set to the Render backend URL.

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary Colors** | Teal-600 → Cyan-600 gradient |
| **Typography** | Inter (Google Fonts) |
| **Border Radius** | rounded-xl / rounded-2xl |
| **Shadows** | shadow-sm with shadow-teal-200 accents |
| **Animations** | Smooth transitions, pulse, spin |
| **Cards** | bg-white, border-gray-100, rounded-2xl |

## 🛠️ Technologies

| Tech | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool + dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | 6 | Client-side routing |
| Axios | 1.x | HTTP client |

## 📋 Available Scripts

```bash
npm run dev       # Start dev server (port 5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## 🌐 Deployment (Netlify)

The frontend auto-deploys from the GitHub repo. The `netlify.toml` handles SPA routing:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 👥 Team

| Name | Role |
|------|------|
| Zia Ur Rahman | Team Member |
| Hammad Ali Khan | Team Member |
| Imad Ud Din | Team Member |

**Supervisor:** Dr. Suhaib Qureshi

---

**SPINEVISION-AI Frontend** — Professional medical UI for intelligent diagnostics 🦴🎨
