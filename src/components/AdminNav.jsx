import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminNav() {
  return (
    <div className='border border-4 bg-danger-subtle p-3 col-3'>
 <NavLink className='text-decoration-none text-info mx-3 fw-bolder mt-2' to="/">DASHBOARD</NavLink>
    </div>
  )
}

export default AdminNav