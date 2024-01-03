import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../contexts/ContextShare';

function Addproject() {

    //to use the contect we need to use UseContext hook
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    handleClose1()};
    const handleShow = () => setShow(true);

    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")

    const handleClose1 = () => {

        setProjectDetails({
            title: "", language: "", overview: "", github: "", website: "", projectImage: ""
        })

        setPreview("")
    }

    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
    })

    console.log(projectDetails);

    useEffect(() => {
        if (projectDetails.projectImage) {
            //javaScript predefined function URL.createObjectURL() is used to convert the file into url
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    //we can actually define more than one useeffect in the same component
    useEffect(() => {
        //since we need the userid while storing the project in projects collection. we get that from the token .hence token is taken from the session storage.
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [])


    console.log(preview);

    const handleAdd = async (e) => {
        e.preventDefault()
        const { title, language, overview, github, website, projectImage } = projectDetails
        if (!title || !language || !overview || !github || !website || !projectImage) {
            alert('Please Fill the form Completely')
        }
        else {
            // reqbody
            // create object for form data
            const reqBody = new FormData()
            // add data to formData - append()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)

            if (token) {
                //upload content
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}` // this is the syntax of sharing token.we cannot just share the data. it can only be shared along with bearer (single space between bearer and token)
                }

                const result = await addProjectAPI(reqBody, reqHeader)
                console.log(result);
                if (result.status === 200) {
                    console.log(result.data);
                    toast.success("project added Succesfully")
                    handleClose()
                    //share the data from addproject component to myproject component
                    setAddProjectResponse(result.data)
                }
                else {
                    console.log(result.response.data);
                }
            }
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Add Project
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} className='text-center mt-5'>
                            <label for="image" >
                                <input id="image" type="file" style={{ display: 'none' }} onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img width={'250'} src={preview ? preview : "https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="" />
                            </label>
                        </Col>
                        <Col md={6} >
                            <div className="mt-3">
                                <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                            </div>
                            <div className="mt-3">
                                <input type="text" className='form-control' placeholder='Project language' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                            </div>
                            <div className="mt-3">
                                <input type="text" className='form-control' placeholder='Project Github Link' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                            </div>
                            <div className="mt-3">
                                <input type="text" className='form-control' placeholder='Project Website' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                            </div>
                            <div className="mt-3">
                                <textarea type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose1}>
                    Cancel
                    </Button>
                    <Button variant="success" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
                <ToastContainer position='top-center' theme='colored' autoClose={2000} />
            </Modal>
        </>
    )
}

export default Addproject