## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/luffarshack.git
   cd luffarshack
   ```

2. Install dependencies for the frontend and backend:

   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```

3. Create environment variable files:

   ```bash
   cp .env.example .env
   cd backend
   cp .env.example .env
   cd ..
   ```

4. Update the `.env` files with your configuration.

### Running the Application

1. Start the development servers:

   ```bash
   npm run dev
   ```

   This will start both the Next.js frontend and the backend server.

2. Open your browser and navigate to `http://localhost:3000`.

### Project Structure

- `src/`: Contains the frontend code.
- `backend/`: Contains the backend code.
- `.env`: Environment variables for the frontend.
- `backend/.env`: Environment variables for the backend.
