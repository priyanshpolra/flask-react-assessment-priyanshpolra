# ✅ Flask + React Assessment — Tasks & Comments CRUD

A full-stack implementation using **Flask (Backend)** and **React (Frontend)** for the technical assessment for the **Associate Software Engineer – Python/React** position at **Better Software**.

This repository includes:
✅ CRUD APIs for Tasks & Comments
✅ Automated backend test coverage (PyTest)
✅ Frontend UI (Bonus) for Task + Comment management

---

## 📌 Problem Summary

### ✅ Task 1 — Backend

Implement CRUD APIs for **comments** under a given task:

✅ Add comment
✅ Edit comment
✅ Delete comment
✅ Retrieve comments

Add **automated tests** for these APIs.

---

### ✅ Task 2 — Bonus (Frontend)

Build UI components to:
✅ Create task
✅ Edit task
✅ Delete task
✅ Add, edit, & delete comments

---

## 🚀 Tech Stack

### **Backend**

* Python
* Flask
* SQLAlchemy
* PyTest

### **Frontend**

* React
* Axios
* TailwindCSS

---

## 📁 Project Structure

> ✅ Updated to match actual folders

```
project/
│
├── src/
│   └── apps/
│       ├── backend/
│       │   ├── app/
│       │   │   ├── routes/
│       │   │   ├── models/
│       │   │   ├── database.py
│       │   │   ├── config.py
│       │   │   └── ...
│       │   ├── run.py
│       │   └── requirements.txt
│       │
│       └── frontend/
│           ├── src/
│           ├── package.json
│           └── ...
│
├── config/
├── docs/
├── lib/
├── tests/
│   ├── backend/
│   └── frontend/
│
├── .dockerignore
├── Dockerfile
├── docker-compose.dev.yml
├── Makefile
└── README.md
```
---

## 📥 Clone & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<priyansh_polra>/flask-react-assessment-priyanshpolra.git
```

### 2️⃣ Move into project

```bash
cd flask-react-assessment-priyanshpolra
```

Now follow backend + frontend setup instructions:

---

## 🟦 Backend (Flask) — Setup

```bash
cd src/apps/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

Runs at:

```
http://localhost:5001
```

---

## 🟩 Frontend (React) — Setup

```bash
cd src/apps/frontend
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

## ✅ API Endpoints

### ✅ Tasks

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /tasks     | Get all tasks |
| POST   | /tasks     | Create task   |
| PUT    | /tasks/:id | Update task   |
| DELETE | /tasks/:id | Delete task   |

---

### ✅ Comments

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | /tasks/:id/comments | Get all comments |
| POST   | /tasks/:id/comments | Add comment      |
| PUT    | /comments/:id       | Update comment   |
| DELETE | /comments/:id       | Delete comment   |

---

## ✅ Automated Tests (PyTest)

Run from backend folder:

```bash
pytest
```

Tests cover:
✅ Create comment
✅ Update comment
✅ Delete comment
✅ Edge cases (missing text, invalid ID)

---

## 🎨 UI Overview (Bonus)

Frontend enables:
✅ Create tasks
✅ Edit tasks
✅ Delete tasks
✅ Add/edit/delete comments
✅ No refresh needed — auto-updates

Built with:

* React
* Axios
* TailwindCSS

---

## 📦 Docker (Optional)

```
docker-compose -f docker-compose.dev.yml up --build
```

---

## 🧠 Approach

* Followed modular Flask structure with blueprints
* Added SQLAlchemy models + relationships
* Created reusable React components
* State updates without page reload
* Tests for API correctness + stability

---

## 🔍 Key Decisions

* Chose REST approach with `/tasks/:id/comments` for clarity
* Used Axios for easy API communication
* TailwindCSS for fast UI styling
* React state updates for smooth UX (no refresh)

---

## 🎥 Submission

Deliver:
✅ PR link
✅ Video explaining:

1. Approach
2. Architecture decisions
3. Challenges + trade-offs


