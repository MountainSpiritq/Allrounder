import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Order from './Order';
const router = createBrowserRouter([
  {
    path: '/', element: <Home/>
  },
  {
    path: '/products', element: <Products/>
  },
  {
    path: '/order/:id', element: <Order/>
  }
])
function App() {
  return <RouterProvider router={router}/>
}

export default App
