import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import titleImage from '../Assets/designer.svg'
import { homeProjectAPI } from '../Services/allAPI'
function Home() {

  const [isLogin, setIsLogin] = useState(false)

  const [homeProjects, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectAPI()
    // console.log(result.data);
    if (result.status === 200) {
      setHomeProject(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }
  console.log(homeProjects);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
    //api call for homeProject
    getHomeProject()
  }, [])


  return (
    <>
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'yellowgreen' }}>
        <div className='container-fluid rounded '>
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6}>
              <h1 style={{ fontSize: '80px', color: 'white' }}>Project fair</h1>
              <p>One stop Destination for all software development Projects</p>
              {isLogin ?
                <Link to={'/dashboard'}><button className='btn btn-success rounded'>
                  Manage Project<i className="fa-solid fa-arrow-right ms-2"></i>
                </button></Link> :
                <Link to={'/login'}><button className='btn btn-success rounded'>
                  Get Started<i className="fa-solid fa-arrow-right ms-2"></i>
                </button></Link>}
            </Col>
            <Col sm={12} md={6}>
              <img src={titleImage} alt="" className='w-75' style={{ marginTop: '100px' }} />
            </Col>
          </Row>
        </div>
      </div>
      <div className="all-project mt-5 ">
        <h1 className='text-center mt-5'>All Projects</h1>
        <marquee scrollAmount={15} className=" mt-5">
          <div className='d-flex'>
            {homeProjects?.length > 0 ?
              homeProjects.map((item) => (
              <div className='ms-5' style={{ width: '700px' }}>
                <ProjectCard project={item} />
              </div>))
              : null
            }

          </div>
        </marquee>
        <div className='text-center'>
          <Link to={'/project'}>See More Projects</Link>
        </div>
      </div>
    </>
  )
}

export default Home