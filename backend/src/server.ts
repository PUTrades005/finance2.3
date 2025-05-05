// src/server.ts
import express from 'express';
import userRouter from './users.server';


const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Mount your user routes at /api/users
app.use('/api/users', userRouter);

// Optional base route for testing
app.get('/', (req, res) => {
  res.send('Backend is live!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
