import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Vote, MapPin } from "lucide-react";
import Layout from "../components/Layout";
import { getCurrentUser } from "../auth";
import { getElections, hasVoted, castVote, getVotes } from "../store";

export default function UserDashboard() {
  const user=getCurrentUser(); const [elections,setElections]=useState(getElections());
  const [selected,setSelected]=useState(null); const [candidateId,setCandidateId]=useState("");
  const [notice,setNotice]=useState(""); const active=elections.filter(e=>e.status==="active");
  const completed=elections.filter(e=>hasVoted(user.id,e.id)); const totalVotes=getVotes().filter(v=>v.userId===user.id).length;
  function submitVote(){if(!candidateId){setNotice("Choose a candidate first.");return;}if(!window.confirm("Submit your vote? You cannot change it in this demo."))return;const r=castVote(user.id,selected.id,candidateId);if(!r.ok){setNotice(r.message);return;}setNotice("Your demo vote has been recorded.");setSelected(null);setCandidateId("");setElections(getElections());}
  return <Layout user={user}><div className="welcome-banner"><div><span className="hero-kicker">MY VOTER WORKSPACE</span><h1>Namaste, {user.name.split(" ")[0]}.</h1><p>Explore constituency-based election simulations and review candidate information.</p></div><div className="banner-art"><div className="banner-circle"><Vote size={38}/></div></div></div>
    {notice&&<div className="alert alert-success">{notice}<button onClick={()=>setNotice("")}>Dismiss</button></div>}
    <div className="stats-grid user-stats"><Stat label="Open simulations" value={active.length} detail="Available to explore"/><Stat label="Your demo votes" value={totalVotes} detail="Submitted in this browser"/><Stat label="Completed" value={`${completed.length}/${elections.length}`} detail="Elections participated in"/></div>
    <div className="section-heading"><div><h2>Available election simulations</h2><p>Check the election type, year, state and constituency before voting.</p></div></div>
    <div className="election-grid">{active.map(e=><article className="election-card" key={e.id}><div className="election-card-top"><span className="eyebrow">{e.type} · {e.year}</span><span className="status-pill status-active"><i/>Open</span></div><h3>{e.title}</h3><p>{e.description}</p><div className="election-meta"><span><MapPin size={14}/>{e.constituency}, {e.state}</span><span>{e.candidates.length} candidates</span></div><div className="candidate-mini-list">{e.candidates.map(c=><div key={c.id}><strong>{c.name}</strong><span>{c.partyShort||c.party}</span></div>)}</div><div className="election-card-bottom">{hasVoted(user.id,e.id)?<span className="voted-label"><CheckCircle2 size={16}/> Vote submitted</span>:<button className="text-button" onClick={()=>{setSelected(e);setCandidateId("");}}>View candidates & vote <ArrowRight size={15}/></button>}</div></article>)}{!active.length&&<div className="empty-state">No constituency election simulations have been published yet. The administrator must add verified candidate records for a specific election.</div>}</div>
    {selected&&<div className="modal-backdrop"><div className="modal"><div className="modal-heading"><div><span className="eyebrow">{selected.type} · {selected.year}</span><h2>{selected.constituency}, {selected.state}</h2></div><button className="icon-button" onClick={()=>setSelected(null)}>×</button></div><p className="modal-description">{selected.description}</p><p className="choice-label">Select a candidate</p><div className="candidate-options">{selected.candidates.map(c=><label className={`candidate-option ${candidateId===c.id?"chosen":""}`} key={c.id}><input type="radio" name="candidate" checked={candidateId===c.id} onChange={()=>setCandidateId(c.id)}/><CandidateSymbol candidate={c}/><span className="candidate-copy"><strong>{c.name}</strong><small>{c.party}</small>{c.source&&<a href={c.source} target="_blank" rel="noreferrer" className="candidate-source">Verification source ↗</a>}</span></label>)}</div><div className="vote-warning"><ShieldCheck size={17}/> Educational simulation only. This is not an official ballot.</div><button className="primary-button full-button" onClick={submitVote}>Confirm demo vote <ArrowRight size={16}/></button></div></div>}
  </Layout>;
}
function Stat({label,value,detail}){return <div className="stat-card"><div className="stat-top"><span>{label}</span></div><strong>{value}</strong><small>{detail}</small></div>;}

function CandidateSymbol({ candidate }) {
  const key = (candidate.partyShort || candidate.party || "").toUpperCase().replace(/\s+/g, "");
  const symbols = {
    YSRCP: ["/symbols/ysrcp-fan.svg", "Ceiling fan"],
    BJP: ["/symbols/bjp-lotus.svg", "Lotus"],
    "CPI(M)": ["/symbols/cpim-hammer-sickle-star.svg", "Hammer, sickle and star"],
    "CPIM": ["/symbols/cpim-hammer-sickle-star.svg", "Hammer, sickle and star"],
    BSP: ["/symbols/bsp-elephant.svg", "Elephant"],
  };
  const partyText = `${candidate.party || ""} ${candidate.symbol || ""}`.toUpperCase();
  const item = symbols[key]
    || (partyText.includes("YUVAJANA") || partyText.includes("YSRCP") || partyText.includes("FAN") ? symbols.YSRCP : null)
    || (partyText.includes("BHARATIYA JANATA") || partyText.includes("BJP") || partyText.includes("LOTUS") ? symbols.BJP : null)
    || (partyText.includes("COMMUNIST PARTY OF INDIA (MARXIST)") || partyText.includes("CPI(M)") || partyText.includes("HAMMER") ? symbols["CPI(M)"] : null)
    || (partyText.includes("BAHUJAN SAMAJ") || partyText.includes("BSP") || partyText.includes("ELEPHANT") ? symbols.BSP : null);
  if (candidate.photoUrl) return <span className="candidate-symbol candidate-photo"><img src={candidate.photoUrl} alt={`${candidate.name} candidate photo`} onError={e => { e.currentTarget.style.display = "none"; }} /></span>;
  return <span className={`candidate-symbol ${item ? "party-symbol-card" : "generic-symbol-card"}`} title={item?.[1] || candidate.symbol || "Candidate symbol"}>
    {item ? <img src={item[0]} alt={`${item[1]} party symbol`} /> : <img src="/symbols/ballot-box.svg" alt="Ballot box symbol" />}
  </span>;
}
