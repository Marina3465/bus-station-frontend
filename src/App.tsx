import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Schedule from './pages/Schedule/Schedule';
import Drivers from './pages/Drivers/Drivers';
import Tickets from './pages/Tickets/Tickets';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Schedule />
    },
    {
      path: '/drivers',
      element: <Drivers />
    },
    {
      path: '/tickets',
      element: <Tickets />
    }
  ])
  return (
      <RouterProvider router={router} />
  )
}

export default App
