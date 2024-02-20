import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseUrl';


function Profile() {

    const [open, setOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false)

   
    const [userProfile, setUserProfile] = useState({
        username: "", email: "", password: "", profile: "", github: "", linkedIn: ""
    })
    
    const [existingImage, setExistingImage] = useState("")
   
    const [preview, setPreview] = useState("")

    useEffect(() => {
        
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        
        setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, profile: "", github: user.github, linkedIn: user.linkedIn })
        
        setExistingImage(user.profile)
    }, [isUpdate])

    useEffect(() => {
        if (userProfile.profile) {
            console.log(URL.createObjectURL(userProfile.profile));
            setPreview(URL.createObjectURL(userProfile.profile))
        }
        else {
            setPreview("")

        }
    }, [userProfile.profile])


    const handleProfileUpdate = async () => {
        const { username, email, password, profile, github, linkedIn } = userProfile

        if (!github || !linkedIn) {
            toast.warning('please fill the form completely')
        }
        else {
            const reqBody = new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedIn", linkedIn)
            preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImage)

            const token = sessionStorage.getItem("token")

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProfileAPI(reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    toast.success("Profile updated Succesfully")
                    setIsUpdate(true)
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                }
                else {
                    console.log(result.response.data);
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProfileAPI(reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    alert('profile updated successfully')
                    setIsUpdate(true)
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                }
                else {
                    console.log(result.response.data);
                }
            }

        }

    }

    return (
        <div className='card shadow p-5'>
            <div className="d-flex justify-content-between ">
                <h2>Profile</h2>
                <button onClick={() => setOpen(!open)} className="btn btn-outline-info"><i class="fa-solid fa-arrow-up-from-bracket fa-rotate-180"></i></button>
            </div>
            <Collapse in={open}>
                <div className="row justify-content-center mt-3">
                    {/* upload picture */}
                    <label htmlFor="profile" className='text-center'>
                        <input id='profile' style={{ display: 'none' }} type="file" onChange={(e) => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                        {existingImage == "" ?
                            <img width={'200px'} height={'200px'} src={preview ? preview : "https://www.freeiconspng.com/uploads/female-user-icon-clip-art--30.png"} alt="no image" className='rounded-circle' /> :
                            <img width={'200px'} height={'200px'} src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle' />}
                    </label>
                    <div className="mt-5">
                        <input type="text" className='form-control' placeholder='GitHub' value={userProfile.github} onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} />
                    </div>
                    <div className="mt-3">
                        <input type="text" className='form-control' placeholder='LinkedIn' value={userProfile.linkedIn} onChange={(e) => setUserProfile({ ...userProfile, linkedIn: e.target.value })} />
                    </div>
                    <div className="mt-4 ">
                        <button onClick={handleProfileUpdate} className='btn btn-success rounded w-100'>Update</button>
                    </div>
                </div>
            </Collapse>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </div>
    )
}

export default Profile