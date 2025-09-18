# 🗳️ Blockchain Voting App

A **full-stack blockchain-inspired voting system** with:

- **Backend**: Spring Boot, Spring Data JPA, MySQL
- **Frontend**: React + Vite + Tailwind CSS
- **Database**: MySQL (with Workbench for management)

This app provides a simple yet secure way to cast and track votes.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup](#-setup)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Available Scripts](#-available-scripts)
- [Documentation Links](#-documentation-links)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

- 🖥️ **Backend**: REST APIs with Spring Boot & MySQL
- 🎨 **Frontend**: Responsive UI with React + TailwindCSS
- 📊 **Database**: MySQL relational storage
- 🔒 DTOs for safe request/response handling
- ✅ JUnit testing for backend logic

---

## 🛠 Tech Stack

### Backend

- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- MySQL + MySQL Workbench
- Maven

### Frontend

- React
- TailwindCSS
- Vite
- ESLint

---

## ⚙️ Setup

### Prerequisites

- [Java 17+](https://adoptium.net/)
- [Maven 3.8+](https://maven.apache.org/)
- [MySQL 8+](https://dev.mysql.com/downloads/)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 📥 Installation

### 1. Clone the repository

    ```bash
    git clone https://github.com/your-username/blockchain-voting-app.git
    cd blockchain-voting-app
    2. Backend Setup
    Create MySQL database:

    sql
    Copy code
    CREATE DATABASE voting_app_db;
    Update database credentials in backend/voting-app/src/main/resources/application.yml:

    yaml
    Copy code
    spring:
    datasource:
        url: jdbc:mysql://localhost:3306/voting_app_db
        username: root
        password: yourpassword
    jpa:
        hibernate:
        ddl-auto: update
        show-sql: true
    Build backend:

    bash
    Copy code
    cd backend/voting-app
    ./mvnw clean install
    3. Frontend Setup
    bash
    Copy code
    cd frontend
    npm install
    ▶️ Running the Application
    Start Backend (Spring Boot)
    bash
    Copy code
    cd backend/voting-app
    ./mvnw spring-boot:run
    Backend runs at 👉 http://localhost:8080

    Start Frontend (React + Vite)
    bash
    Copy code
    cd frontend
    npm run dev
    Frontend runs at 👉 http://localhost:5173 (default for Vite)

    📡 Available Scripts
    Backend
    ./mvnw spring-boot:run → Run backend

    ./mvnw test → Run tests

    Frontend
    npm run dev → Start dev server

    npm run build → Build production files

    npm run preview → Preview production build

    npm test → Run frontend tests (if configured)

    📡 API Endpoints (Sample)
    Method	Endpoint	Description
    POST	/api/votes	Cast a new vote
    GET	/api/votes	Get all votes
    GET	/api/votes/{id}	Get vote by ID

    📑 Documentation Links
    Backend Setup Guide

    Frontend Setup Guide

    API Reference

    Database Schema

    (👉 You can create these docs/ files in your repo for extended details)

    🤝 Contributing
    Fork the repo

    Create a feature branch (git checkout -b feature/awesome-feature)

    Commit changes (git commit -m "Add feature")

    Push to branch (git push origin feature/awesome-feature)

    Open a Pull Request 🎉
