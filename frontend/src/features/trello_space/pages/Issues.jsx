
import { useParams } from "react-router"
const Issues = () => {

         const params = useParams()
        return (
                 <div>
                        {
                                params.organizationId + " boardId = "+params.boardId
                        }
                </div>
        )
}

export default Issues