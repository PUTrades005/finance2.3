// src/app/models/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  // optional for future:
  roles?: string[];        // e.g. ['admin','user']
  // any other claims you return in the JWT
}
