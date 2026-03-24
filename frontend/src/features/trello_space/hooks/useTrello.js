
import { getAllOrganizations, getOrganizationDetails,getAllBoardIssues ,createOrganization, addMemberToOrganization, deleteMemberFromOrganization, createBoard, createIssue, updateIssueStatus, getAllowedMembersList} from "../services/trello.api"
import {useTrelloSpaceContext} from "../trellospace.context"


export const useTrello = () =>{

        const {tLoading,setTLoading,fLoading,setFLoading,allowedMembers,setAllowedMembers,organizations,setOrganizations,organization,setOrganization,boards,setBoards,issues,setIssues} = useTrelloSpaceContext()

        const handleCreateOrganization = async ({name,description}) =>{
                        try {
                                setTLoading(true)
                                const data = await createOrganization({name,description})
                        } catch (error) {
                                throw error
                        }finally{
                                setTLoading(false)
                        }
        }
        const handleGetAllOrganizations = async () =>{
                        try {
                                setFLoading(true)
                                const data = await getAllOrganizations()
                                setOrganizations(data.organizations)
                        } catch (error) {
                                setOrganizations(null)
                                throw error
                        }finally{
                                setFLoading(false)
                        }
        }
        const handleGetOrganizationDetails = async ({organizationId}) =>{
                        try {
                                setFLoading(true)
                                const data = await getOrganizationDetails({organizationId})
                                setOrganization(data.organization)
                        } catch (error) {
                                setOrganization(null)
                                throw error
                        }finally{
                                setFLoading(false)
                        }
        }
        const handleGetAllowedMembersList = async ({organizationId}) =>{
                        try {
                                setFLoading(true)
                                const data = await getAllowedMembersList({organizationId})
                                setAllowedMembers(data.allowedMembers)
                        } catch (error) {
                                setAllowedMembers(null)
                                throw error
                        }finally{
                                setFLoading(false)
                        }
        }

        const handleAddMemberToOrganization =async({organizationId,memberId}) =>{
                try {
                         setTLoading(true)
                        const data = await addMemberToOrganization({organizationId,memberId})
                } catch (error) {
                                throw error
                 }finally{
                        setTLoading(false)
                }
        }
        const handleDeleteMemberFromOrganization =async({organizationId,memberId}) =>{
                try {
                         setTLoading(true)
                        const data = await deleteMemberFromOrganization({organizationId,memberId})
                } catch (error) {
                                throw error
                 }finally{
                        setTLoading(false)
                }
        }
        const handleCreateBoard = async({organizationId,title})=>{
                 try {
                         setTLoading(true)
                        const data = await createBoard({organizationId,title})
                        return data
                } catch (error) {
                                throw error
                 }finally{
                        setTLoading(false)
                }
        }

        const handleGetAllBoardIssues = async({boardId})=>{
                try {
                        setFLoading(true)
                        const data = await getAllBoardIssues({boardId})
                        setIssues( data.issues)
                } catch (error) {
                        setIssues(null)
                        throw error
                }finally{
                        setFLoading(false)
                }
        }

        const handleCreateIssue = async({organizationId,boardId,title,description})=>{
                 try {
                         setTLoading(true)
                        const data = await createIssue({organizationId,boardId,title,description})
                } catch (error) {
                                throw error
                 }finally{
                        setTLoading(false)
                }
        }
        const handleUpdateIssueStatus = async({issueId,status})=>{
                 try {
                         setTLoading(true)
                        const data = await updateIssueStatus({issueId,status})
                } catch (error) {
                                throw error
                 }finally{
                        setTLoading(false)
                }
        }

        return {
                tLoading,
                fLoading,
                organizations,
                allowedMembers,
                organization,
                boards,
                issues,
                handleGetAllowedMembersList,
                handleCreateOrganization,
                handleGetAllOrganizations,
                handleGetOrganizationDetails,
                handleAddMemberToOrganization,
                handleDeleteMemberFromOrganization,
                handleCreateBoard,
                handleCreateIssue,
                handleUpdateIssueStatus,
                handleGetAllBoardIssues
        }
}