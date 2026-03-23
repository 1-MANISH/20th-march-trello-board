import axiosInstance from "../../../utils/axios";

export async function signup({username,password}){
        try {
                const response = await axiosInstance.post('/api/auth/signup',{username,password})
                return response.data
        } catch (error) {
                throw error
        }
}

export async function login({username,password}){
        try {
                const response = await axiosInstance.post('/api/auth/login',{username,password})
                return response.data
        } catch (error) {
                throw error
        }
}


export async function logout(){

        try {
                const response = await axiosInstance.get('/api/auth/logout')
                return response.data
        } catch (error) {
                throw error
        }
}

export async function getMyProfile(){
        try {
                const response = await axiosInstance.get( '/api/auth/me')
                return response.data.data
        } catch (error) {
                throw error
        }
}