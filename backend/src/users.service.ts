// src/users.service.ts
import { v4 as uuidv4 } from 'uuid';

// Define the User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// In-memory store for users (replace with a real DB in production)
const users: User[] = [];

/**
 * Service for managing users
 */
export class UsersService {
  /**
   * Return all users
   */
  findAll(): User[] {
    return users;
  }

  /**
   * Find a user by ID
   */
  findById(id: string): User | null {
    return users.find(u => u.id === id) || null;
  }

  /**
   * Create a new user
   */
  create(data: { name: string; email: string }): User {
    const newUser: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email
    };
    users.push(newUser);
    return newUser;
  }

  /**
   * Update an existing user
   */
  update(id: string, data: Partial<{ name: string; email: string }>): User | null {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;
    return user;
  }

  /**
   * Delete a user by ID
   */
  delete(id: string): boolean {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
}
