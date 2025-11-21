# FinalProject2025PLP
My final Project

Pitch Deck Link:https://www.canva.com/design/DAG5S0Vd6CY/LWgSvj-fugRNU1RDG4xEVA/edit?utm_content=DAG5S0Vd6CY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
# 🌍 **AquaLink – Smart Water Management System**

**Final Project 2025 – PLP Software Engineering**

AquaLink is a full-stack MERN web application designed to help communities access real-time information on clean water points. It allows users to:

✅ View safe vs unsafe water points
✅ See queue levels
✅ View best collection times
✅ Report issues
✅ Update water point status
✅ View interactive map using Leaflet
✅ Add or manage water points

The system is built for transparency, efficiency, and better community water access.

---

# 🚀 **Live Demo**

### **Frontend (React on Vercel):**

🔗 [https://final-project2025-plp.vercel.app](https://final-project2025-plp.vercel.app)

### **Backend (Node/Express on Render):**

🔗 [https://aquaproject.onrender.com](https://aquaproject.onrender.com)

### GitHub Repository:

🔗 [https://github.com/beverly-004/FinalProject2025PLP](https://github.com/beverly-004/FinalProject2025PLP)

---

# 🧱 Tech Stack

### Frontend

* React.js (CRA)
* Tailwind CSS
* React Router
* Axios
* Leaflet Maps
* Framer Motion (animations)

### Backend

* Node.js + Express.js
* MongoDB Atlas
* Mongoose
* Render Cloud Hosting
* CORS + dotenv

---

# 📦 Features

### 🔵 User Features

* View all water points with safety status + queue level
* Interactive map view using Leaflet
* Click markers to see details
* Search for water points
* View issue history
* Report issues

### 🟢 Admin / System Features

* Add new water points
* Update queue status
* Mark water point as safe
* AI-style predicted “Best time to fetch water”
* Dashboard cards with detailed data

---

# 🗺️ Screens & Pages

| Page                  | Description                        |
| --------------------- | ---------------------------------- |
| **Landing Page**      | Introduction + feature highlights  |
| **Water Points Page** | List of all water points           |
| **Map View**          | Interactive Leaflet map            |
| **Add Water Point**   | Admin page to add new sites        |
| **Issue History**     | List of issues per water point     |
| **About Page**        | Project mission, vision & timeline |
| **Contact Page**      | Contact section                    |
| **404 Not Found**     | Friendly error page                |

---

# 🛠️ Project Setup (Local Development)

### Clone repository

```bash
git clone https://github.com/beverly-004/FinalProject2025PLP
cd FinalProject2025PLP
```

---

## 1️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create .env file

```
MONGO_URI=Your MongoDB Atlas Connection String
PORT=5000
```

### Run backend

```bash
npm run dev
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

### **Important: Set the API URL**

Create `src/api.js`:

```js
const API = "https://aquaproject.onrender.com";
export default API;
```

---

# 🌐 Deployment

### Frontend (Vercel)

* Build Command: `react-scripts build`
* Output Directory: `build`

### Backend (Render)

* Root Directory: `/backend`
* Build Command: `npm install`
* Start Command: `node server.js`

---

# 🧪 API Endpoints

### Water Points

```
GET /api/waterpoints/all
POST /api/waterpoints/add
```

### Dashboard

```
GET /api/dashboard
```

### Issues

```
POST /api/issues/report/:id
GET  /api/history/:id
```

### Admin

```
POST /api/admin/clear/:id
POST /api/queue/update/:id
```

---



# 🎯 Project Goal

AquaLink aims to **democratize access to clean water** by providing communities with real-time insights, predictive trends, and transparent data on water resources.

---

#  Author

**Beverly Chikoti**
Software Engineering | PLP


