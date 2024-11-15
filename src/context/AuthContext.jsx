import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


let AuthCon =  createContext()


export const AuthUserContext = ({children}) =>{

let [user,setUser] = useState({
    isLoggedIn:false,
    userData:null
})

let logout = ()=>{
   localStorage.removeItem('data')
    setUser({isLoggedIn:false, userData:null})
}

    return <AuthCon.Provider value={{user, setUser, logout}}>
        {children}
    </AuthCon.Provider> 
}


//use

export const useAuth = () =>useContext(AuthCon)