import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectDashBoard({children}) {

let {user, setUser} = useAuth()

if(user?.isLoggedIn===true){
   
        return children
   
}else{
    return <Navigate to='/'/>
}


}

export default ProtectDashBoard