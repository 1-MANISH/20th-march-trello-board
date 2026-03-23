import { Navigate } from "react-router"
import Loader from "../../../components/Loader"
import { useAuth } from "../hooks/useAuth"

function NotProtected({children}) {

        const {user,loading} = useAuth()
        if(loading){
                return <main>
                        <Loader />
                </main>
        }

        if(user){
                return <Navigate to="/organizations" />
              
        }
        return children
        
}

export default NotProtected