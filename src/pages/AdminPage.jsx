import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from '../components/AdminNav'

function AdminPage() {
  return (
    <div style={{overflow:'hidden'}}>
        <h1>ADMIN</h1>
    <div className='row ' style={{height:'86.5vh'}}>
    <AdminNav/>
    <Outlet/>
    </div>
    </div>
  )
}

export default AdminPage