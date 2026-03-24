

import '../style/header.scss'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useCallback } from 'react'
import Loader from "../components/Loader"
import { CiUser } from "react-icons/ci";
import { redirect } from 'react-router';

const Header = () => {
        const { user,handleLogout,loading } = useAuth()



        const handleLogoutFunc = useCallback(async()=>{
                await handleLogout()
        },[handleLogout])

        const handleProfileClick = useCallback(() => {
                // navigate('/profile')
        },[])

        if(loading){
                return <Loader />
        }

        return (
        <header className="app-header">
                <div className="brand" role="button" onClick={() =>{
                       window.location.href="/"
     
                }}>Trello</div>
                <div className="actions">
                        {user ? (
                                <div className="header-left">
                                         <button className="logout-button" onClick={handleLogoutFunc}>
                                                Logout
                                        </button>
                                          <button className="profile-button" onClick={handleProfileClick}>
                                        <div className="header-profile">
                                                <CiUser />
                                                <p>{user?.username}</p>
                                        </div>

                                        </button>
                                        
                                </div>
                       
                        ) : (
                                <div style={{display:"flex",gap:"1rem"}}>
                                          <button className='button' onClick={()=>window.location.href="/login"} >Login</button>
                                          <button className='button' onClick={()=>window.location.href="/signup"}>Signup</button>
                                </div>

                      
                        )}
                </div>
        </header>
        )
}

export default Header