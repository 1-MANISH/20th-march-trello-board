import axiosInstance from "../../../utils/axios";


export async function createOrganization({name,description}){
        try {
                const response = await axiosInstance.post('/api/v1/organization/create',{
                        name,
                        description
                })
                return response.data
        } catch (error) {
                throw error
        }
}
export async function getAllOrganizations(){
        try {
                const response = await axiosInstance.get('/api/v1/organization/all')
                return response.data.data
        } catch (error) {
                throw error
        }
}
export async function getOrganizationDetails({organizationId}){
        try {
                const response = await axiosInstance.get(`/api/v1/organization/${organizationId}`)
                return response.data.data
        } catch (error) {
                throw error
        }
}

export async function getAllowedMembersList({organizationId}){
        try {
                const response = await axiosInstance.get(`/api/v1/member/allow-member-lists/${organizationId}`)
                return response.data.data
        } catch (error) {
                throw error
        }
}
export async function addMemberToOrganization({organizationId,memberId}){
        try {
                const response = await axiosInstance.post(`/api/v1/member/add-member-to-organization/${organizationId}`,{
                       memberId
                })
                return response.data
        } catch (error) {
                throw error
        }
}
export async function deleteMemberFromOrganization({organizationId,memberId}){
        try {
                const response = await axiosInstance.delete(`/api/v1/member/delete-member-from-organization?organizationId=${organizationId}&memberId=${memberId}`)
                return response.data
        } catch (error) {
                throw error
        }
}

export async function createBoard({organizationId,title}){
        try {
                const response = await axiosInstance.post(`/api/v1/board/create?organizationId=${organizationId}`,{
                        title
                })
                return response.data
        } catch (error) {
                throw error
        }
}

export async function createIssue({organizationId,boardId,title,description}){
        try {
                const response = await axiosInstance.post(`/api/v1/issue/create?organizationId=${organizationId}&boardId=${boardId}`,{
                        title,
                        description
                })
                return response.data
        } catch (error) {
                throw error
        }
}

export async function updateIssueStatus({issueId,status}){
        try {
                const response = await axiosInstance.put(`/api/v1/issue/update-status?issueId=${issueId}`,{
                        status
                })
                return response.data
        } catch (error) {
                throw error
        }
}