# 🎓 Aerovate - Class 5 Kerala Teacher's Teaching Platform (MERN Stack)

A complete, production-ready MERN stack educational platform built for Class 5 teachers and students in Kerala. Features bilingual (English + Malayalam) curriculum support, interactive science simulations, chapter reader, animated quizzes with stars and badges, teacher gradebook, and direct WhatsApp teacher assistance.

> **Teacher Helpline & Support**: Mrs. Anitha Kumar · Phone: **+91 7736419753**

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express.js (in `/server`)
- **Database**: MongoDB Atlas with Mongoose ODM (`process.env.MONGO_URI` with built-in in-memory fallback)
- **Design System**: Blue `#2563eb`, Yellow `#facc15`, Green `#22c55e`, Google Font **Poppins** & **Noto Sans Malayalam**

---

## 🚀 How to Host on Replit (Step-by-Step)

### Step 1: Import this Repository to Replit
1. Open your browser and go to [https://replit.com](https://replit.com).
2. Click **Create Repl** (+ button).
3. Select **Import from GitHub** (or drag and drop your exported project files).
4. Choose **Node.js** as the template if prompted.

### Step 2: Set up a Free MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free shared cluster (M0 free tier).
2. Under **Database Access**, create a user (e.g. `aerovate_user`) and a secure password.
3. Under **Network Access**, add IP address `0.0.0.0/0` (allow access from anywhere, required for Replit dynamic IPs).
4. Click **Connect** > **Drivers** (Node.js) and copy the connection string:
   ```text
   mongodb+srv://aerovate_user:<password>@cluster0.xyz.mongodb.net/aerovate_teaching_db?retryWrites=true&w=majority
   ```
   *(Replace `<password>` with your database user password)*

### Step 3: Add `MONGO_URI` in Replit Secrets (Environment Variables)
1. In your Replit editor, look at the left sidebar and click on **Tools** > **Secrets** (the 🔒 padlock icon).
2. Click **New Secret** or **Add Secret**:
   - **Key**: `MONGO_URI`
   - **Value**: Your MongoDB Atlas connection string from Step 2
3. Add a second secret (optional):
   - **Key**: `PORT`
   - **Value**: `5000`
4. Add teacher contact secret (optional, defaults to teacher's number):
   - **Key**: `TEACHER_PHONE`
   - **Value**: `7736419753`

### Step 4: Run the Application
1. In the Replit **Shell** / **Console**, install dependencies (if not done automatically):
   ```bash
   npm install
   ```
2. Build the client bundle:
   ```bash
   npm run build
   ```
3. Start the production server:
   ```bash
   npm start
   ```
   *Or for full live dev with hot reloads, run:*
   ```bash
   npm run dev
   ```
4. Replit will automatically open the Webview with the live application!

---

## 🔑 Login Credentials

### 👩‍🏫 Teacher Login
- **Email**: `teacher@aerovate.org` *(or your own email)*
- **Password**: `aerovate123`
- **Features**: Real-time stats, Add/Edit/Delete Chapters, Create Quizzes, View Student Roster, Gradebook, Reset Curriculum

### 🎒 Student Login (Super Easy for Class 5 Kids!)
- **Name**: e.g., `Aadhya Menon` or `Rahul Nair`
- **Roll Number**: Any number (e.g., `1`, `2`, `3`, `12`)
- **Features**: Interactive chapter reading, 3D rock classification game, Rock Detective challenge, bilingual voice read-aloud, instant quiz scoring with stars and badges, direct WhatsApp teacher ask button (`+91 7736419753`).

---

## 📁 Project Directory Structure

```text
├── server/                    # Node.js + Express Backend
│   ├── models/                # Mongoose Models
│   │   ├── Chapter.js         # Chapter schema & bilingual content
│   │   ├── Quiz.js            # Quiz questions, answers & badges
│   │   ├── Student.js         # Student profiles & stars
│   │   └── Submission.js      # Student quiz answers & scorecards
│   ├── routes/
│   │   └── api.js             # REST API routes (/api/*)
│   ├── db.js                  # MongoDB Atlas connection + in-memory fallback
│   ├── seedData.js            # Class 5 Rocks & Minerals curriculum
│   └── server.js              # Standalone Express server for Replit
├── src/                       # React 19 Frontend
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.tsx         # Bilingual header & role switch
│   │   ├── RockDetective.tsx  # Interactive rock guessing game
│   │   ├── MineralClassifier.tsx # Metallic vs Non-metallic drag/tap game
│   │   └── AudioReader.tsx    # Text-to-speech audio reader
│   ├── pages/                 # Application Views
│   │   ├── StudentHome.tsx    # Kid-friendly dashboard & subject picker
│   │   ├── ChapterView.tsx    # Interactive lesson reader (Rocks & Minerals)
│   │   ├── QuizView.tsx       # 10-Question animated quiz
│   │   ├── TeacherDashboard.tsx # Teacher stats, chapter editor & gradebook
│   │   └── TeacherLogin.tsx   # Teacher sign-in
│   ├── types.ts               # Shared TypeScript definitions
│   ├── App.tsx                # App routing & context state
│   ├── main.tsx               # Client entry point
│   └── index.css              # Tailwind CSS v4 styling & Poppins font
├── .env.example               # Template environment configuration
├── package.json               # Full-stack dependencies & scripts
├── server.ts                  # Development server with Vite middleware
├── tsconfig.json              # TypeScript compilation rules
├── vite.config.ts             # Vite configuration with API proxy
└── README.md                  # This guide
```

---

## 📞 Teacher & Institution Contact

- **Institution**: Aerovate Learning Platform
- **Teacher**: Mrs. Anitha Kumar
- **Direct Phone & WhatsApp**: **+91 7736419753**
- **Syllabus**: Kerala State Board & CBSE Class 5 Science (EVS)
