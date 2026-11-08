# 🎓 Aerovate — Class 5A & 5B Science Teaching Platform
### YAMANIYYA ENGLISH MEDIUM SCHOOL
**Teacher: Mrs. Jesni · Helpline & WhatsApp: +91 7736419753**

A complete MERN stack educational platform built for **Mrs. Jesni** and students of **Class 5A & Class 5B** at **Yamaniyya English Medium School**. Features full bilingual (English + Malayalam) Science curriculum, interactive geological rock simulations, real-name student registration, animated quizzes with star rewards, and an AI Science Tutor powered by Gemini.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express.js (in `/server`)
- **Database**: MongoDB Atlas with Mongoose ODM (`process.env.MONGO_URI` with built-in memory fallback)
- **AI Engine**: Google Gemini API via `@google/genai` (`process.env.MY_GEMINI_KEY` or `process.env.GEMINI_API_KEY`)
- **Hosting Target**: **Render** (and Replit / Cloud Run)

---

## 🚀 How to Host on Render (Step-by-Step)

### Step 1: Push Code to GitHub
Push this codebase to your GitHub repository (e.g. `https://github.com/your-username/aerovate-teach`).

### Step 2: Create a Free MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free M0 cluster.
2. In **Database Access**, create a user (e.g. `jesni_admin`) and password.
3. In **Network Access**, add IP `0.0.0.0/0` (allow access from all IPs so Render can connect).
4. Click **Connect** $\to$ **Drivers** $\to$ Copy the connection URI:
   ```text
   mongodb+srv://jesni_admin:<password>@cluster0.mongodb.net/aerovate_science_db?retryWrites=true&w=majority
   ```

### Step 3: Deploy on Render (Web Service)
1. Go to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** $\to$ **Web Service**.
3. Select your GitHub repository.
4. Configure service settings:
   - **Name**: `aerovate-teach`
   - **Environment**: `Node`
   - **Region**: Singapore or Frankfurt (closest to India/Kerala)
   - **Branch**: `main`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
5. Add Environment Variables under **Environment**:
   - `MONGO_URI`: `mongodb+srv://jesni_admin:<password>@cluster0.mongodb.net/aerovate_science_db?retryWrites=true&w=majority`
   - `MY_GEMINI_KEY`: Your Gemini API Key from Google AI Studio
   - `TEACHER_PHONE`: `7736419753`
   - `TEACHER_NAME`: `Mrs. Jesni`
   - `SCHOOL_NAME`: `YAMANIYYA ENGLISH MEDIUM SCHOOL`
   - `APP_URL`: `https://aerovate-teach.onrender.com/`
6. Click **Deploy Web Service**! Render will build the Vite frontend into `dist`, start the Express server, connect to MongoDB Atlas, and launch your live site.

---

## 🔑 Login & Access Information

### 👩‍🏫 Teacher Room
- **Email**: `teacher@aerovate.org`
- **Password**: `jesni@teacher`
*(Fields are blank by default so the teacher types them manually)*
- **Dashboard Features**:
  - Live analytics: Total Science Chapters, Class 5A student count, Class 5B student count, and Average Score.
  - Class 5A & Class 5B student rosters showing real registered names, roll numbers, stars, and badges.
  - Gradebook with student submissions and score percentages.
  - Add new Science chapters and reset syllabus anytime.

### 🎒 Student Access (Class 5A & 5B)
- **New Students**: Click **"Student Login"** $\to$ **"New Student? Sign Up"**:
  - Enter Real Full Name (e.g. `Muhammed Bilal`)
  - Select Class Division (**Class 5A** or **Class 5B**)
  - Enter School Roll Number (e.g. `1`, `2`, `14`)
  - Pick a fun learning avatar emoji (🦁, 🐯, 🚀, 💎...)
- **Registered Students**: Choose **Class 5A** or **5B** and enter Roll Number to log in.
- Sessions are saved in the browser so students and teachers remain logged in on page refresh!

---

## 📚 Science Curriculum Included

1. **Chapter 1: Rocks and Minerals (പാറകളും ധാതുക്കളും)**
   - All 7 sections transcribed directly from the Class 5 textbook:
     - 1. What are Minerals? (Earth's crust, mining, ores)
     - 2. Metallic vs Non-Metallic Minerals + **Quick Check 1 Sorting Game**
     - 3. Earth's 3 Layers (Crust, Mantle, Core)
     - 4. Igneous Rocks (Magma, Lava, Granite, Pumice that floats on water, Basalt, Obsidian)
     - 5. Sedimentary Rocks (Sediments, Fossils, Sandstone Red Fort, Limestone chalk, Shale, Conglomerate)
     - 6. Metamorphic Rocks (Shale $\to$ Slate, Limestone $\to$ Marble Taj Mahal, Quartzite, Gneiss) + **Quick Check 2 Matcher** + **Rock Detective Mystery Game**
     - 7. Fossil Fuels (Coal & Petroleum) + **Mini Debate** + **Interactive Vocabulary Flashcards**
2. **Chapter 2: Living World & Ecosystems (ജീവികളുടെ ലോകം)**
3. **Chapter 3: States of Matter & Properties of Air (പദാർത്ഥങ്ങളുടെ അവസ്ഥകൾ)**
4. **Chapter 4: Simple Machines & Energy (ലളിത യന്ത്രങ്ങൾ)**

---

## 📞 Support & Helpline

- **Teacher Lead**: Mrs. Jesni
- **School**: YAMANIYYA ENGLISH MEDIUM SCHOOL
- **Direct Phone & WhatsApp**: **+91 7736419753**
