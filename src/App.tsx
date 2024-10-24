import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Schedule from './pages/Schedule/Schedule';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Schedule />
    }
  ])
  return (
      <RouterProvider router={router} />
  )
}

export default App
