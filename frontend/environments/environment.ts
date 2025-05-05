// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',      // your Express server
  authEndpoint: '/auth',                    // if you mount authRouter at /auth
  // any other feature‑flags or keys you need…
};
