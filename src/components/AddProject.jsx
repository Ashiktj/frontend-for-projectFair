import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/5.jpg'
import { commonAPI } from '../services/commonAPI';

import { addProjectAPI } from '../services/allAPIs';
import { addProjectContextApi } from '../ContextAPI/ContextShare';

function AddProject() {


    const {addProjectRes,setAddprojectRes} = useContext(addProjectContextApi)


    //to hold token from  sessionStorage

  const [token,setToken] = useState("")

  useEffect(() =>{

    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }


  },[])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //to hold project details from form
    const [projectDetails, setProjectDetails] = useState({
        title: "", language: "", github: "", link: "", overview: "", projectImage: ""

    })



    //to hold image data converted into URL
    const [preview, setPreview] = useState("")
    console.log(preview);
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    console.log(projectDetails);

    const projectAdd = async () => {
        const { title, language, github, link, overview, projectImage } = projectDetails
        if (!title || !language || !github || !link || !overview || !projectImage) {
            alert("pls fill the form")
        }
        else {
            //api call 

            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("link", link);
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)



            const reqHeader = {
                "Content-Type": 'multipart/form-data',//it indicate the req container aimage file
                "Authorization": `Bearer ${token}`//to dend token client to server side
            };

            //api call
            const result = await addProjectAPI(reqBody, reqHeader)
            console.log(result);

            if (result.status === 200) {
                alert("project added  successfully")
                setAddprojectRes(result.data)
                console.log(result.data);
                handleClose()
                setProjectDetails({
                    title: "", language: "", github: "", link: "", overview: "", projectImage: ""
                })

                setPreview("")
            }
            else {
                console.log(result.response.data);
            }
        }

    }



    return (
        <div>
            <button onClick={handleShow} className='btn btn-success'>ADD PROJECT</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-evenly'>
                        <label className='mt-3'>
                            <input onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                            <img height={'170px'} width={'100%'} src={preview ? preview : img} alt="" />
                        </label>
                        <div className='w-50'>
                            <input value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" placeholder='Project Title' className='form-control mb-3' />
                            <input value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} type="text" placeholder='Language Used' className='form-control mb-3' />
                            <input value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" placeholder='GitHub Link ' className='form-control mb-3' />
                            <input value={projectDetails.link} onChange={e => setProjectDetails({ ...projectDetails, link: e.target.value })} type="text" placeholder='Website Link' className='form-control mb-3' />
                            <input value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} type="text" placeholder='Project Overview' className='form-control mb-3' />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={projectAdd} >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default AddProject