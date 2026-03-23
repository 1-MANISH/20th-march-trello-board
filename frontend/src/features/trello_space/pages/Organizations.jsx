import { useEffect, useMemo, useState } from "react"
import Loader from "../../../components/Loader"
import { useTrello } from "../hooks/useTrello"
import "../style/organizations.scss"
import { useNavigate } from "react-router"

const Organizations = () => {

        const { fLoading,tLoading, handleGetAllOrganizations, organizations, handleCreateOrganization } = useTrello()
        const [name, setName] = useState("")
        const [description, setDescription] = useState("")
        const navigate = useNavigate()

        useEffect(() => {
                 const fetchData = async () => {
                        try {
                                await handleGetAllOrganizations()
                        } catch (error) {
                                console.log(error)
                        }
                }
                fetchData()
        }, [])

        const sortedOrgs = useMemo(() => {
                if (!organizations?.length) 
                        return []
                return [...organizations].sort((a, b) => a.name.localeCompare(b.name))
        }, [organizations])

        const handleSubmit = async (e) => {
                e.preventDefault()
                if (!name.trim() || !description.trim()) 
                        return

                try {
                        await handleCreateOrganization({ name: name.trim(), description: description.trim() })
                        setName("")
                        setDescription("")
                        await handleGetAllOrganizations()
                } catch (error) {
                        console.error(error)
                } 
        }



        return (
                <div className="organizations-page">
                        <div className="org-list-panel">

                                {
                                        fLoading ? <Loader /> :(
                                                <>
                                                   <h2>Your Organizations - ( {organizations?.length})</h2>
                                                <div className="org-list">
                                                {
                                                        sortedOrgs?.length > 0 ? (
                                                        sortedOrgs.map((org) => (
                                                                <div className="org-item" key={org.id || org.name} role="button" onClick={()=> navigate(`/organizations/${ org.id }`)}>
                                                                        <div>
                                                                                <h3>{org.name}</h3>
                                                                                <p>{org.description}</p>
                                                                        </div>
                                                                        <div>
                                                                                <h3>Members : {org.members.length}</h3>
                                                                        </div>
                                                                </div>
                                                        ))
                                                        ) : (
                                                                <div className="empty-state">No organizations yet. Create one!</div>
                                                        )
                                                }
                                                </div>
                                                
                                                </>
                                        )
                                }
                             
                        </div>

                        <div className="org-form-panel">
                                <div className="org-form-box">
                                        <h2>Create Organization</h2>
                                        <form onSubmit={handleSubmit}>
                                                <label htmlFor="org-name">Name</label>
                                                <input
                                                        id="org-name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Enter organization name"
                                                        required
                                                />

                                                <label htmlFor="org-description">Description</label>
                                                <textarea
                                                        id="org-description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Enter organization description"
                                                        rows={4}
                                                        required
                                                />

                               
                                        <button type="submit" className="primary-btn" disabled={tLoading}>
                                                {tLoading ? "Creating..." : "Create Organization"}
                                        </button>
                                </form>
                                </div>
                        </div>
                </div>
        )
}

export default Organizations