# LEAP Interview Assessment Project

A full-stack web application built with **Next.js 15**, **React 19**, **Tailwind CSS 4**, **TypeScript**, and **Drizzle ORM**, backed by **Neon PostgreSQL**. This app enables users to interact with a Large Language Model (LLM) and manage the generated responses through a simple CRUD interface.

---

### You can view the live demo of the project here: [https://leap.richard-lee.com](https://leap.richard-lee.com).

👉 [Watch the demo video](https://github.com/richard875/LEAP-Project/raw/main/doc/leap-demo.mp4)

<img src="https://raw.githubusercontent.com/richard875/LEAP-Project/refs/heads/main/doc/leap-cover.jpg" alt="Cover" width="1800"/>

---

## 🧠 Objective

Build a modern full-stack app that allows users to:

- Submit prompts to a Large Language Model (e.g., OpenAI)
- Display the generated results
- Perform Create, Read, Update, and Delete operations on stored results

---

## 🚀 Tech Stack

| Technology                                    | Version | Purpose                                |
| --------------------------------------------- | ------- | -------------------------------------- |
| [Next.js](https://nextjs.org/)                | 15      | App framework (with Turbopack for dev) |
| [React](https://reactjs.org/)                 | 19      | Frontend UI library                    |
| [Tailwind CSS](https://tailwindcss.com/)      | 4       | Utility-first CSS framework            |
| [Drizzle ORM](https://orm.drizzle.team/)      | latest  | Type-safe ORM for SQL                  |
| [Neon](https://neon.tech/) PostgreSQL         | -       | Serverless Postgres database           |
| [fortawesome](https://fontawesome.com/)       | 6       | Icon library                           |
| [TypeScript](https://www.typescriptlang.org/) | -       | Type-safe development                  |

---

## 📂 Project Structure

```
src/
├── app/           # Next.js App Router (pages, layouts, routes)
├── components/    # Reusable and shared React components
├── context/       # React context providers for global state
├── enums/         # TypeScript enums used across the app
├── lib/           # Utility functions, API clients, helpers
├── mock/          # Mock data for testing and development
└── types/         # TypeScript type definitions and interfaces
```

---

## 🛠️ Scripts

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Run development server with Turbopack |
| `npm run build`      | Build the production app              |
| `npm run start`      | Start the production server           |
| `npm run test`       | Run test suite with Jest              |
| `npm run test:watch` | Run Jest in watch mode                |
| `npm run lint`       | Lint the codebase                     |
| `npm run lint:fix`   | Auto-fix lint issues                  |

---

## 🔧 Setup Instructions

1. **Clone the repo**

   ```bash
   git clone git@github.com:richard875/LEAP-Project.git
   cd LEAP-Project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:

   ```env
   OPENAI_API_KEY=your_openai_key
   DATABASE_URL=your_neon_postgres_connection_url
   ```

4. **Run the dev server**

   ```bash
   npm run dev
   ```

---

## 💬 Features

- Prompt submission to an LLM (e.g., OpenAI's ChatGPT)
- Render LLM responses in a readable format
- Store, edit, delete, and view past interactions
- Responsive, accessible UI with Tailwind
- Icon support via Font Awesome

---

## 🧪 Testing

Unit tests are powered by **Jest**. To run the tests:

```bash
npm run test
```

---

## 📘 Future Enhancements

- Authentication with NextAuth or Clerk
- Prompt history filtering or search

---

## 📝 License

This project is for assessment purposes only and is not licensed for production use.
