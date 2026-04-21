import { http, HttpResponse } from 'msw'

export const handlers = [
  // Handler test
  http.get('/api/ping', () => {
    return HttpResponse.json({ ok: true })
  })
]