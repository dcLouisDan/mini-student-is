# Mini School Information System (MSIS)

This application is a mini school information system developed as a practical programming exam for SearchWorks.Ph.

Submitted By: Dan Louis M. Dela Cruz

## 🚀 Live Demos

- **Frontend:** [https://msis.danlouis.dev](https://msis.danlouis.dev) (Vercel)
- **Backend API:** [https://msis-api.danlouis.dev](https://msis-api.danlouis.dev) (Render.com)

> **Note:** The backend server uses Render's free tier, so it may take a while to start up if it has been idle. You can check if the server is awake by visiting the backend API URL.

## 🛠️ Tech Stack

This project is a monorepo powered by **TurboRepo** and uses the following technologies:

- **Frontend:** Next.js, TypeScript, TailwindCSS
- **Backend:** AdonisJS, TypeScript
- **Database:** PostgreSQL

## 💻 Getting Started (Local Development)

### Backend Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd apps/backend
   ```
2. Install dependencies (use the `--legacy-peer-deps` flag):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Copy the example environment file and fill in the values:

   ```bash
   cp .env.example .env
   ```

   _Example `.env` configuration:_

   ```env
   TZ=UTC
   PORT=3333
   HOST=localhost
   APP_URL=http://localhost:3333
   LOG_LEVEL=info
   APP_KEY=
   NODE_ENV=development
   SESSION_DRIVER=cookie

   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_USER=root
   DB_PASSWORD=root
   DB_DATABASE=app
   ```

4. Ensure your PostgreSQL database is running and credentials match your `.env` file.
5. Run database migrations:
   ```bash
   node ace migration:run
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd apps/frontend
   ```
2. Install dependencies (use the `--legacy-peer-deps` flag):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Copy the example environment file and configure the API URL:
   ```bash
   cp .env.example .env
   ```
   _Example `.env` configuration:_
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3333"
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🔐 Default Admin Credentials

To access the admin features, use the following default credentials (after seeding the database):

- **Email:** `admin@email.com`
- **Password:** `password`

## 🗄️ Database Management (Migrations & Seeding)

Migrations and seeding are handled by AdonisJS.

### Running Migrations

From the `apps/backend` directory (in production, use `apps/backend/build`):

```bash
node ace migration:run
```

### Running Seeders

Available seeders: `admin_seeder`, `course_seeder`, `student_seeder`, `subject_seeder`.

To run all seeders:

```bash
node ace db:seed
```

To run a specific seeder interactively:

```bash
node ace db:seed --i
```

## ⚙️ System Logic & Validation Rules

### Subject Prerequisites Checking

A prerequisite subject is considered "passed" if the student has a grade record related to the subject with a final grade higher than or equal to the passing grade indicated in the `subjects` table.

When a student reserves a subject, the system fetches and validates the subjects they are eligible for based on these prerequisites.

_Sample Error Payload:_

```json
{
  "errors": {
    "subjectIds": ["Invalid subjects detected"]
  },
  "meta": {
    "invalidIds": [
      {
        "id": "1",
        "message": "Unrelated course"
      },
      {
        "id": "2",
        "message": "Unmet prerequisites"
      }
    ]
  }
}
```

### Circular Dependency Check for Subject Prerequisites

When assigning a subject as a prerequisite for another subject, the system ensures no circular dependencies exist.

It uses a **Depth-First Search (DFS)** algorithm to detect cycles. The prerequisite graph is cached and automatically invalidated when database changes are made.

_Core Implementation:_

```typescript
async checkForCircularDependency(subjectId: string, prerequisiteId: string): Promise<boolean> {
  const graph = await this.getGraph()

  const visited: Record<string, boolean> = {}
  const stack: string[] = [prerequisiteId]

  while (stack.length > 0) {
    const currentNode = stack.pop()

    if (!currentNode) continue

    if (currentNode === subjectId) {
      console.log('DETECTED CIRCULAR DEPENDENCY')
      return true
    }

    if (visited[currentNode]) continue

    visited[currentNode] = true

    if (graph[currentNode]) {
      for (const prereq of graph[currentNode]) {
        stack.push(prereq)
      }
    }
  }

  return false
}
```

## 🌍 Production Deployment Commands

When deploying to production, follow these steps with the `apps/backend` as the root directory:

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Copy the `package-lock.json` file from the root directory into the generated `build` directory.
4. Copy `.env.example` to `.env` and configure accordingly. _(If the server doesn't auto-handle env vars, copy it to the `build` directory as well)._
5. Run migrations (force execution in production):
   ```bash
   node ace migration:run --force
   ```
6. Start the production server:
   ```bash
   node build/bin/server.js
   ```
