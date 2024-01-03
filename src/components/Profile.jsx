import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../Services/baseUrl';
import { updateProfileAPI } from '../Services/allAPI';

function Profile() {
    const [open, setOpen] = useState(false);

    const [isUpdate,setIsUpdate] = useState(false)

    const [userProfile, setUserProfile] = useState({
        username: "",
        email: "",
        password: "",
        github: "",
        linkedIn: '',
        profile: ""
    })
    //to hold the existing image(once there is profile photo uploaded)
    const [existingImage, setExistingImage] = useState("")
    //tohold the url of the new image
    const [preview, setPreview] = useState("")

    useEffect(() => {
        //getting the existingUser then converting the string into object using JSON.parse
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({
            ...userProfile,
            username: user.username,
            email: user.email,
            password: user.password,
            github: user.github,
            linkedIn: user.linkedIn,
            profile: ""
        })
    }, [])

    useEffect(() => {
        if (userProfile.profile) {
            setPreview(URL.createObjectURL(userProfile.profile))
        }
        else {
            setPreview("")

        }
    }, [userProfile.profile])

    const handleProfileUpdate = async () => {

        const { username, email, password, profile, github, linkedIn } = userProfile

        if (!github || !linkedIn) {
            alert('please fill the form completely')
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
                    alert('profile updated successfully')
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
        <>
            <div className='card shadow p-5 '>
                <div className='d-flex justify-content-between'>
                    <h3>Profile</h3>
                    <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-arrow-up-from-bracket fa-rotate-180"></i></button>
                </div>
                <Collapse in={open}>
                    <div className='text-center mt-3'>
                        <label htmlFor="pro">
                            <input id='pro' type="file" style={{ display: 'none' }} onChange={(e) => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                            {existingImage == "" ?
                                <img width={'200$'} src={preview ? preview : "https://www.freeiconspng.com/uploads/female-user-icon-clip-art--30.png"} alt="no image" className='rounded-circle' /> :
                                <img width={'200$'} src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle' />}
                        </label>

                        <div className="mt-5">
                            <input type="text" className='form-control' placeholder='GitHub' alue={userProfile.github} onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} />
                        </div>
                        <div className="mt-3">
                            <input type="text" className='form-control' placeholder='LinkedIn' value={userProfile.linkedIn} onChange={(e) => setUserProfile({ ...userProfile, linkedIn: e.target.value })} />
                        </div>
                        <div className="mt-4">
                            <button onClick={handleProfileUpdate} className='btn btn-success rounded w-100'>Update</button>
                        </div>
                    </div>
                </Collapse>
            </div>

        </>
    )
}

export default Profile