# SPINEVISION-AI Quick Reference Card

> Fast commands and reference for development

---

## 🚀 Quick Start Commands

### Backend
```bash
cd "c:\Users\ziaur\OneDrive\Desktop\final year project\SPINEVISION_AI\backend"
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# API docs → http://localhost:8000/docs
```

### Frontend
```bash
cd "c:\Users\ziaur\OneDrive\Desktop\final year project\SPINEVISION_AI\frontend"
npm install
npm run dev

# App → http://localhost:5173
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/app/main.py` | App entry point + DB migrations |
| `backend/app/config.py` | Settings & environment variables |
| `backend/app/database/models.py` | User, Upload, Result models |
| `backend/app/api/auth.py` | Login/Register endpoints |
| `backend/app/api/upload.py` | X-ray upload + full pipeline |
| `backend/app/api/admin.py` | Doctor approval/rejection |
| `backend/app/services/ml_service.py` | HuggingFace API integration |
| `backend/app/services/gemini_service.py` | Gemini AI recommendations |
| `backend/app/services/report_service.py` | PDF report generation |
| `frontend/src/pages/Upload.jsx` | Upload + grayscale validation |
| `frontend/src/pages/Result.jsx` | Results + heatmap + recommendation |
| `frontend/src/pages/AdminDashboard.jsx` | Admin approval panel |

---

## 🔌 API Endpoints Quick Reference

### Authentication
```
POST /auth/register     → Register doctor (pending approval)
POST /auth/login        → Get JWT token
GET  /auth/me           → Get current user
```

### Core Features
```
POST /upload            → Upload X-ray (multipart/form-data)
GET  /result/{id}       → Get analysis result + recommendation
GET  /result/{id}/heatmap → Download heatmap image
GET  /result/{id}/report  → Download PDF report
GET  /history           → Get user's upload history
GET  /history/statistics → Dashboard stats
DELETE /history/{id}    → Delete a scan
```

### Admin
```
GET  /admin/pending         → List pending doctors
POST /admin/approve/{id}    → Approve a doctor
POST /admin/reject/{id}     → Reject a doctor
```

---

## 🔑 Authentication Header

```
Authorization: Bearer <your_token_here>
```

---

## 📊 Sample API Responses

### Login Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "doctor@hospital.com",
    "full_name": "Dr. Smith",
    "role": "doctor"
  }
}
```

### Analysis Result
```json
{
  "upload_id": "849fa75f-...",
  "overall_classification": "Osteophytes",
  "confidence_score": 0.85,
  "predictions": [
    {"label": "Osteophytes (DenseNet)", "probability": 0.85},
    {"label": "Located: Osteophytes (YOLO)", "probability": 0.78},
    {"label": "Disc space narrowing (DenseNet)", "probability": 0.12}
  ],
  "recommendation": "Clinical Summary: The AI analysis detected...",
  "heatmap_url": "/storage/heatmaps/heatmap_xxx.png",
  "report_url": "/storage/reports/report_xxx.pdf"
}
```

---

## 🌐 Deployed URLs

| Service | URL |
|---------|-----|
| Frontend (Netlify) | https://spinevision-ai.netlify.app |
| Backend API (Render) | https://spinevision-api.onrender.com |
| ML Service (HF) | https://ziaur390-spinevision-ml-api.hf.space |
| API Docs | https://spinevision-api.onrender.com/docs |

---

## 🔧 Environment Variables (Backend)

```env
DATABASE_URL=postgresql://...
SECRET_KEY=your-jwt-secret
GEMINI_API_KEY=your-gemini-key
HF_SPACE_URL=https://ziaur390-spinevision-ml-api.hf.space
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

---

## 🛠️ Common Commands

```bash
# Git push (both remotes)
git add -A ; git commit -m "message" ; git push origin main

# Check running processes on port 8000
netstat -ano | findstr :8000

# Kill process by PID
taskkill /PID <pid> /F

# Freeze current dependencies
pip freeze > requirements.txt
```

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Module not found | Activate venv, `pip install -r requirements.txt` |
| Port in use | Kill process on port 8000 |
| Token expired | Login again |
| CORS error | Check `allow_origins` in `main.py` |
| DB column missing | Restart backend (auto-migration runs on startup) |
| Push too slow | Check `.gitignore` for large `.pt` files |
| Colored image accepted | Grayscale check runs client-side in Upload.jsx |

---

## 👥 Team

| Name | Role |
|------|------|
| Zia Ur Rahman | Team Member |
| Hammad Ali Khan | Team Member |
| Imad Ud Din | Team Member |

**Supervisor:** Dr. Suhaib Qureshi

---

*Keep this card handy for quick reference! Last updated: May 2026*
