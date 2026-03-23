
import {  Link } from 'react-router'
import '../style/header.scss'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useCallback } from 'react'
import Loader from "../components/Loader"

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
                <div className="brand" role="button" onClick={() =><Link to={"/"}/>}>trello</div>
                <div className="actions">
                        {user ? (
                                <div>
                                         <button className="logout-button" onClick={handleLogoutFunc}>
                                                Logout
                                        </button>
                                          <button className="profile-button" onClick={handleProfileClick}>
                                        <p>{user?.username}</p>
                                        </button>
                                        
                                </div>
                       
                        ) : (
                                <div style={{display:"flex",gap:"1rem"}}>
                                          <button className='button' onClick={()=><Link to={"login"} />}>Login</button>
                                          <button className='button' onClick={()=><Navigate to={"signup"} />}>Signup</button>
                                </div>

                      
                        )}
                </div>
        </header>
        )
}

export default Header