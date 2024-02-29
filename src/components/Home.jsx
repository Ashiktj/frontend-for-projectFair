import React, { useEffect, useState } from 'react'
import Titleimage from '../Assets/5.jpg'
import Projectcard  from './Projectcard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom"
import { homeProjectAPI } from '../services/allAPIs';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

// import Row from 
function Home() {

     //api call to get home project details

     const [homeproject,setHomeProject] =useState([])

     const getHomeProject = async () => {
 
         const result = await homeProjectAPI()
         console.log(result);
 
         if(result.status === 200){
             setHomeProject(result.data)
             console.log(homeproject);
         }
         else{
             console.log("api fetching project details failed");
         }
 
     }
 
     useEffect(() => {
         getHomeProject()
     },[])
 

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
      
      <div className="container">
        <div className="row">
          <div className="col-6 p-5">
            <h1 className='text-center m-5'>Project Fair </h1>
            <p style={{ textAlign: 'justify' }}>
              The objective of project management is to produce a complete project which complies with the client's objectives.
              In many cases, the objective of project management is also to shape or reform the client's brief to feasibly address the client's objectives.
              Once the client's objectives are clearly established, they should influence all decisions made by other people involved in the project – for example, project managers, designers, contractors, and subcontractors.
            </p>

            <div>
              <Link to={'/login'}>
              <button className='btn btn-success text-white rounded-pill btn-lg px-3 shadow m-5'>Get Started</button>
           </Link>
            </div>
          </div>
          <div className="col-6">
            <img className='my-5' style={{width:'900px'}} src={Titleimage} alt="" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h1 className='text-center'>Explore Our Project</h1>
            <marquee behavior="" direction="">
            <Row>
                        
                        {
                            homeproject.length>0?homeproject.map(item => (
                                <Col>

                              <Projectcard Project = {item}/>
                    
                               </Col>

                            )) : "empty array"
                        }
                       
                    </Row>
            </marquee>
          </div>
        </div>

     

      </div>

    </div>
  )
}

export default Home