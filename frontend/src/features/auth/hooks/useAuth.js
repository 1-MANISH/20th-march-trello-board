import { useEffect } from "react"
import { useAuthContext } from "../auth.context"
import { getMyProfile, login, logout, signup } from "../services/auth.api"


export const useAuth = () =>{

        const {user,setUser,loading,setLoading} =useAuthContext()

         const handleRegister = async ({username,password}) =>{
                try {
                        setLoading(true)
                        const data = await signup({username,password})
                        setUser(data)
                } catch (error) {
                        setUser(null)
                        throw error
                }finally{
                        setLoading(false)
                }
        }
        const handleLogin = async ({username,password}) =>{
                try {
                        setLoading(true)
                        const data = await login({username,password})
                        setUser(data)
                } catch (error) {
                        setUser(null)
                        throw error
                }finally{
                        setLoading(false)
                }
        }
     
        const handleLogout = async () =>{
                try {
                        setLoading(true)
                        await logout()
                        setUser(null)
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
        }

        useEffect(()=>{
                const fetchMyProfile  = async () =>{
                        try {
                                setLoading(true)
                                const data = await getMyProfile()
                                setUser(data)
                        } catch (error) {
                                setUser(null)
                        }finally{
                                setLoading(false)
                        }
                }
                fetchMyProfile()
        },[])

        return {
                user,
                loading,
                handleRegister,
                handleLogin,
                handleLogout
        }
}