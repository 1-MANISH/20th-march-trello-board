import "../style/auth.form.scss"
import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
        const {loading,handleLogin} = useAuth()

        const navigate = useNavigate()
        const [username,setUsername] = useState("")
        const [password,setPassword] = useState("")

        const handleSubmit = useCallback(async (e) =>{
                e.preventDefault()
                try {
                       await handleLogin({username,password})
                        navigate('/')
                } catch (error) {
                        console.error("Login failed", error)
                }
        }, [username,password,navigate,handleLogin])

        return (
               <main>
                        <div className="form-container box-shadow">
                                <h1>Login</h1>

                                <form onSubmit={handleSubmit}>
                                        <div className="input-group">
                                                <label htmlFor="username">Username</label>
                                                <input
                                                        value={username}
                                                        onChange={(e) => { setUsername(e.target.value) }}
                                                        type="text" 
                                                        id="username" 
                                                        name='username' 
                                                        placeholder='Enter your username' 
                                                />
                                        </div>
                                      
                                        <div className="input-group">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                        value={password}
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                        type="password" 
                                                        id="password" 
                                                        name='password' 
                                                        placeholder='Enter password' 
                                                />
                                        </div>
                                        <button 
                                                disabled={loading} 
                                                type='submit' 
                                                className='button primary-button' 
                                                >
                                                        {loading ? "Loging..." : "Login"}
                                        </button>
                                </form>
                                  <p>
                                         Don't have an account? 
                                        <Link to={"/signup"} > Signup</Link>
                                 </p>
                
                        </div>
               </main>
        )
}

export default Login;

