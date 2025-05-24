import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Plants from './pages/Plants'
import SearchedPlant from './pages/SearchedPlant'

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/plants/:id",
      element:<Plants/>
    },
    {
      path:"/searchedplants/:plant",
      element:<SearchedPlant/>
    }
  ])

  return (
   <RouterProvider router={router} />
  )
}

export default App
