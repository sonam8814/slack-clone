# slack-clone

A real-time team collaboration platform inspired by Slack.

## Tech Stack

### Backend
- **Node.js** with **Express** - REST API server
- **TypeScript** - Type safety
- **Prisma ORM** - PostgreSQL database access
- **Socket.io** - Real-time WebSocket communication
- **JWT** - Authentication
- **Cloudinary** - File/media uploads

### Frontend
- **Next.js** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management

## Project Structure

```
slack-lite/
├── client/                  # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # React components
│   │   ├── context/        # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utility libraries
│   │   ├── store/          # Zustand state
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets
└── server/                  # Express backend
    ├── src/
    │   ├── config/         # Configuration (database, cloudinary)
    │   ├── controllers/    # Request handlers
    │   ├── middleware/      # Express middleware
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic
    │   ├── socket/          # Socket.io handlers
    │   ├── types/           # TypeScript types
    │   └── utils/           # Utility functions
    └── prisma/             # Prisma schema
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd slack-lite
   ```

2. **Configure environment variables**

   Create a `.env` file in the `server/` directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/slack_lite"
   JWT_SECRET="your-jwt-secret"
   ```

3. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

4. **Initialize the database**
   ```bash
   cd server
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

## Recent Changes

### Message Component with Timestamp Display

**Added:** `client/src/components/chat/Message.tsx`

A reusable React component for displaying chat messages with:
- User avatar (or initials placeholder)
- User name
- Message content
- Formatted timestamp

**Timestamp formatting:**
- Today's messages: Shows time only (e.g., "2:30 PM")
- Older messages: Shows date and time (e.g., "Mar 15, 2:30 PM")

**Testing the component:**

```tsx
import { Message } from "./components/chat/Message";
import { MessageEvent } from "../../server/src/types";

const testMessage: MessageEvent = {
  id: "1",
  content: "Hello, world!",
  channelId: "general",
  userId: "user-1",
  user: { id: "user-1", name: "John Doe" },
  createdAt: new Date(),
};

function App() {
  return <Message message={testMessage} />;
}
```

## Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prisma:studio` - Open Prisma database GUI

### Frontend
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## License

ISC