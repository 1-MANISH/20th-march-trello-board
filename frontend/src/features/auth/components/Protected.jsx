import { Navigate } from "react-router"
import Loader from "../../../components/Loader"
import { useAuth } from "../hooks/useAuth"

function Protected({children}) {

        const {user,loading} = useAuth()
        // if(loading){
        //         return <main>
        //                 <Loader />
        //         </main>
        // }

        if(!user){
                return <Navigate to="/" />
              
        }
        return children
        
}

export default Protected