import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { registerAPI, loginAPI } from '../services/allAPIs'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

function Auth({ register }) {

  const location = useNavigate()

  const isregisterForm = register ? true : false

  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
  })


  const registerData =async()=>{

    const {username,email,password} = userData

    if(!username || !email || !password){
        alert("pls fill the form")
    }
    else{
        
        const result = await registerAPI(userData)
        console.log(result);

        if(result.status==200){
            alert(result.data)
            
            location('/login')
        }
        else{
            alert(result.response.data)
        }
    }


    console.log(userData);



}

const loginData = async()=>{
  const {email,password} = userData
  if(!email || !password){
      alert("pls fill the form")
  }
  else{
      const result = await loginAPI(userData)
      console.log(result);
      if(result.status == 200){
          alert("Login Successful")
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          
          location("/dashboard")

      }
      else{ 
          alert("invalid user data")
      }
      
  } 

}



  return (
   <div>
      <MDBNavbar light bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand  className='text-white' href='http://localhost:3000'>
          <i class="fa-solid fa-laptop mx-3"></i>
            Project Fair
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
     <div className='d-flex justify-content-center align-items-center ' style={{ width: '100%', height: '780px' }}>
      <div className="container">

        <div className="row">
          <div className="col-6">
            {/* image */}
            <img width={'100%'} height={'400px'} src="https://visme.co/blog/wp-content/uploads/2020/02/header-1200.gif" alt="" />
          </div>
          <div className="col-2"></div>
          <div className="col-4 card shadow p-3">
            {/* content */}
            <h2 className='text-center'>Project Fair</h2>

            <h5 className='text-center mt-4' >
              {
                isregisterForm ? 'Register here' : 'Login here'
              }
            </h5>

            <form className='p-5' >
              {
                isregisterForm &&
                <input type="text" value={userData.username} onChange={e => setuserData({ ...userData, username: e.target.value })} placeholder='Username' className='form-control mb-3' />
              }
              <input type="email" value={userData.email} onChange={e => setuserData({ ...userData, email: e.target.value })} placeholder='Email' className='form-control mb-3' />
              <input type="text" value={userData.password} onChange={e => setuserData({ ...userData, password: e.target.value })} placeholder='Password' className='form-control ' />
            </form>

            {isregisterForm ?
              <div className="text-center m-3">
                <button className='btn btn-success ' onClick={registerData} >Register</button>
                <Link to={'/login'} style={{ textDecoration: 'none', color: ' blue' }}>
                  <p className='mt-3' >Already Registered? Please login from here...</p>
                </Link>
              </div>
              :
              <div className="text-center m-3">
                <button className='btn btn-warning ' onClick={loginData}>Login</button>
                <Link to={'/register'} style={{ textDecoration: 'none', color: ' blue' }}>
                  <p className='mt-3'> New to here? Please register from here...</p>
                </Link>
              </div>
            }

          </div>
        </div>

        <div className="text-center mt-5">
          <Link to={'/'}>
            <button className='btn btn-dark'>
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
   </div>

  )
}

export default Auth