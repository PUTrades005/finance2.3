import { Router, RequestHandler } from 'express';
import { UsersService } from './users.service';

const service = new UsersService();
export const usersRouter = Router();

// GET /users
usersRouter.get('/', (async (req, res, next) => {
  try {
    const all = service.findAll();
    return res.json(all);
  } catch (err) {
    return next(err);
  }
}) as RequestHandler);

// GET /users/:id
usersRouter.get('/:id', (async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = service.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}) as RequestHandler);

// POST /users
usersRouter.post('/', (async (req, res, next) => {
  try {
    const data = req.body as Omit<ReturnType<UsersService['create']>, 'id'>;
    const newUser = service.create(data);
    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
}) as RequestHandler);

// PUT /users/:id
usersRouter.put('/:id', (async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updated = service.update(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}) as RequestHandler);

// DELETE /users/:id
usersRouter.delete('/:id', (async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const success = service.delete(id);
    if (!success) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}) as RequestHandler);
