import { http, HttpResponse } from 'msw';
import type { User } from '../types/user';
import { Role } from '../types/enums';

const currentUser: User | null = {
  id: 'user-001',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@example.com',
  role: Role.Farmer,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const handlers = [

   http.get('/api/ping', () => {
    return HttpResponse.json({ message: 'pong' });
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    const { email, password } = body;

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        success: true,
        token: 'mock-jwt-token-abc123',
        user: currentUser,
      });
    }

    return HttpResponse.json(
      { success: false, message: 'Identifiants invalides' },
      { status: 401 }
    );
  }),

  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Token manquant ou invalide' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      success: true,
      user: currentUser,
    });
  }),
  
];