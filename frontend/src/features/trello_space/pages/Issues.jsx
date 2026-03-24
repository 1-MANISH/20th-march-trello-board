import { useParams } from "react-router"
import { useTrello } from "../hooks/useTrello"
import { useCallback, useEffect, useMemo, useState } from "react"
import Loader from "../../../components/Loader"
import "../style/issues.scss"

const Issues = () => {
        const params = useParams()
        const { organizationId, boardId } = params

        const {
                fLoading,
                tLoading,
                issues,
                handleGetAllBoardIssues,
                handleCreateIssue,
                handleUpdateIssueStatus,
        } = useTrello()

        const [title, setTitle] = useState("")
        const [description, setDescription] = useState("")
        const [dragItem, setDragItem] = useState(null)

        const submitCreateIssue = useCallback(
                async (e) => {
                        e.preventDefault()
                        if (!title.trim() || !description.trim()) return
                        try {
                                await handleCreateIssue({
                                        boardId,
                                        organizationId,
                                        title: title.trim(),
                                        description: description.trim(),
                                })
                                 await handleGetAllBoardIssues({ boardId })
                                setTitle("")
                                setDescription("")
                               
                        } catch (error) {
                                console.log(error)
                        }
                },
        [boardId, organizationId, handleCreateIssue, title, description, handleGetAllBoardIssues],
        )

        const submitUpdateIssue = useCallback(
                async (issueId, status) => {
                        try {
                                await handleUpdateIssueStatus({ issueId, status })
                                await handleGetAllBoardIssues({ boardId })
                        } catch (error) {
                                console.log(error)
                        }
                },
        [boardId, handleUpdateIssueStatus, handleGetAllBoardIssues],
        )

        const next_up_issues = useMemo(() => (issues || []).filter((issue) => issue.state === "next_up"), [issues])
        const in_progress_issues = useMemo(() => (issues || []).filter((issue) => issue.state === "in_progress"), [issues])
        const done_issues = useMemo(() => (issues || []).filter((issue) => issue.state === "done"), [issues])

        useEffect(() => {
                const fetchData = async () => {
                try {
                        await handleGetAllBoardIssues({ boardId })
                } catch (error) {
                        console.log(error)
                }
                }
                fetchData()
        }, [boardId])

        const onDragStart = (issue) => setDragItem(issue)
        const onDragEnd = () => setDragItem(null)

        const onDrop = async (targetState) => {
                if (!dragItem || dragItem.state === targetState) return
                await submitUpdateIssue(dragItem.id, targetState)
                setDragItem(null)
        }

        const renderIssues = (list) =>
                list.length > 0 ? (
                        list.map((issue) => (
                                <article
                                        key={issue._id || issue.id || issue.title}
                                        className="issue-card"
                                        draggable
                                        onDragStart={() => onDragStart(issue)}
                                        onDragEnd={onDragEnd}
                                >
                                        <h4>{issue.title || "Untitled"}</h4>
                                        <p>{issue.description || "No description"}</p>
                                </article>
                        ))
                ) : (
                <p className="empty">No issues in this column</p>
        )



        return fLoading ?<Loader />: (
                <section className="issues-page">
                        <div className="issues-create-box">
                                <h2>Create Issue</h2>
                                <form className="issues-form" onSubmit={submitCreateIssue}>
                                        <input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Issue title"
                                                required
                                        />
                                        <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Issue description"
                                                required
                                        />
                                        <button className="primary-btn" type="submit" disabled={tLoading}>
                                                {tLoading ? "Creating issue...":"Create Issue"}
                                        </button>
                                </form>
                        </div>

                        <div className="issues-board">
                                {[
                                        { id: "next_up", title: "Next Up", items: next_up_issues },
                                        { id: "in_progress", title: "In Progress", items: in_progress_issues },
                                        { id: "done", title: "Done", items: done_issues },
                                ].map((column) => (
                                <div
                                        key={column.id}
                                        className="issues-column"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => onDrop(column.id)}
                                >
                                        <h3>{column.title}</h3>
                                        <div className="issue-list">{renderIssues(column.items)}</div>
                                </div>
                                ))}
                        </div>
                </section>
        )
}

export default Issues
