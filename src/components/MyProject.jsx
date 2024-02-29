import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
// import { addProjectContextApi } from '../';
import { delectUserProject , userProjectAPI } from '../services/allAPIs'
import Row from 'react-bootstrap/Row';
import { addProjectContextApi } from '../ContextAPI/ContextShare';
import EditProject from './EditProject';
import { editUserProjectContextApi } from '../ContextAPI/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyProject() {
    const {addProjectRes,setAddprojectRes} = useContext(addProjectContextApi)

    const { editUserProjectRes, setEditUserProjectRes } =  useContext(editUserProjectContextApi)
    const [userProjects, setUserProjects] = useState([])

    const userProject = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {

                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`

            }
            try {
                const result = await userProjectAPI(reqHeader)
                console.log(result);
                setUserProjects(result.data)
                console.log(userProjects);

            }
            catch (err) {
                alert(err.message)

            }
        }
    }

    useEffect(() => {
        userProject()

    },[addProjectRes,editUserProjectRes])

    const deleteProject = async (pid) => {
        const token = sessionStorage.getItem("token")

        if (token) {
            const reqHeader = {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`


            }

            const result = await delectUserProject(pid, reqHeader)
            console.log(result);
            userProject()
            toast.error('user project delete successfully')

        }
    }




    return (
        <div className='container'>
            <div className='d-flex mt-5'>
                <h3 className='ms-5'>My Projects</h3>
                <div className="ms-auto">
                    <AddProject />
                    {/* Add project Component */}
                </div>
            </div>
            <div className="d-flex my-5 align-item-center justify-content-between border p-3">

                <Row>
                    {
                        userProjects.length > 0 ? userProjects.map((item) => (
                          <>
                          {/* <div className='d-flex justify-content-between align-items-center p-3'> */}
                                <h4>{item.title}</h4>

                                <div>
                                    <button style={{ backgroundColor:'skyblue'}}className='btn mx-1'   >
                                        <EditProject project={item}>

                                        </EditProject>
                                    </button>
                                    <a href={item?.github} target='_blank'style={{ backgroundColor: 'black' }} className='btn mx-1'><i class='fa-brands fa-github'></i></a>
                                    <button onClick={() => deleteProject(item?._id)} style={{ backgroundColor: 'red' }} className='btn mx-1'><i class='fa solid fa-trash'></i></button>


                                </div>
                            {/* </div> */}
                            </>

                        )) : "can't fetch"
                    }
                </Row>
            </div>
            <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
        </div>
    )
}

export default MyProject

