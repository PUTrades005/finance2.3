// src/users.service.ts

import { Router, Request, Response } from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
}

let nextId = 1;
const users: User[] = [];

export class UsersService {
  findAll(): User[] {
    return users;
  }

  findById(id: number): User | undefined {
    return users.find(u => u.id === id);
  }

  create(data: Omit<User, 'id'>): User {
    const newUser: User = { id: nextId++, ...data };
    users.push(newUser);
    return newUser;
  }

  update(id: number, data: Partial<Omit<User, 'id'>>): User | null {
    const user = this.findById(id);
    if (!user) return null;
    Object.assign(user, data);
    return user;
  }

  delete(id: number): boolean {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
}

// Define and export the router here
const userRouter = Router();
const usersService = new UsersService();

userRouter.get('/', (req: Request, res: Response<User[]>) => {
  res.json(usersService.findAll());
});

userRouter.get('/:id', (req: Request, res: Response<User | { message: string }>) => {
  const id = parseInt(req.params.id, 10);
  const user = usersService.findById(id);
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});

userRouter.post('/', (req: Request, res: Response<User>) => {
  const newUser = usersService.create(req.body);
  res.status(201).json(newUser);
});

userRouter.put('/:id', (req: Request, res: Response<User | { message: string }>) => {
  const id = parseInt(req.params.id, 10);
  const updated = usersService.update(id, req.body);
  updated ? res.json(updated) : res.status(404).json({ message: 'User not found' });
});

userRouter.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const ok = usersService.delete(id);
  ok ? res.status(204).send() : res.status(404).json({ message: 'User not found' });
});

export default userRouter;
