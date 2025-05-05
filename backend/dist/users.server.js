"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
let nextId = 1;
const users = [];
class UsersService {
    findAll() {
        return users;
    }
    findById(id) {
        return users.find(u => u.id === id);
    }
    create(data) {
        const newUser = { id: nextId++, ...data };
        users.push(newUser);
        return newUser;
    }
    update(id, data) {
        const user = this.findById(id);
        if (!user)
            return null;
        Object.assign(user, data);
        return user;
    }
    delete(id) {
        const idx = users.findIndex(u => u.id === id);
        if (idx === -1)
            return false;
        users.splice(idx, 1);
        return true;
    }
}
exports.UsersService = UsersService;
