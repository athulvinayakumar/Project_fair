import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../contexts/ContextShare';

function Header({ dashboard }) {
  const navigate = useNavigate()

  const{isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  const handleLogout = () => {
    //remove existing user details from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    // api
    setIsAuthToken(false)
    //navigate to home
    navigate('/')

  }
  return (
    <Navbar className='p-3 fixed-top bg-success'  >
      <Container>
        <Navbar.Brand href="#home" className='fw-bolder fs-3'>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            <i class="fa-brands fa-stack-overflow me-3"></i>
            Project Fair
          </Link>
        </Navbar.Brand>
        {dashboard &&
          <div onClick={handleLogout} className="btn btn-warning ms-auto text-light">Logout <i class="fa-solid fa-power-off ms-2"></i></div>
        }
      </Container>
    </Navbar>
  )
}

export default Header