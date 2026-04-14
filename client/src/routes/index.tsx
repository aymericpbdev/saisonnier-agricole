import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/test/HomePage'
import TestPage from '../pages/test/TestPage'
import NotFoundPage from '../pages/test/NotFoundPage'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/test', element: <TestPage /> },
  { path: '*', element: <NotFoundPage /> },
])

export default router