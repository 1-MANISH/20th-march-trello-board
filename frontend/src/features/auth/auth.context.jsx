import  {createContext,useContext,useState} from "react"


export const AuthContext = createContext()

export const AuthProvider  = ({children}) =>{

        const [loading,setLoading] = useState(true)
        const [user,setUser] = useState(null)
        
        return (
                <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
                        {children}
                </AuthContext.Provider>
        )
}

export const useAuthContext = () => useContext(AuthContext)