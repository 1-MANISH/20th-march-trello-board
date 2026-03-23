import { useParams } from "react-router"
import { useTrello } from "../hooks/useTrello"
import { useCallback, useEffect, useState } from "react"


const Organization = () => {

        const params = useParams()
        const organizationId =params.organizationId 
        const { fLoading,tLoading,organization,allowedMembers,handleGetAllowedMembersList, handleGetOrganizationDetails,handleCreateBoard  } = useTrello()
        const [ title,setTitle] = useState("")

        useEffect(()=>{
                const fetchData = async()=>{
                        try {
                                await handleGetOrganizationDetails({organizationId})
                                await handleGetAllowedMembersList({organizationId})
                        } catch (error) {
                                console.log(error)
                        }
                }
                fetchData()
        },[organizationId])

        const handleSubmit = useCallback(async()=>{
                try {
                      await handleCreateBoard({organizationId,title})  
                } catch (error) {
                        console.log(error)
                }
        },[handleCreateBoard,organizationId])


        return (
                <div>Organization : {organizationId}</div>
        )
}

export default Organization