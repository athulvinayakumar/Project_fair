import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import { allProjectAPI } from '../Services/allAPI';

function Project() {
  const [searchKey, setSearchKey] = useState("")
  const [allprojects, setAllProjects] = useState([])
  const [isToken, setisToken] = useState('false')

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey, reqHeader)
      console.log(result);
      if (result.status === 200) {
        setAllProjects(result.data)
      }
      else {
        console.log(result.response.data);
      }
    }
  }
  console.log(searchKey);

  useEffect(() => {
    getAllProject()
  }, [searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setisToken(true)
    }
  }, [])

  return (
    <>
      <Header />
      <div className='text-center' style={{ marginTop: '150px' }}>
        <h1>All Project</h1>

        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex w-25 mt-5">
            <input className='form-control' onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search the project using technologies' />
            <i style={{ marginLeft: '-40px', color: 'grey' }} class="fa-solid fa-magnifying-glass  fa-rotate-90"></i>
          </div>

        </div>
        <Row className='mt-5 container-fluid'>
          {
            allprojects?.length > 0 ?
              allprojects.map((item) => (<Col sm={12} md={6} lg={4}>
                <ProjectCard project={item} />
              </Col>))
              : <div>
                {
                  isToken ?  <p className='text-danger fw-3 fs-3'>No Such Project !!!!!</p> :
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                      <img width={'200px'} height={'200px'} src='https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif' alt='no image' />
                      <p className='text-danger fw-3 fs-3'>Please Login to view Projects</p></div>
}
              </div>
          }
        </Row>
      </div>
    </>
  )
}

export default Project