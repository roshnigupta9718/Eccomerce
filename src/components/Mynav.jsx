import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import navstyle from './mynav.module.css'
import { useAuth } from '../context/AuthContext';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';

function Mynav() {

  let {user,setUser, logout} = useAuth()
  // console.log(user);
  let navi = useNavigate()

  let x = []

  if( localStorage.getItem('data')){
    let y = JSON.parse(localStorage.getItem('data'))// string to o
    // console.log(y);
    x.push(y?.fullName)
   
  }else if( user && user?.isLoggedIn===true){
    x.push(user?.userData?.fullName)
  }

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
         
          
            {
            user && user?.isLoggedIn===false ?
            <NavLink className={`text-decoration-none text-info mx-3 fw-bolder mt-2`} to="/">LOGIN</NavLink>
            : ''
          }
           {
            user && user?.isLoggedIn===false ?
            <NavLink className='text-decoration-none text-info mx-3 fw-bolder mt-2' to="/register">REGISTER</NavLink>
            : ''
          }
          {
            user && user?.isLoggedIn===true ?
            <NavLink className='text-decoration-none text-info mx-3 fw-bolder mt-2' to="/store">STORE</NavLink>
            : ''
          }
           {
            user && user?.isLoggedIn===true ?
            <NavLink className='text-decoration-none text-info mx-3 fw-bolder mt-2' to="/dashboard">DASHBOARD</NavLink>
            : ''
          }
           {
            user && user?.isLoggedIn===true ?
            <NavDropdown title={`${x?.[0]}`} id="basic-nav-dropdown" >
              <NavDropdown.Item  >
                <Button onClick={()=>{
                  logout()
                  navi('/')
                }} variant='danger text-light m-auto d-block w-100'>LOGOUT</Button>
              </NavDropdown.Item>
            </NavDropdown>
            : ''
          }
           {
            user && user?.isLoggedIn===true ?
            <NavLink className='text-decoration-none text-info mx-3 fw-bolder mt-2' to="/admin">ADMIN-PAGE</NavLink>
            : ''
          }
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Mynav