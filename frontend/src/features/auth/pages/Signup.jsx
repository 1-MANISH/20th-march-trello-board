import "../style/auth.form.scss"
import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Signup = () => {
        const {loading,handleRegister} = useAuth()

        const navigate = useNavigate()
        const [username,setUsername] = useState("")
        const [password,setPassword] = useState("")

        const handleSubmit = useCallback(async (e) =>{
                e.preventDefault()
                try {
                        await handleRegister({username,password})
                        navigate('/')
                } catch (error) {
                        console.error("Registration failed", error)
                }
        }, [username,password,navigate,handleRegister])

        return (
               <main>
                        <div className="form-container box-shadow">
                                <h1>Register</h1>

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
                                                        {loading ? "Registering..." : "Register"}
                                        </button>
                                </form>
                                  <p>
                                        Already have an account? 
                                        <Link to={"/login"} > Login</Link>
                                 </p>
                
                        </div>
               </main>
        )
}

export default Signup;

