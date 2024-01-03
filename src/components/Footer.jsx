import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div style={{width:'100%', height:'300px'}} className='d-flex align-items-center justify-content-centre flex-column mt-5 bg-success'>
       
        <div className='footer-div d-flex justify-content-evenly w-100 flex-wrap mt-5'>
              <div className="website" style={{width:"400px"}}>
                <h4><i class="fa-brands fa-stack-overflow"></i>Project Fair</h4>
                <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit velit placeat quasi animi maxime natus vero aspernat blanditiis magni, molestias</h6>
                <h6>similique? Nesciunt, aspernatur?</h6>
              </div>
              <div className="links d-flex flex-column">
                <h4>Links</h4>
              <Link to={'/'}style={{textDecoration:'none',color:'black'}}>Home Page</Link>
              <Link to={'/login'}style={{textDecoration:'none',color:'black'}}>Login Page</Link>

              <Link to={'/register'}style={{textDecoration:'none',color:'black'}}>Register page</Link>

              </div>
              
              <div className="guides d-flex flex-column">
              <h4>Guides</h4>
              <Link to={'https://legacy.reactjs.org/'}style={{textDecoration:'none',color:'black'}}>React</Link>
              <Link to={'https://react-bootstrap.netlify.app/'}style={{textDecoration:'none',color:'black'}}>React Boostrap</Link>

              <Link to={'https://bootswatch.com/'}style={{textDecoration:'none',color:'black'}}>Bootswatch</Link>

              </div>
              <div className="contacts">
                <h4>Contact Us</h4>
                <div className=' d-flex mt-3'>
                    <input type="text" className='form-control' placeholder='Enter your EmailID' />
                    <button className='btn btn-warning ms-3'>SubScribe</button>
                </div>
                <div className='icons fs-4 d-flex justify-content-evenly mt-3'>
                <Link to={'https://legacy.reactjs.org/'}style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-instagram"></i></Link>
                <Link to={'https://react-bootstrap.netlify.app/'}style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-twitter"></i></Link>

                <Link to={'https://bootswatch.com/'}style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-linkedin"></i></Link>
                <Link to={'https://bootswatch.com/'}style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-facebook"></i></Link>
 
                </div>
              </div>
        </div>
       
        <p className='mt-5'>Copyright © 2023 Media Player. Built with React.</p>
    </div>
  )
}

export default Footer