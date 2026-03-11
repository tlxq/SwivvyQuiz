# 📱 SwivvyQuiz

---

# 🚀 Features

- 🔎 Search functionality
- 📋 List view with API data
- 📄 Detail view with dynamic routing
- ⏳ Loading states
- ❌ Error handling
- 📱 Mobile-friendly UI

---

# 🧰 Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- Fetch API

---

# 🌐 API

API used in this project:

**Open Trivia Database (OTDB)**

Example endpoints:

    GET https://opentdb.com/api.php?amount=10&type=boolean
    GET https://opentdb.com/api_category.php

Example response:

```json
{
  "response_code": 0,
  "results": [
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The logo for Snapchat is a bell.",
      "correct_answer": "False",
      "incorrect_answers": ["True"]
    }
  ]
}
```

---

# 🧠 Technical Decisions

## Expo Router

Used for file-based routing to simplify navigation between screens.

## TypeScript

Used for type safety with custom path aliases (e.g., `@app-types/` for internal types).

## Service Layer

API calls are separated into services to follow the **DRY principle**
and keep components clean.

---

# 🗂 Project Structure

    /src
       /app           # Expo Router screens
       /components    # Reusable UI components
       /features      # Feature-based logic and screens
       /hooks         # Custom React hooks
       /services      # API and Firebase logic
       /theme         # Theme configuration
       /types         # TypeScript definitions
       /utils         # Helper functions and logger

**Explanation:**

- `src/app/` → Routing and layout
- `src/features/` → Modular feature screens (Quiz, Auth, Home)
- `src/services/` → API services (Quiz, Highscore, Auth)
- `src/types/` → Shared type definitions

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/tlxq/SwivvyQuiz.git
cd SwivvyQuiz
npm install
```

Start the project:

```bash
npx expo start
```

Open the project in **Expo Go**.

---

# 🧪 Error Handling

Examples:

- API errors handled with try/catch
- Loading state with `ActivityIndicator`
- Empty state when API returns no data

---

# 🎯 Learning Goals

- Working with external APIs
- Structuring a React Native project
- Using TypeScript with strict settings
- Handling loading and error states

---

# 📚 Sources

- React Native documentation
- Expo documentation
- API documentation
- TypeScript documentation

---

# 👤 Author

Tom Larsson

School project -- App Development
F25D - Yrkeshögskolan i Borås
2026
