<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Task Manager API — NestJS</h1>

<p align="center">A secure RESTful API for managing personal tasks, featuring JWT-based authentication, full CRUD operations, and PostgreSQL integration via TypeORM.</p>

<p align="center">
<img src="https://img.shields.io/badge/NestJS-11.x-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/TypeORM-0.3.x-FE0902?style=for-the-badge" alt="TypeORM" />
<img src="https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge&logo=jsonwebtokens" alt="JWT" />
<img src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge" alt="Status" />
</p>

## Features

- 🔐 User registration & login with hashed passwords (bcrypt)
- 🔑 JWT-based authentication via Passport strategy + guards
- ✅ Full CRUD for tasks (Create, Read, Update, Delete)
- 🗄️ PostgreSQL database with TypeORM entities (auto-synced schema)
- 🧩 Modular architecture (modules / controllers / services)
- 🛡️ DTO-based request validation with `class-validator`
- 👤 User-scoped data — tasks are tied to the logged-in user only

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | TypeORM |
| Auth | JWT (`@nestjs/jwt`, Passport) + bcrypt |
| Validation | class-validator / class-transformer |
| Testing | Postman |

## Project Structure
src/
├── main.ts
├── app.module.ts
├── auth/
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ ├── jwt.strategy.ts
│ ├── jwt-auth.guard.ts
│ └── dto/
├── users/
│ ├── users.controller.ts
│ ├── users.service.ts
│ └── entities/user.entity.ts
└── tasks/
├── tasks.controller.ts
├── tasks.service.ts
├── entities/task.entity.ts
└── dto/

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Installation

```bash
git clone https://github.com/sheikhsaraahmed/task-manager-api-nest.js.git
cd task-manager-api-nest.js
npm install
```

Create a `.env` file in the root:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=task_manager_nest
JWT_SECRET=your_jwt_secret
PORT=5000
```

Create the database:
```bash
psql -U postgres -c "CREATE DATABASE task_manager_nest;"
```

Run the server:
```bash
npm run start:dev
```

Server runs at `http://localhost:5000` — tables are auto-created from entities on first run.

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Log in and receive a JWT | No |

**Register — Request Body**
```json
{
  "name": "Sara",
  "email": "sara@test.com",
  "password": "test1234"
}
```

**Login — Response**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tasks
*(All routes below require a `Bearer <token>` in the `Authorization` header)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks for the logged-in user |
| GET | `/tasks/:id` | Get a single task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

**Create Task — Request Body**
```json
{
  "title": "Finish internship project",
  "description": "Build REST API with NestJS",
  "status": "pending",
  "due_date": "2026-07-15"
}
```

## Database Schema

**users**
| Column | Type |
|---|---|
| id | auto-increment (PK) |
| name | string |
| email | string (unique) |
| password | string (hashed) |

**tasks**
| Column | Type |
|---|---|
| id | auto-increment (PK) |
| title | string |
| description | text |
| status | enum (`pending`, `in-progress`, `completed`) |
| due_date | date |
| user_id | integer (FK → users.id, `ON DELETE CASCADE`) |
| created_at / updated_at | timestamps |

## Testing

This API was tested end-to-end using **Postman** — covering registration, login, and all task CRUD operations with JWT-protected routes.

## Author

**Sara Ahmed**
[GitHub](https://github.com/sheikhsaraahmed)

## License

ISC