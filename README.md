# 🎙️ Dalilk

<div align="center">

**A full-stack web application for audio capture, data persistence, and PDF report generation**

[![CI](https://github.com/Bassel610/Dalilk/actions/workflows/ci.yml/badge.svg)](https://github.com/Bassel610/Dalilk/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [License](#-license)
- [Author](#-author)

---

## 🔍 Overview

**Dalilk** is a full-stack JavaScript application that lets users record audio in the browser, persist data through a Firebase + Express backend, and export structured PDF reports. The project is split into a React frontend (`My-app/`) and a Node/Express backend (`My-backend/`).

## ✨ Features

- 🎙️ **Browser audio recording** powered by `react-mic` and `@saassy/audio-react-recorder`
- 🔥 **Firebase integration** for authentication and data storage
- 📄 **PDF generation** with `jspdf` + `jspdf-autotable` for tabular reports
- 🌐 **Express REST API** for server-side logic and persistence
- ⚡ **Vite** dev server for fast HMR and production builds
- 📱 **Responsive UI** with React Router for client-side navigation

## 🛠️ Tech Stack

**Frontend**
- React 18, React Router 6
- Vite (dev server + bundler)
- Axios for HTTP requests
- jsPDF + jspdf-autotable for PDF export
- react-mic / @saassy/audio-react-recorder for audio capture

**Backend**
- Node.js + Express 4
- Firebase 12 (Auth & Firestore)
- CORS, body-parser middleware

**Tooling**
- Lodash utilities
- Web Vitals reporting

## 📂 Project Structure

```
Dalilk/
├── My-app/         # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── package.json
├── My-backend/     # Express server
│   ├── server/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A Firebase project for backend persistence

### Installation

```bash
git clone https://github.com/Bassel610/Dalilk.git
cd Dalilk
```

**Run the frontend:**

```bash
cd My-app
npm install
npm start            # Vite dev server
```

**Run the backend (in a second terminal):**

```bash
cd My-backend
npm install
npm start            # Express server
```

### Environment Variables

Create a `.env` file inside `My-app/` with your Firebase config:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

## 📜 Available Scripts

Inside `My-app/`:

| Script | Description |
| --- | --- |
| `npm start` | Start Vite dev server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run start-server` | Run the bundled Express server (`server/server.js`) |

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

## 👤 Author

**Basel Sherif** — Front-end Developer

- 🐙 GitHub: [@Bassel610](https://github.com/Bassel610)
- 💼 LinkedIn: [basel-sherif-68330a217](https://www.linkedin.com/in/basel-sherif-68330a217)
- 📧 Email: [baselsherif9@gmail.com](mailto:baselsherif9@gmail.com)

---

<div align="center">

⭐ If you found this project useful, please consider giving it a star!

</div>
