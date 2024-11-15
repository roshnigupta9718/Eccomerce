import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Mynav from './components/Mynav';
import { Outlet } from 'react-router-dom';
import { AuthUserContext } from './context/AuthContext';

function App() {
  return (
    <div>
<AuthUserContext>
<Mynav/>
<Outlet/>
</AuthUserContext>
    </div>
  )
}

export default App