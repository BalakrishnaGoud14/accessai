# AccessAI — AI-Powered Access Management System

An intelligent access management platform that uses **AI** to analyze employee access requests, assess security risks, and provide actionable recommendations to managers and admins.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)
![Groq AI](https://img.shields.io/badge/AI-Groq%20LLaMA%203.3-orange)

---

## ✨ Features

### 🧑‍💼 Employee Portal
- Submit access requests for applications (Salesforce, Slack, Database Admin, etc.)
- View request history and track approval status
- Real-time status updates (Pending → Approved/Rejected)

### 👨‍💻 Manager Dashboard
- View pending access requests from employees
- **AI Risk Analysis** — each request is automatically flagged as Low / Medium / High risk
- **AI Explanation** — ~50 word summary with suggestions for the manager
- Approve or reject requests with optional rejection reason
- High-risk approvals are **automatically escalated** to Security Admin

### 🔒 Security Admin Panel
- Review high-risk requests escalated by managers
- Final approval/rejection for sensitive access
- Full audit trail visibility

### 📊 Audit Logs
- Complete history of all actions (submissions, approvals, rejections)
- Timestamps, user info, and AI analysis stored for compliance

### 🤖 AI Integration (Groq - LLaMA 3.3 70B)
- Automatic risk assessment on every request
- Contextual analysis based on user role, department, and justification
- ~50 word AI-generated explanation and recommendation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Material UI 5, React Router 6 |
| **Backend** | Spring Boot 3.4, Java 17, Spring Security, Spring AI |
| **Database** | PostgreSQL (Neon - serverless) |
| **AI** | Groq API (LLaMA 3.3 70B via Spring AI) |
| **Deployment** | Render (backend), Vercel (frontend), Neon (database) |

---

## 📁 Project Structure

```
accessai/
├── src/
│   ├── backend/                    # Spring Boot API
│   │   ├── src/main/java/com/accessai/backend/
│   │   │   ├── config/             # Security, CORS, DataInitializer
│   │   │   ├── controller/         # REST endpoints
│   │   │   ├── model/              # JPA entities
│   │   │   ├── repository/         # Data access layer
│   │   │   ├── service/            # AI & Audit services
│   │   │   └── exception/          # Global error handling
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   └── frontend/                   # React SPA
│       ├── src/
│       │   ├── components/         # Reusable UI components
│       │   ├── context/            # Auth & Role context providers
│       │   ├── pages/              # Page-level components
│       │   └── services/           # API service layer
│       ├── vercel.json
│       └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+** and **Maven**
- **Node.js 18+** and **npm**
- **PostgreSQL** database (local or Neon)
- **Groq API Key** ([Get one free](https://console.groq.com))

### 1. Clone the Repository

```bash
git clone https://github.com/BalakrishnaGoud14/accessai.git
cd accessai
```

### 2. Backend Setup

```bash
cd src/backend

# Set environment variables
# Windows PowerShell:
$env:GROQ_API_KEY="your_groq_api_key"
$env:POSTGRES_URL="jdbc:postgresql://your-host/your-db"
$env:POSTGRES_USER="your_user"
$env:POSTGRES_PASSWORD="your_password"

# Run the backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`.

### 3. Frontend Setup

```bash
cd src/frontend

# Install dependencies
npm install

# Run the frontend
npm run dev
```

The frontend will start on `http://localhost:5173`.

### 4. Default Users

The app auto-creates these users on first run:

| Email | Password | Role |
|-------|----------|------|
| `admin@accessai.com` | `admin123` | Admin |
| `manager@accessai.com` | `manager123` | Manager |
| `security@accessai.com` | `security123` | Security Admin |
| `employee@accessai.com` | `employee123` | Employee |

---

## 🌐 Deployment

### Backend — [Render](https://render.com)
1. Create a new **Web Service** connected to this repo
2. Set **Root Directory** to `src/backend`
3. Set **Build Command**: `mvn clean install -DskipTests`
4. Set **Start Command**: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
5. Add environment variables: `GROQ_API_KEY`, `POSTGRES_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`

### Frontend — [Vercel](https://vercel.com)
1. Import the repo to Vercel
2. Set **Root Directory** to `src/frontend`
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com/api`

### Database — [Neon](https://neon.tech)
1. Create a free PostgreSQL database
2. Copy the connection string to your backend environment variables

---

## 🔐 Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key for AI features |
| `POSTGRES_URL` | JDBC connection string |
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (e.g., `https://your-app.onrender.com/api`) |

---

## 📄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/requests` | Submit an access request (triggers AI) |
| `GET` | `/api/requests/pending` | Get pending requests (for managers) |
| `GET` | `/api/requests/pending-security` | Get security-pending requests |
| `PUT` | `/api/requests/{id}/status` | Approve/reject a request |
| `GET` | `/api/requests/user/{userId}` | Get a user's request history |
| `GET` | `/api/requests/history` | Get all request history |
| `GET` | `/api/audit-logs` | Get all audit logs |
| `GET` | `/api/users` | Get all users |
| `PUT` | `/api/users/{id}/role` | Update a user's role |
| `GET` | `/api/ai/role-description?role=` | AI-generated role description |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
