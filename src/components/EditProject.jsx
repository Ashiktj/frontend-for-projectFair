import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import img from '../image/pro.png'
import { base_url } from '../services/baseUrl';
import { updateUserProjectAPI } from '../services/allAPIs';
import { editUserProjectContextApi } from '../ContextAPI/ContextShare';



function EditProject({ project }) {

    const { editUserProjectRes, setEditUserProjectRes } =
        useContext(editUserProjectContextApi)


    console.log(project);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [projectDetails, setProjectDetails] = useState({

        id: project._id, 
        title: project.title, 
        language: project.language, 
        github: project.github, 
        link: project.link, overview: 
        project.overview, 
        projectImage: "",

    })

    const [preview, setPreview] = useState("")

    console.log(preview);


    useEffect(() => {
        if (projectDetails.projectImage) {
            const imageUrl = URL.createObjectURL(projectDetails.projectImage);
            setPreview(imageUrl);
    
            // Cleanup function to revoke the object URL when component unmounts or when projectImage changes
            return () => URL.revokeObjectURL(imageUrl);
        }
    }, [projectDetails.projectImage]);
    

    // useEffect(() => {
    //     if (projectDetails.projectImage) {
    //         setPreview(URL.createObjectURL(projectDetails.projectImage))
    //     }
    // }, [projectDetails.projectImage])


    console.log(projectDetails);

    const updateProject = async () => {

        const { id, title, language, github, link, overview, projectImage } = projectDetails

        // if(!title || !language || !github || !link || !overview || !projectImage ){
        //   alert('pls fill the form')

        // }
        // else{

        const reqBody = new FormData()
        reqBody.append("title", title)
        reqBody.append("language", language)
        reqBody.append("github", github)
        reqBody.append("link", link);
        reqBody.append("overview", overview)
        preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectDetails)
        // reqBody.append("projectImage",projectImage)




        //get token 

        const token = sessionStorage.getItem("token")
        console.log(token);

        if (preview) {
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            //Api call

            const result = await updateUserProjectAPI(id, reqBody, reqHeader)
            console.log(result);

            if (result.status == 200) {
                console.log(result.data);
                setEditUserProjectRes(result.data)
                alert('project updated successfully')
                handleClose()
            }
            else {
                console.log(result.response.data);
                setEditUserProjectRes(result.response.data)
            }

            //}

        }
        else {

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            //Api call

            const result = await updateUserProjectAPI(id, reqBody, reqHeader)
            console.log(result);

            if (result.status == 200) {
                console.log(result.data);
                setEditUserProjectRes(result.data)
                alert('project updated successfully')
                handleClose()
            }
            else {
                console.log(result.response.data);
                setEditUserProjectRes(result.response.data)

            }



        }


    }









    return (
        <div>

            <button onClick={handleShow} style={{ backgroundColor: 'skyblue', color: 'white' }} className='btn'><i class='fa solid fa-pen'></i></button>




            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'

                centered

            >
                <Modal.Header closeButton>
                    <Modal.Title>Project <span style={{ color: '#FFD700' }}>Details</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='d-flex justify-content-evenly'>

                        <label>

                            <input onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                            <img width={'400px'} src={preview ? preview : `${base_url}/uploads/${project.projectImage}`} alt="" />



                        </label>

                        <div>
                            <input value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" placeholder='project tilte' className='form-control mb-3 mx-2' />
                            <input value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} type="text" placeholder='language used' className='form-control mb-3  mx-2' />
                            <input value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" placeholder='github link' className='form-control mb-3  mx-2' />
                            <input value={projectDetails.link} onChange={e => setProjectDetails({ ...projectDetails, link: e.target.value })} type="text" placeholder='website link' className='form-control mb-3  mx-2' />
                            <input value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} type="text" placeholder='project overview' className='form-control mb-3  mx-2' />


                        </div>



                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateProject}   >
                        update
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}



export default EditProject