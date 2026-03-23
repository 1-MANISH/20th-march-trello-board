import { createContext, useContext, useState } from "react";


export const TrelloSpaceContext = createContext()


export const TrelloSpaceProvider = ({children}) =>{

        const [tLoading,setTLoading] = useState(false)
        const [fLoading,setFLoading] = useState(false)
        const [organizations,setOrganizations] = useState(null)
        const [allowedMembers,setAllowedMembers] = useState(null)
        const [organization,setOrganization] = useState(null)
        const [boards,setBoards] = useState(null)
        const [issues,setIssues] = useState(null)


        return (
                <TrelloSpaceContext.Provider value={{tLoading,setTLoading,fLoading,setFLoading,allowedMembers,setAllowedMembers,organizations,setOrganizations,organization,setOrganization,boards,setBoards,issues,setIssues}}>
                        {children}
                </TrelloSpaceContext.Provider>
        )
}

export const useTrelloSpaceContext = () => useContext(TrelloSpaceContext)