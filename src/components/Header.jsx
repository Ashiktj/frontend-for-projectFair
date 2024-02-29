import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Header() {
  const location =useNavigate()
  const logout =()=>{
    sessionStorage.clear()
    location('/')
  }
  return (
    <div className='text-white'>
       <MDBNavbar light bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand  className='text-white' href='http://localhost:3000'>
          <i class="fa-solid fa-laptop mx-3"></i>
            Project Fair
          </MDBNavbarBrand>
          <button onClick={logout} className='btn'><i class="fa-solid fa-right-from-bracket fs-2"></i></button>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header