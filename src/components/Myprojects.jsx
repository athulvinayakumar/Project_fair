import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userProjectAPI } from '../Services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextShare'
import EditProject from './EditProject'
import { Alert } from 'react-bootstrap'

function Myprojects() {

    //to use the contect we need to use UseContext hook
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)

    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)

    const [userProjects, setUserProjects] = useState([])
    const getUserProject = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await userProjectAPI(reqHeader)
            console.log(result);
            if (result.status === 200) {
                setUserProjects(result.data)
            } else {
                console.log(result);
            }
        }

    }
    useEffect(() => {
        getUserProject()
    }, [addProjectResponse, editProjectResponse])

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteProjectAPI(id, reqHeader)
        if (result.status === 200) {
            getUserProject()
        }
        else {
            alert(result.response.data)
        }
    }

    return (
        <>
            <div className='card shadow p-3 ms-3 me-3'>

                <div className='d-flex justify-content-between'>
                    <h3 className='text-success ms-3'> My projects</h3>
                    <Addproject />
                </div>

                
                {userProjects?.length > 0 ?
                    userProjects.map((item) => (<div className='p-2 border rounded mt-4'>
                        <div className='d-flex'>
                            <h3 className='ms-2'>{item.title}</h3>
                            <div className="ms-auto">
                                <EditProject project={item} />
                                <a href={item.github} target='_blank' className="btn"><i class="fa-brands fa-github text-success"></i></a>
                                <button onClick={() => handleDelete(item._id)} className="btn"><i class="fa-solid fa-trash text-danger"></i></button>
                            </div>
                        </div>
                    </div>)) :

                    <p className='text-danger fw-bolder mt-3 ms2 '>Project not uploaded yet!!!!!</p>}
            </div>
        </>
    )
}

export default Myprojects