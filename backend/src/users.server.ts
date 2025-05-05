
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
    const newUser = { id: nextId++, ...data };
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
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  }
}
