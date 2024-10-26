import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Schedule from './pages/Schedule/Schedule';
import Drivers from './pages/Drivers/Drivers';
import Tickets from './pages/Tickets/Tickets';
import Stops from './pages/Stops/Stops';


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
    },
    {
      path: '/stops',
      element: <Stops />
    }
  ])
  return (
      <RouterProvider router={router} />
  )
}

export default App
