import { http, HttpResponse } from 'msw'


export interface User {
  id: string;
  name: string;
  email: string;
  role: 'agriculture' | 'admin' | 'saisonnier';
}

let currentUser: User | null = {
  id: 'user-001',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  role: 'agriculture',
};

export const handlers = [

  http.post(' /api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    const { email, password } = body;
  
    if (email === 'test@example.com' && password === 'pasword123') {
    return HttpResponse.json({
      success: true,
      token: 'mock-jwt-token-abc123',
      user: currentUser,
    });
  }

    return HttpResponse.json(
    { sucess: false, message: 'Identificants invalides' },
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
      succes: true,
      user: currentUser,
    });
  }),
  
];