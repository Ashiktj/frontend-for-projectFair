import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyProject from './MyProject';
import MyProfile from './MyProfile';
import { Link } from "react-router-dom"
import Header from './Header';


function Dashboard() {

  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"))
  console.log(existingUser);
  return (

    
    <div className='' >

         <header> 
          <Header/>
          </header> 

      <div className='m-5'>
      <Row>
        <h2>Welcome <span className='text-danger' style={{fontWeight:'700'}}>{existingUser.username}</span></h2>
        <Col>
         {/* My projects */}
         <MyProject/>
        </Col>
        <Col>
        {/* My profile */}
        <MyProfile user={existingUser}/>
        </Col>
      </Row>
      <Link to={'/projects'}>
       <div>
              <button className='btn btn-success text-white rounded-pill btn-lg px-3 shadow m-5'>View Projects</button>
            </div>
       </Link>
    </div>
    </div>
  )
}

export default Dashboard