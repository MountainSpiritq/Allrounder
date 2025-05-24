import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Property from './pages/Property';
import Properties from './pages/Properties';
import House from './pages/House';


function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/property",
      element:<Property/>
    },
    {
     path:"/properties",
      element:<Properties/>
    },
    {
     path:"/house/:id",
      element:<House/>
    },
  ]);

  return  (
    <RouterProvider router={router}/>
  )
}

export default App
