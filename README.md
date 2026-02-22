<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/LightGBM-02569B?style=for-the-badge&logo=lightning&logoColor=white" />
</p>

<h1 align="center">🛡️ OLEA Smart Advisor</h1>
<h3 align="center">Intelligent Insurance Recommender System</h3>

<p align="center">
  An AI-powered insurance recommendation engine that uses a trained <strong>LightGBM</strong> model to suggest the optimal coverage bundle based on a client's profile — complete with explainability insights (SHAP) and risk scoring.
</p>

<p align="center">
  <a href="YOUR_DEMO_VIDEO_LINK_HERE">🎬 Watch the Live Demo</a>
</p>

---

## 📸 Demo

<!-- Replace with your actual demo recording link or embed -->
[![Demo Video](https://img.shields.io/badge/▶_Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)]((https://drive.google.com/file/d/1hOyTN6YMGpqbx5MPBIFu65KVwJgceL7U/view?t=22))

> 

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      USER BROWSER                       │
│                    http://your-vps-ip                    │
└────────────────────────┬────────────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   Nginx (Port 80)   │
              │  Serves React SPA   │
              │  Proxies /api → :8000│
              └──────────┬──────────┘
                         │ /api/*
              ┌──────────▼──────────┐
              │  FastAPI (Port 8000)│
              │                     │
              │  POST /api/predict  │
              │  GET  /api/health   │
              │                     │
              │  ┌───────────────┐  │
              │  │  ML Pipeline  │  │
              │  │               │  │
              │  │ solution.py   │  │
              │  │ model.pkl     │  │
              │  │ (LightGBM)    │  │
              │  └───────────────┘  │
              └─────────────────────┘
```

**Both services run inside Docker containers**, orchestrated by `docker-compose`.

---

## 📁 Project Structure

```
intelligent-insurance-demo/
│
├── backend/                        # FastAPI Server
│   ├── app/
│   │   ├── api/
│   │   │   └── endpoints.py        # POST /api/predict endpoint
│   │   ├── models/
│   │   │   └── schemas.py          # Pydantic input/output schemas
│   │   ├── ml/                     # ← Phase 1 model files
│   │   │   ├── solution.py         # Preprocessing & prediction logic
│   │   │   ├── model.pkl           # Trained LightGBM weights
│   │   │   └── test.csv            # Baseline template for inference
│   │   ├── services/
│   │   │   └── ml_service.py       # ML wrapper + SHAP + risk scoring
│   │   └── main.py                 # FastAPI application entry
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/                       # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   ├── PredictionForm.jsx  # Client profile form
│   │   │   ├── ResultCard.jsx      # Prediction result display
│   │   │   ├── RiskGauge.jsx       # Circular risk indicator
│   │   │   └── SHAPChart.jsx       # Feature importance bar chart
│   │   ├── App.jsx                 # Main dashboard layout
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Dark theme global styles
│   ├── nginx.conf                  # Reverse proxy config
│   ├── Dockerfile                  # Multi-stage build (Node → Nginx)
│   └── index.html
│
├── docker-compose.yml              # One command to run everything
├── .gitignore
└── README.md                       # ← You are here
```

---

## 🚀 Deployment — It's Just 3 Commands

### On Any VPS (Ubuntu, Debian, etc.)

**Prerequisites:** Docker and Docker Compose installed on your server.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/intelligent-insurance-demo.git

# 2. Navigate into the project
cd intelligent-insurance-demo

# 3. Build & Run — that's it!
docker-compose up -d --build
```

✅ **Done.** Your app is now live:
- **Frontend Dashboard** → `http://your-server-ip`
- **API Documentation** → `http://your-server-ip:8000/docs`
- **Health Check** → `http://your-server-ip:8000/api/health`

### Stop the app
```bash
docker-compose down
```

### Update after code changes
```bash
git pull
docker-compose up -d --build
```

---

## 🔌 API Reference

### `GET /api/health`
Returns the system status.

```json
{
  "status": "online",
  "model": "LightGBM v1",
  "version": "1.0.0"
}
```

### `POST /api/predict`
Accepts a client profile and returns an insurance recommendation.

**Request Body:**
```json
{
  "age": 35,
  "estimated_annual_income": 80000,
  "adult_dependents": 2,
  "child_dependents": 1,
  "vehicles_on_policy": 2,
  "previous_claims_filed": 0,
  "employment_status": "Employed_FullTime",
  "acquisition_channel": "Direct_Website"
}
```

**Response:**
```json
{
  "product_name": "Executive Class",
  "bundle_id": 7,
  "confidence": 4.1,
  "risk_level": "Faible",
  "risk_score": 1.2,
  "description": "Garanties maximales pour véhicules haut de gamme.",
  "shap_values": [
    { "feature": "Revenu Annuel", "value": 8.0, "impact": "positive" },
    { "feature": "Véhicules", "value": 3.0, "impact": "positive" },
    { "feature": "Sinistres", "value": 0.0, "impact": "positive" },
    { "feature": "Personnes à charge", "value": 2.7, "impact": "positive" }
  ]
}
```

---

## 🎨 Frontend Features

| Feature | Description |
|---------|-------------|
| **Dark Fintech UI** | Deep navy theme with purple/blue accent gradients |
| **Sidebar Navigation** | Dashboard, Analyse SHAP, Profils Clients |
| **8-Field Profile Form** | Age, Income, Dependents, Vehicles, Claims, Employment, Channel |
| **AI Recommendation Card** | Shows product name, confidence %, and description |
| **Risk Gauge** | Animated SVG circular indicator (Faible / Modéré / Élevé) |
| **SHAP Bar Chart** | Recharts horizontal bars showing feature importance |

---

## 🧠 ML Pipeline

| Component | Detail |
|-----------|--------|
| **Model** | LightGBM Classifier (multi-class, 10 bundles) |
| **Features** | 28 raw → 42 engineered (target encoding, polynomial interactions) |
| **Preprocessing** | `solution.py` — NaN handling, category encoding, feature engineering |
| **Explainability** | SHAP-style feature importance per prediction |
| **Inference Time** | < 60ms per prediction |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 5, Tailwind CSS 3, Recharts, Lucide Icons |
| **Backend** | FastAPI, Pydantic v2, Uvicorn |
| **ML** | LightGBM, Pandas, NumPy, Scikit-Learn |
| **Infra** | Docker, Docker Compose, Nginx |

---



---

<p align="center">
  Built for <strong>DataQuest Hackathon — Phase 2</strong> | Powered by <strong>OLEA</strong>
</p>
