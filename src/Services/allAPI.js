
// api calls for register

import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonAPI"

// register API
export const registerAPI = async (user) => {
   return await commonAPI("POST", `${BASE_URL}/user/register`, user, "")

}

// login API
export const loginAPI = async (user) => {
   return await commonAPI("POST", `${BASE_URL}/user/login`, user, "")
}

//addproject
export const addProjectAPI = async (reqBody, reqHeader) => {
   return await commonAPI("POST", `${BASE_URL}/projects/add`, reqBody, reqHeader)
}

//homeproject
export const homeProjectAPI = async () => {
   return await commonAPI("GET", `${BASE_URL}/projects/home-project`)
}

//allproject
export const allProjectAPI = async (searchKey,reqHeader) => {
   //path parameter,query parameter,body parameter
   //for query parameter put a question mark then a variable/value of variable
   return await commonAPI("GET", `${BASE_URL}/projects/all-project?search=${searchKey}`, "", reqHeader)
}

//userProject
export const userProjectAPI = async (reqHeader) => {
   return await commonAPI("GET", `${BASE_URL}/user/all-project`, "", reqHeader)
}

// edit userproject
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${BASE_URL}/projects/edit/${projectId}`,reqBody,reqHeader)
}

//delete userproject
export const deleteProjectAPI = async(projectId,reqHeader)=>{
   return await commonAPI("DELETE",`${BASE_URL}/projects/remove/${projectId}`,{},reqHeader)
}

//profile update
export const updateProfileAPI = async(reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}