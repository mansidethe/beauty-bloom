import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './views/Home/Home'
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Myorders from './views/Myorders/Myorders'
import Buypage from './views/Buypage/Buypage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/orders",
    element: <Myorders/>,
  },
  {
    path: "/buy/:id",
    element: <Buypage/>,
  },
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);
 


