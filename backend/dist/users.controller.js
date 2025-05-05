"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_service_1 = require("./users.service");
const service = new users_service_1.UsersService();
exports.usersRouter = (0, express_1.Router)();
// GET /users
exports.usersRouter.get('/', (async (req, res, next) => {
    try {
        const all = service.findAll();
        res.json(all);
    }
    catch (err) {
        next(err);
    }
}));
// GET /users/:id
exports.usersRouter.get('/:id', (async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const user = service.findById(id);
        if (!user)
            return res.status(404).json({ error: 'Not found' });
        res.json(user);
    }
    catch (err) {
        next(err);
    }
}));
// POST /users
exports.usersRouter.post('/', (async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = service.create(data);
        res.status(201).json(newUser);
    }
    catch (err) {
        next(err);
    }
}));
// PUT /users/:id
exports.usersRouter.put('/:id', (async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const updated = service.update(id, req.body);
        if (!updated)
            return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
}));
// DELETE /users/:id
exports.usersRouter.delete('/:id', (async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const success = service.delete(id);
        if (!success)
            return res.status(404).json({ error: 'Not found' });
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}));
