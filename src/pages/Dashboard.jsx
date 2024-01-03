import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'


function Dashboard() {
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])

  console.log(username);

  return (
    <>
      <Header dashboard />
      <h2 className='ms-3' style={{ marginTop: '100px' }}>Welcome <span className='text-warning'>{username}</span></h2>
      
      <Row className='container-fluid mt-5'>
        <Col sm={12} md={8}>
          <Myprojects />
        </Col>
        <Col sm={12} md={4}>
          <Profile />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard