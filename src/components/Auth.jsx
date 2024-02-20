import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, json, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthContext } from '../contexts/ContextShare';


function Auth({ register }) {

    const {isAuthorized, setIsAuthorized} = useContext(tokenAuthContext)
    // create a state to hold value of user registration details
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log(userData);

    const navigate = useNavigate()

    const isRegisterForm = register ? true : false

    // function for register
    const handleRegister = async (e) => {
        e.preventDefault()

        const { username, email, password } = userData

        if (!username || !email || !password) {
            alert("please fill the form Completely")

        }
        else {
            const result = await registerAPI(userData)
            console.log(result);
            if (result.status === 200) {
                toast.success(`${result.data.username} has successfully register...`);

                //  reset state
                setUserData({
                    username: "", email: "", password: ""
                })
                // navigate to login page
                navigate('/login')
            }
            else {
                toast.error(result.response.data);
            }
        }
    }

    // function to login
    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = userData

        if (!email || !password) {
            toast.warning("please fill the form Completely")
        }
        else {
            // api call 
            const res = await loginAPI(userData)
            console.log(res);

            if (res.status == 200) {
                // alert

                toast.success("Login Succesful")
               
                //  store

                sessionStorage.setItem("existingUser", JSON.stringify(res.data.existingUser))
                sessionStorage.setItem("token", res.data.token)
                setIsAuthorized(true)
                //  reset state
                setUserData({
                    email: "",
                    password: ""
                })
                // navigate
                setTimeout(() => {
                    navigate('/')
                }, 2500)

            }
            else {
                toast.error(res.response.data);
            }
        }
    }

    return (
        <>
            <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
                <div className='w-75 container'>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}><i class="fa-solid fa-arrow-left me-3"></i>Back to Home</Link>
                    <div className='card  p-5 bg-success'>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" width={'500$'} alt="" />
                            </div>
                            <div className="col-lg-6 p-5">
                                <div className='d-flex align-items-center flex-column'>
                                    <h1 className='fw-bolder text-light mt-2'><i class="fa-brands fa-stack-overflow me-3"></i>Project Fair</h1>
                                    <h5 className='fw-bolder mt-4 pb-3 text-light'>
                                        {
                                            isRegisterForm ? 'Sign up to your Account' : 'Sign In to your Account'
                                        }

                                    </h5>
                                    <Form className='text-light w-100  mt-4'>
                                        {isRegisterForm &&
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="text" placeholder="Username" value={userData.username} />
                                            </Form.Group>}
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="Enter your Email Id" value={userData.email} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Enter your password" value={userData.password} />
                                        </Form.Group>
                                        {
                                            isRegisterForm ?
                                                <div>
                                                    <button onClick={handleRegister} className='btn btn-warning mt-3'>Register</button>
                                                    <p>Already have account? Click here to <Link to={'/login'} style={{ color: 'blue' }}> Login</Link></p>
                                                </div> :
                                                <div>
                                                    <button onClick={handleLogin} className='btn btn-warning mt-3'>Login</button>
                                                    <p>New User? Click here to <Link to={'/register'} style={{ color: 'blue' }} > Register</Link></p>
                                                </div>
                                        }
                                        <ToastContainer position='top-center' theme='colored' autoClose={2000} />
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth