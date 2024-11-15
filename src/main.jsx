import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Store from './pages/Store.jsx'
import ProtectDashBoard from './components/ProtectDashBoard.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AddProduct from './components/AddProduct.jsx'

let router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:'/',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/dashboard',
        element:<ProtectDashBoard><Dashboard/></ProtectDashBoard>
      },
      {
        path:'/store',
        element:<Store/>
      },
      {
        path:'/admin',
        element:<AdminPage/>,
        children:[
          {
           
            path:'addproduct',
            element:<AddProduct/>
          },
        ]
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
 <>
 <RouterProvider router={router}/>
 </>
)
