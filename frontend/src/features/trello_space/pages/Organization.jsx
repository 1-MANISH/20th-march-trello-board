import { useParams, useNavigate } from "react-router"
import { useTrello } from "../hooks/useTrello"
import { useCallback, useEffect, useState, useMemo } from "react"
import Loader from "../../../components/Loader"
import "../style/organization.scss"

const Organization = () => {
        const params = useParams()
        const organizationId = params.organizationId
        const navigate = useNavigate()
        const {
                fLoading,
                tLoading,
                organization,
                allowedMembers,
                handleGetAllowedMembersList,
                handleGetOrganizationDetails,
                handleCreateBoard,
                handleAddMemberToOrganization,
                handleDeleteMemberFromOrganization,
        } = useTrello()

        const [title, setTitle] = useState("")
        const [selectedMember, setSelectedMember] = useState("")


        const members = useMemo(() => (organization?.members ?? []), [organization])
        const boards = useMemo(() => (organization?.boards ?? []), [organization])

        const onBoardClick = (boardId) => {
                navigate(`/organizations/${organizationId}/${boardId}/issues`)
        }

        const onCreateBoard = useCallback(
                async (e) => {
                        e.preventDefault()
                        if (!title.trim()) {
                                setActionError("Please enter a board title")
                                return
                        }

                        try {
                                await handleCreateBoard({ organizationId, title: title.trim() })
                                await handleGetOrganizationDetails({ organizationId })
                        } catch (error) {
                                console.error(error)
                        }
                },
        [handleCreateBoard, handleGetOrganizationDetails, organizationId, title],
        )

        const onAddMember = useCallback(
                async (e) => {
                        e.preventDefault()
                        if (!selectedMember) {

                                return
                        }

                        try {
                                await handleAddMemberToOrganization({ organizationId, memberId: selectedMember })
                                await handleGetOrganizationDetails({ organizationId })
                                await handleGetAllowedMembersList({ organizationId })
                        } catch (error) {

                                console.error(error)
                        }
                },
        [selectedMember, handleAddMemberToOrganization, handleGetOrganizationDetails, handleGetAllowedMembersList, organizationId],
        )

        const onDeleteMember = useCallback(async (memberId) => {
                try {
                                await handleDeleteMemberFromOrganization({ organizationId, memberId })
                       
                                await handleGetOrganizationDetails({ organizationId })
                                await handleGetAllowedMembersList({ organizationId })
                        } catch (error) {
                                console.log(error)
                        }
                },
                [ organizationId, handleDeleteMemberFromOrganization, handleGetOrganizationDetails, handleGetAllowedMembersList],
        )


         useEffect(() => {
                const fetchData = async () => {
                        try {
                                await handleGetOrganizationDetails({ organizationId })
                                await handleGetAllowedMembersList({ organizationId })
                        } catch (error) {
                                console.log(error)
                        }
                }
                fetchData()
        }, [organizationId])

        // console.log(organization,allowedMembers)



        return fLoading ?<Loader /> : (
                <section className="organization-page">
                        <div className="organization-content">

                                         <header className="organization-top-card">
                                        <div>
                                                <h1>{organization?.name || "Organization Name"}</h1>
                                                <p>{organization?.description || "No description available"}</p>
                                                <span className="organization-meta">
                                                {organization?.members?.length ?? 0} members • {organization?.boards?.length ?? 0} boards
                                                </span>
                                        </div>
                                </header>
          

                                <div className="organization-body">
    
                                        <section className="organization-left">
                                                <div className="subpanel">
                                                <h2>Members</h2>
                                                <div className="list-box">
                                                        {
                                                        members.length > 0 ? (
                                                        members.map((member) => (
                                                                <article className="item-row" key={member._id || member.id || member.email}>
                                                                        <div>
                                                                                <span>{member.name || member.username || "Member"}</span>
                                                                                <small>{member.email || "No email"}</small>
                                                                        </div>
                                                                        <button className="danger-btn" onClick={() => onDeleteMember(member.id)} disabled={tLoading}>
                                                                                {tLoading?"Removing....":"Remove member"}
                                                                        </button>
                                                                </article>
                                                        ))
                                                        ) : (
                                                        <p className="empty">No members yet</p>
                                                        )
                                                        }
                                                </div>
                                                </div>

                                                <div className="subpanel">
                                                        <h2>Boards</h2>
                                                        <div className="list-box">
                                                                {
                                                                boards.length > 0 ? (
                                                                boards.map((board) => (
                                                                        <button
                                                                                key={board._id || board.id || board.title}
                                                                                className="board-link"
                                                                                onClick={() => onBoardClick(board._id || board.id)}
                                                                        >
                                                                                {board.title || "Untitled board"}
                                                                        </button>
                                                                        ))
                                                                        ) : (
                                                                        <p className="empty">No boards yet</p>
                                                                        )
                                                                }
                                                        </div>
                                                </div>
                                        </section>
                       

                                        <aside className="organization-right">
                                        <div className="panel">
                                        <h2>Add Member</h2>
                                        <form onSubmit={onAddMember} className="action-form">
                                                <select
                                                value={selectedMember}
                                                onChange={(e) => setSelectedMember(e.target.value)}
                                                >
                                                <option value="">Select member</option>
                                                {
                                                allowedMembers?.length > 0 ? (
                                                allowedMembers.map((member) => (
                                                        <option key={member.id} value={member.id}>
                                                                {member.username }
                                                        </option>
                                                ))
                                                ) : (
                                                        <option value="" disabled>
                                                        No allowed members found
                                                        </option>
                                                )
                                                }
                                                </select>
                                                <button type="submit" className="primary-btn">
                                                {tLoading ? "Adding...":"Add Member"}
                                                </button>
                                        </form>
                                        </div>

                                        <div className="panel">
                                        <h2>Create Board</h2>
                                        <form onSubmit={onCreateBoard} className="action-form">
                                                <input
                                                        type="text"
                                                        placeholder="Board title"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                />
                                                <button type="submit" className="primary-btn" disabled={tLoading}>
                                               {tLoading ? " Creating....":" Create board"}
                                                </button>
                                        </form>
                                        </div>

                                      
                                        </aside>
                                </div>
                        </div>
                </section>
        )
}

export default Organization