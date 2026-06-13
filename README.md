# 🚀 Secure Online Judge (MERN + Docker + Agentic AI)

A high-performance, secure Online Judge platform built for competitive programming. This system evaluates user-submitted code against hidden test cases in a secure, containerized execution environment while providing intelligent, Socratic feedback via an Agentic AI Mentor.

## 🏗️ High-Level System Architecture

This project is built using a modern MERN stack with a strong focus on secure remote code execution and LLM integration.

* **Frontend:** React (Vite), Monaco Editor (for VS Code-like syntax highlighting).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas (Mongoose).
* **Execution Engine:** Docker (Containerized Linux environment).
* **AI Integration:** Langchain / OpenAI API for state-driven code review.
* **Security:** JWT (JSON Web Tokens) for route protection, bcrypt.js for password hashing.

## 🔐 Core Features

1. **Secure Polyglot Sandbox (Remote Code Execution):** 
   * Supports **C, C++, Java, and Python**.
   * When a user submits code, the Node.js backend spins up an isolated **Docker** container.
   * The container executes the code against hidden `.txt` inputs.
   * The container is strictly cut off from internet access (`--network none`) to prevent malicious network calls.
   * The container is immediately destroyed (`--rm`) after execution to preserve system memory.
2. **Agentic AI Mentor:** If a submission fails, the AI analyzes the code against the expected output to provide strictly Socratic, Markdown-formatted hints without revealing the exact solution.
3. **Global Leaderboard:** Real-time ranking system aggregating user submission data via efficient Mongoose queries.
4. **Strict Evaluation:** The engine automatically trims trailing whitespaces and carriage returns to ensure highly accurate "Accepted" or "Wrong Answer" verdicts.

## 🚀 How to Run Locally

### Prerequisites
* Node.js installed
* MongoDB Atlas connection string
* Docker Desktop installed and running
* OpenAI API Key (or equivalent LLM key)

### 1. Start the Backend
```bash
cd backend
npm install
# Create a .env file with PORT, MONGO_URI, JWT_SECRET, and OPENAI_API_KEY
npm run dev
\`\`\`

### 2. Start the Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

---
*Built by Vibhu Tomer*