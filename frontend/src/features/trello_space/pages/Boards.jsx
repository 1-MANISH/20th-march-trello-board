import { useParams } from "react-router"
const Boards = () => {

        const params = useParams()

        return (
                <div>
                        {
                                params.organizationId + " boards"
                        }
                </div>
        )
}

export default Boards