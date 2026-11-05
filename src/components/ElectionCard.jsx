import { CalendarDays, CheckCircle2, ChevronRight, Users } from "lucide-react";

export default function ElectionCard({ election, voted, onVote, showManage = false }) {
  return (
    <article className="election-card">
      <div className="election-card-top"><span className="eyebrow">{election.category || "Election"}</span><span className={`status-pill ${election.status === "active" ? "status-active" : "status-closed"}`}><i />{election.status === "active" ? "Live" : "Closed"}</span></div>
      <h3>{election.title}</h3>
      <p>{election.description}</p>
      <div className="election-meta"><span><CalendarDays size={15} /> Ends {election.endDate || "Not set"}</span><span><Users size={15} /> {election.candidates.length} candidates</span></div>
      <div className="election-card-bottom">
        {voted ? <span className="voted-label"><CheckCircle2 size={16} /> Vote submitted</span> : <span className="muted-small">{election.status === "active" ? "Your voice matters" : "Voting is closed"}</span>}
        <button className="text-button" onClick={onVote} disabled={election.status !== "active" || voted || showManage}>{showManage ? "Manage" : voted ? "Completed" : "View election"} <ChevronRight size={16} /></button>
      </div>
    </article>
  );
}