// src/users.server.ts
import { Router, Request, Response } from 'express';
import { UsersService, User } from './users.service';



// Create and configure the router
const userRouter = Router();
const usersService = new UsersService();

// GET /api/users -> List all users
userRouter.get('/', (req: Request, res: Response<User[]>) => {
  res.json(usersService.findAll());
});

// GET /api/users/:id -> Get user by ID
userRouter.get('/:id', (req: Request, res: Response<User | { message: string }>) => {
  const user = usersService.findById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
});

// POST /api/users -> Create a new user
userRouter.post('/', (req: Request, res: Response<User>) => {
  const newUser = usersService.create(req.body);
  res.status(201).json(newUser);
});

// PUT /api/users/:id -> Update existing user
userRouter.put('/:id', (req: Request, res: Response<User | { message: string }>) => {
  const updated = usersService.update(req.params.id, req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ message: 'User not found' });
});

// DELETE /api/users/:id -> Delete user
userRouter.delete('/:id', (req: Request, res: Response) => {
  const ok = usersService.delete(req.params.id);
  if (ok) res.status(204).send();
  else res.status(404).json({ message: 'User not found' });
});

// Export as default so server.ts can import without braces
export default userRouter;
