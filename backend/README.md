# SPINEVISION-AI Backend

> FastAPI-based backend for the AI Spine Disease Detection System

## 🏥 Overview

The backend handles authentication, image processing orchestration, AI inference coordination, clinical recommendation generation, PDF report creation, and data persistence for the SPINEVISION-AI platform.

## 🛠 Technology Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | FastAPI (Python 3.9+) |
| **Database** | PostgreSQL (prod) / SQLite (dev) via SQLAlchemy ORM |
| **Authentication** | JWT (python-jose) + bcrypt password hashing |
| **ML Inference** | HuggingFace Spaces API (DenseNet-121 + YOLOv9) |
| **AI Recommendations** | Google Gemini 2.0 Flash API |
| **PDF Reports** | ReportLab |
| **Image Processing** | Pillow, NumPy |
| **Server** | Uvicorn ASGI |
| **Deployment** | Render (free tier) |

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI app + DB migrations
│   ├── config.py               # Settings (env vars)
│   │
│   ├── database/
│   │   ├── db.py               # SQLAlchemy engine + session
│   │   └── models.py           # User, Upload, Result models
│   │
│   ├── api/
│   │   ├── auth.py             # Register, login, JWT, /me
│   │   ├── upload.py           # X-ray upload → full analysis pipeline
│   │   ├── result.py           # Get results, heatmap, PDF download
│   │   ├── history.py          # Paginated history + statistics
│   │   └── admin.py            # Doctor approval (approve/reject)
│   │
│   └── services/
│       ├── ml_service.py       # HuggingFace API integration
│       ├── gemini_service.py   # Gemini AI recommendation generation
│       ├── report_service.py   # PDF report generation (ReportLab)
│       └── storage_service.py  # File storage (uploads, heatmaps, reports)
│
├── storage/
│   ├── uploads/                # User-uploaded X-ray images
│   ├── heatmaps/               # AI-generated heatmap overlays
│   └── reports/                # Generated PDF diagnostic reports
│
├── requirements.txt
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)
- PostgreSQL (optional — SQLite works for local dev)

### Installation

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment** — Create a `.env` file:
   ```env
   DATABASE_URL=sqlite:///./spinevision.db
   SECRET_KEY=your-super-secret-key-here
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   HF_SPACE_URL=https://ziaur390-spinevision-ml-api.hf.space
   GEMINI_API_KEY=your-gemini-api-key
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

6. **Access the API**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new doctor account (pending approval) |
| POST | `/auth/login` | Login → returns JWT access token |
| GET | `/auth/me` | Get authenticated user profile |

### Upload & Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload X-ray → triggers full AI pipeline |

The upload endpoint performs the complete analysis pipeline:
1. Saves the uploaded image
2. Sends it to HuggingFace Space (DenseNet + YOLO)
3. Generates heatmap from YOLO detections
4. Calls Gemini API for clinical recommendation
5. Generates PDF report
6. Stores everything in the database
7. Returns the complete result

### Results
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/result/{upload_id}` | Full result (predictions, recommendation, URLs) |
| GET | `/result/{upload_id}/heatmap` | Download heatmap image |
| GET | `/result/{upload_id}/report` | Download PDF report |

### History
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/history?page=1&per_page=10` | Paginated upload history |
| GET | `/history/statistics` | Total scans, normal/abnormal counts |
| DELETE | `/history/{upload_id}` | Delete a scan and its files |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/pending` | List doctors awaiting approval |
| POST | `/admin/approve/{user_id}` | Approve a doctor's account |
| POST | `/admin/reject/{user_id}` | Reject and delete a doctor's account |

## 🔐 Authentication Flow

1. Doctor registers → account created with `is_approved = 'false'`
2. Admin approves the account from the Admin Panel
3. Doctor logs in → receives JWT token
4. All protected endpoints require: `Authorization: Bearer <token>`

## 🧠 ML Pipeline

### Analysis Flow
```
Upload → HuggingFace API → DenseNet-121 (classification)
                         → YOLOv9 (detection + boxes)
                         → Heatmap generation
       → Gemini API     → Clinical recommendation
       → ReportLab      → PDF report
       → PostgreSQL     → Persist results
```

### Model Output Format
```json
{
  "overall_classification": "Osteophytes",
  "model_version": "v2.0 (DenseNet+YOLO HF)",
  "confidence_score": 0.85,
  "recommendation": "Clinical Summary: The AI analysis detected...",
  "predictions": [
    {
      "label": "Osteophytes (DenseNet)",
      "probability": 0.85,
      "description": "Whole-image classification by DenseNet121."
    },
    {
      "label": "Located: Osteophytes (YOLO)",
      "probability": 0.78,
      "description": "Region-level detection by YOLOv9."
    }
  ],
  "heatmap_path": "storage/heatmaps/heatmap_xxx.png",
  "report_path": "storage/reports/report_xxx.pdf"
}
```

### Gemini Fallback
If `GEMINI_API_KEY` is not set or the API is unreachable, the system automatically falls back to rule-based recommendations using hardcoded clinical guidelines per condition.

## 📋 Database Schema

### Users
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| email | VARCHAR | Unique, indexed |
| hashed_password | VARCHAR | bcrypt hash |
| full_name | VARCHAR | |
| hospital_name | VARCHAR | Doctor's hospital |
| medical_license | VARCHAR | License number |
| role | ENUM | doctor / admin |
| is_approved | VARCHAR(5) | 'true' / 'false' |
| is_active | BOOLEAN | |
| created_at | DATETIME | |

### Uploads
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | FK → Users |
| file_name, file_path | VARCHAR | |
| status | ENUM | uploaded / processing / done / failed |
| overall_classification | VARCHAR | From DenseNet |
| uploaded_at | DATETIME | |

### Results
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| upload_id | UUID | FK → Uploads |
| model_version | VARCHAR | e.g., "v2.0 (DenseNet+YOLO HF)" |
| overall_classification | VARCHAR | |
| predictions | JSON | Array of prediction objects |
| confidence_score | VARCHAR | |
| recommendation | TEXT | Gemini-generated clinical text |
| heatmap_path | VARCHAR | Path to heatmap image |
| report_path | VARCHAR | Path to PDF report |
| processed_at | DATETIME | |

## ⚙️ Configuration

All settings in `app/config.py`, loaded from environment variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | `sqlite:///./spinevision.db` | Database connection string |
| `SECRET_KEY` | Yes | — | JWT signing key |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | 1440 | Token expiry (24h) |
| `HF_SPACE_URL` | Yes | — | HuggingFace Space inference URL |
| `GEMINI_API_KEY` | No | — | Google Gemini API key (fallback if missing) |

## 🧪 Testing

```bash
# Register
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "doctor@test.com", "password": "test123", "full_name": "Dr. Test", "hospital_name": "Test Hospital", "medical_license": "MED-001"}'

# Login
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=doctor@test.com&password=test123"

# Upload X-ray
curl -X POST "http://localhost:8000/upload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@spine_xray.png"
```

## 👥 Team

| Name | Role |
|------|------|
| Zia Ur Rahman | Team Member |
| Hammad Ali Khan | Team Member |
| Imad Ud Din | Team Member |

**Supervisor:** Dr. Suhaib Qureshi

---

**SPINEVISION-AI Backend** — Powering intelligent spine diagnostics 🦴⚡
