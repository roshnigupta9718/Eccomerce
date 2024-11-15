import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

let [email,setemail] = useState('scott@test.com')
let [pass,setpass] = useState('Scott123')

let {user,setUser} = useAuth()
console.log(user);

let navi = useNavigate()

// toatify
let loginSuccess = () => toast.success('🦄 LOGIN SUCCESSFUL!', {
  position: "top-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Zoom,
  });

  let loginFail = () => toast.error('🦄LOGIN UNSUCCESSFUL!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
    });


  if(localStorage.getItem('data')){
    let a = JSON.parse(localStorage.getItem('data'))
    setUser({isLoggedIn:true, userData:a})
    return <Navigate to='/dashboard'/>
    }


let onLoginClick =async(e)=>{
  e.preventDefault()
  // console.log(5656);
let req = await fetch(`http://localhost:4000/users?email=${email}&password=${pass}`)
if(req.ok ){
  let reqBody = await req.json()
  console.log(reqBody);

  if(reqBody.length > 0){
    setUser({isLoggedIn:true , userData:reqBody?.[0]})
  
setTimeout(() => {
  navi('/dashboard')
}, 3000);
localStorage.setItem('data',JSON.stringify(reqBody[0]))
// loginSuccess()
alert('Sucess')
  }else{
    // loginFail()
    alert('UnSucess')
  }

}else{
  loginFail()
}
}

  return (
   <div className="" >
    <h1 className="display-3 border-bottom border-danger border-5 w-50 m-sm-auto m-md-4 my-5 text-sm-center text-md-start ">LOGIN</h1>

<form onSubmit={onLoginClick} 
className='d-flex flex-column gap-3 w-50 border p-5 rounded-4 m-auto my-4'>
  <input type="text" name="" id=""
  className='form-control' placeholder='USER-EMAIL'
value={email}
onChange={(e)=>setemail(e.target.value)}
  />
  <input type="text" name="" id=""
  className='form-control' placeholder='USER-PASSWORD'
  value={pass}
onChange={(e)=>setpass(e.target.value)}
  />


  <button type='submit' className='btn btn-outline-warning'>LOGIN</button>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition: Zoom
/>
</form>

   </div>
  )
}

export default Login