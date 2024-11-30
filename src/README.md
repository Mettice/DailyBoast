# Daily Joy - Compliment Generator App

A modern web application that generates personalized compliments based on mood and categories.

## Features

- 🎯 Personalized compliments based on categories and moods
- 🌍 Multi-language support
- 🔐 Authentication integration
- 🏆 Achievement system
- 📚 Collections feature

## Project Structure
```
compliment-app/
├── src/               # Frontend source code
├── backend/           # Backend API
├── public/            # Static assets
└── docs/             # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- Redis

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:

Frontend (.env):
```env
VITE_API_URL=http://localhost:3001
```

Backend (.env):
```env
PORT=3001
OPENAI_API_KEY=your_key_here
REDIS_URL=redis://localhost:6379
```

### Development

Start frontend:
```bash
npm run dev
```

Start backend:
```bash
cd backend
npm run dev
```

## Deployment

The app is configured for deployment on Vercel (frontend) and your preferred backend host.

### Frontend Deployment
```bash
npm run build
vercel deploy
```

### Backend Deployment
```bash
cd backend
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License