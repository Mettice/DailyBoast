import path from 'path';
import dotenv from 'dotenv';
import app from './server';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = '0.0.0.0';

console.log('Environment:', {
  PORT,
  HOST,
  OPENAI_KEY_EXISTS: !!process.env.OPENAI_API_KEY,
  NODE_ENV: process.env.NODE_ENV
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
}); 