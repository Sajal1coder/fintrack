# 💸 FinTrack - Personal Finance Tracker

**FinTrack** is a modern, full-stack personal finance tracker that helps users seamlessly manage their income, expenses, budgets, and savings goals. It supports real-time bank sync, CSV transaction imports, and automatic expense categorization—making budgeting and money management effortless.

---

## 📸 Screenshots

| Bank sync | Dashboard | Login Page |
|----------|---------------------|-------------|
| ![Screenshot (61)](https://github.com/user-attachments/assets/280ba8f3-cc82-4fc5-bcde-e15cc85e65f7) |![Screenshot (60)](https://github.com/user-attachments/assets/2d0849bf-dad1-4cf4-9cbc-7b40b99bdb4b)|![Screenshot (59)](https://github.com/user-attachments/assets/8d47c9be-8cb7-4f7c-aee4-ce13637d3969) |

---

## 🚀 Features

- 🔐 **Secure Authentication**  
  User registration, login, and JWT-based session management with bcrypt encryption.

- 🏦 **Bank Account Sync + CSV Import**  
  Sync transactions directly from bank APIs or upload CSV files for bulk import.

- 🧠 **Auto-Categorization**  
  Automatically classify expenses based on description and predefined rules.

- 📊 **Visual Dashboard**  
  Interactive charts and stats for spending trends, savings, and budgets.

- 💼 **Expense & Income Tracking**  
  Log and view all financial transactions in one place, with filters and sorting.

- 🎯 **Goals & Budgets**  
  Set monthly budgets and track progress towards saving goals.

---

## 🛠️ Tech Stack

**Frontend**:  
- React.js  
- TailwindCSS  
- Chart.js / Recharts
- Typescript

**Backend**:  
- Node.js  
- Express.js  

**Database**:
- PostgreSQL with Prisma
ORM

**Library**:
- React Query
-  Zod
-  React
   
---

## 📂 Folder Structure

```
fintrack/
├── app/              # React frontend
├── components/              # Node.js backend
├── db/         # Project screenshots (for README)
├── .env.example         # Sample environment variables
└── README.md
└── features
└──hooks
└──providers
```

---

## 🧪 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Sajal1coder/fintrack.git
cd fintrack
```

2. **Setup**

```bash
npm install
npm start
```

3. **Environment Variables**

Create a `.env` file in `server/` using `.env.example` as a template. Add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_APP_URL=http://localhost:3000

DATABASE_URL=postgresql://
PLAID_CLIENT_TOKEN=
PLAID_SECRET_TOKEN=

LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_PRODUCT_ID=
```

---

## 🧾 License

This project is open-source and available under the MIT License.

---

## 🙌 Acknowledgements

Built with ❤️ by [Sajal Kumar Baranwal](https://github.com/Sajal1coder)
