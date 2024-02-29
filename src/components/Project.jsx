import React, { useEffect, useState } from 'react'
import Projectcard from './Projectcard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { allProjectAPI } from '../services/allAPIs';
import { Link } from 'react-router-dom';
function Project() {
//to hold search value from input box
  const [searchkey,setSearchkey] = useState('')
  console.log(searchkey);


    //to hold all project details

    const  [allProject,setAllProject] = useState([])

    //api call function

    const getAllProject = async() => {
        //get token

        const token = sessionStorage.getItem("token")
        console.log(token);
        if(token){
            const reqHeader =  {
                "Content-Type": "multipart/form-data",
                "Authorization":`Bearer ${token}`
            }
            try{
              const result = await allProjectAPI(searchkey,reqHeader)
              console.log(result);
              if(result.status === 200){
                  setAllProject(result.data)
                  console.log(allProject);
              }
            else{
                alert('failed to get project')
            }
          }
          catch(e){
            alert("failed to get project" + e.message)
          }
        }
    }

    useEffect(() => {

        getAllProject()

    },[searchkey])
  return (
    <div>
      <div className="container">
      
        <h2 className='Text-center m-4'>All Projects</h2>
      
       <div className="d-flex justify-content-center w-100">
         <div className='d-flex border rounded '>
           <input onChange={e=>setSearchkey(e.target.value)} className='px-2 text-center' style={{borderRadius:'20px'}} type="text" placeholder='Search By technology' />
           <i  class="fa-brands fa-searchengin fa-xl text-dark ms-2 mt-3 "></i>         </div>
           <Link to={'/dashboard'}>
            <button className='btn btn-dark ms-5'>
              Go back
            </button>
          </Link>
       </div>
       <Row>
               {
                allProject.length>0 ? allProject.map((item,index) => (
                    <Col key={index}>

                    <Projectcard Project={item}/>
    
                    </Col>
                )) : 
                <div>no project found</div>
               }
            </Row>

       </div>
    </div>
  )
}

export default Project