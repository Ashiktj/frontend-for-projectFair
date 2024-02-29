//all api calls

import { base_url } from "./baseUrl"
import { commonAPI } from "./commonAPI"


//register api

export const registerAPI = async (user) => {
    return await commonAPI("post", `${base_url}/register`, user, "")

}

//Login API call

export const loginAPI = async (user) => {
    return await commonAPI("post", `${base_url}/login`, user, "")
}


//add projects API
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI("post", `${base_url}/project/add`, reqBody, reqHeader)

}


//get home project api call

export const homeProjectAPI = async () => {
    return await commonAPI("get", `${base_url}/project/home-project`, "", "")
}

//get all projects api call

export const allProjectAPI = async(searchkey,reqHeader) => {
    return await commonAPI("get",`${base_url}/project/all-project?search=${searchkey}`,"",reqHeader)
}


export const userProjectAPI = async (reqHeader) => {
    return await commonAPI("get", `${base_url}/project/all-user-project`, "", reqHeader)
}

//update user projects api call
export const updateUserProjectAPI = async (projectId, reqBody, reqHeader) => {

    return await commonAPI("put", `${base_url}/project/update-project/${projectId}`, reqBody, reqHeader)



}


export  const delectUserProject = async(projectId,reqHeader) => {
    return await  commonAPI("delete",`${base_url}/project/delete-project/${projectId}`,{},reqHeader)
}