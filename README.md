# MindBridge

MindBridge is a modern, responsive, and bilingual (English/Chinese/French) content platform that bridges traditional community knowledge sharing with advanced AI capabilities. It features an Article hub, a Q&A community, and role-based administration, all enhanced by the Google Gemini API.

## 🚀 Key Features

### 🧠 AI-Powered Capabilities
*   **Smart Summarization:** Instantly generate concise summaries for long articles using `gemini-2.5-flash`.
*   **AI Answers:** Users can request an AI-generated answer for any community question, providing immediate assistance before human experts weigh in.

### 📚 Content Management (Articles)
*   **Categorized Feed:** Browse articles by topics (Technology, Lifestyle, Science, Finance).
*   **Rich Interaction:** View counters, like system, and a fully functional comment section.
*   **Dynamic Filtering:** Filter content by specific categories without page reloads.
*   **Pagination:** Efficiently handles large lists of content.

### 💬 Community Q&A
*   **Ask & Answer:** Users can post questions and the community (or AI) can provide answers.
*   **Status Tracking:** Visual indicators for "Solved" vs "Open" questions.
*   **Rich Editor:** Clean text areas for detailed problem descriptions and solutions.

### 🌍 Internationalization (i18n)
*   **Multi-language Support:** seamless switching between **English**, **Chinese (Simplified)**, and **French**.
*   **Contextual Adaptation:** Not just UI labels—mock content (articles and questions) dynamically regenerates to match the selected language.

### 🔐 Authentication & Roles
*   **Simulated Auth System:** Supports Login and Registration flows.
*   **Social Login UI:** Integration points for Google, Apple, and Microsoft authentication.
*   **Role-Based Access Control (RBAC):** Distinction between standard `User` and `Admin` roles.
*   **Admin Dashboard:** A dedicated protected route for administrators to manage/delete content.

## 🛠️ Tech Stack

*   **Frontend Framework:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM v7
*   **AI Integration:** Google GenAI SDK (`@google/genai`)
*   **Icons:** Lucide React
*   **State Management:** React Context API (Store)

## 📂 Project Structure

```
/
├── index.html              # Entry point & Import Maps
├── index.tsx               # React Root mount
├── App.tsx                 # Routing configuration
├── types.ts                # TypeScript interfaces & enums
├── store.tsx               # Global State (Context) & Mock Data
├── services/
│   └── geminiService.ts    # Google Gemini API configuration
├── components/
│   └── Layout.tsx          # Navbar, Footer, & Responsive Wrapper
└── pages/
    ├── Login.tsx           # Auth & Social Login UI
    ├── ArticleList.tsx     # Grid view of articles
    ├── ArticleDetail.tsx   # Single article view + AI Summary
    ├── QAList.tsx          # List of questions + Ask Modal
    ├── QADetail.tsx        # Single question view + AI Answer
    └── AdminDashboard.tsx  # Content management (Protected)
```

## ⚡ Getting Started

### Prerequisites
To utilize the AI features, you must have a valid Google Gemini API Key available in your environment variables as `process.env.API_KEY`.

### Installation
1.  Clone the repository.
2.  Ensure your environment supports ES Modules.
3.  Open `index.html` in a modern browser or serve via a local server.

### Usage Guide

#### 1. Authentication
*   **Standard User:** Log in with any email (e.g., `user@example.com`) to comment, ask questions, and upvote.
*   **Admin Access:** Log in with an email containing "admin" (e.g., **`admin@test.com`**) to access the Admin Dashboard in the navigation bar.

#### 2. Using AI Features
*   **Article Summary:** Navigate to any article detail page and click the **"AI Summary"** button (Sparkles icon).
*   **Q&A Answer:** Open a question and click **"AI Answer"** to have Gemini analyze the question and propose a solution.

#### 3. Switching Languages
Click the language indicator (e.g., "EN", "ZH") in the top navigation bar to cycle through available languages.

## 🎨 Design System

The application uses a clean, "Inter" font-based typography system with a slate/blue color palette.
*   **Primary Color:** Blue-600
*   **Backgrounds:** Slate-50 (App), White (Cards)
*   **Accessibility:** High contrast text and clear focus states on form inputs.

---
© 2024 MindBridge