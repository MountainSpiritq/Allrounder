import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import FindName from './pages/FindName';
import FindDate from "./pages/FindDate";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/FindName",
      element: <FindName />,
    },
    {
      path: "/FindDate",
      element: <FindDate />,
    },
  ]);
 
  return (
   <RouterProvider router={router}/>
  )
}

export default App
