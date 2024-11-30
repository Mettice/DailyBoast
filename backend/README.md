# Daily Joy Backend

Backend API for the Daily Joy application.

## API Endpoints

### Compliments

```
POST /api/generate-compliment
GET /api/health
POST /api/compliment-feedback
```

## Environment Variables

```env
PORT=3001
OPENAI_API_KEY=your_key_here
REDIS_URL=redis://localhost:6379
```

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

## Deployment

```bash
npm run build
npm start
```