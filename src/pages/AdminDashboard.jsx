import { useState } from "react";
import { Plus, Users, Vote, ClipboardList, X, Trash2, ToggleLeft, ToggleRight, ExternalLink } from "lucide-react";
import Layout from "../components/Layout";
import { getCurrentUser, getUsers } from "../auth";
import { getElections, saveElections, getVotes } from "../store";
import { partyDirectory, states } from "../data";

export default function AdminDashboard() {
  const [elections, setElections] = useState(getElections());
  const [users] = useState(getUsers().filter(u => u.role === "user"));
  const [votes] = useState(getVotes());
  const [showForm, setShowForm] = useState(false);
  const [title,setTitle]=useState(""); const [description,setDescription]=useState("");
  const [state,setState]=useState("Andhra Pradesh"); const [constituency,setConstituency]=useState("");
  const [type,setType]=useState("Lok Sabha"); const [year,setYear]=useState("2024");
  const [endDate,setEndDate]=useState(""); const [candidateRows,setCandidateRows]=useState([{name:"",party:"bjp",source:""},{name:"",party:"inc",source:""}]);
  const [notice,setNotice]=useState(""); const user=getCurrentUser();
  const activeCount=elections.filter(e=>e.status==="active").length;
  function refresh(next){setElections(next);saveElections(next);}
  function updateCandidate(i,key,value){setCandidateRows(rows=>rows.map((r,index)=>index===i?{...r,[key]:value}:r));}
  function createElection(event){
    event.preventDefault();
    const candidates=candidateRows.filter(c=>c.name.trim()).map((c,i)=>{
      const party=partyDirectory.find(p=>p.id===c.party)||partyDirectory[0];
      return {id:`candidate-${Date.now()}-${i}`,name:c.name.trim(),party:party.name,partyShort:party.short,symbol:party.symbol,bio:"Candidate record entered by administrator.",source:c.source.trim()};
    });
    if(!constituency.trim()){setNotice("Enter the constituency name.");return;}
    if(candidates.length<2){setNotice("Add at least two candidate records.");return;}
    if(candidates.some(c=>!c.source)){setNotice("Add a source URL for every candidate. Use an official ECI result, candidate affidavit, or party nomination source.");return;}
    const next=[{id:`election-${Date.now()}`,title,description,state,constituency,type,year,category:type,status:"active",endDate,candidates},...elections];
    refresh(next);setShowForm(false);setTitle("");setDescription("");setConstituency("");setCandidateRows([{name:"",party:"bjp",source:""},{name:"",party:"inc",source:""}]);setNotice("Election added. Candidate source links are saved with the records.");
  }
  function toggleStatus(id){refresh(elections.map(e=>e.id===id?{...e,status:e.status==="active"?"closed":"active"}:e));}
  function removeElection(id){if(!window.confirm("Delete this demo election?"))return;refresh(elections.filter(e=>e.id!==id));}
  return <Layout user={user}><div className="page-heading"><div><span className="eyebrow">INDIA ELECTION ADMINISTRATION</span><h1>Election control room</h1><p>Manage constituency-specific election simulations and sourced candidate records.</p></div><button className="primary-button" onClick={()=>setShowForm(true)}><Plus size={18}/> Add election</button></div>
    {notice&&<div className="alert alert-success">{notice}<button onClick={()=>setNotice("")}>Dismiss</button></div>}
    <div className="stats-grid"><Stat icon={ClipboardList} label="Election simulations" value={elections.length} detail={`${activeCount} active`}/><Stat icon={Users} label="Registered demo voters" value={users.length} detail="This browser only"/><Stat icon={Vote} label="Votes submitted" value={votes.length} detail="Local Storage records"/><Stat icon={ToggleRight} label="Party directory" value={partyDirectory.length} detail="Reference entries"/></div>
    <div className="section-heading"><div><h2>Configured elections</h2><p>Each record should match one real election year and constituency.</p></div><span className="count-label">{elections.length} records</span></div>
    <div className="management-list">{elections.map(e=><div className="management-row" key={e.id}><div className="election-symbol"><Vote size={20}/></div><div className="management-info"><strong>{e.title}</strong><span>{e.type} · {e.constituency}, {e.state} · {e.year} · {e.candidates.length} candidates</span></div><span className={`status-pill ${e.status==="active"?"status-active":"status-closed"}`}><i/>{e.status}</span><button className="icon-button" title="Toggle election status" onClick={()=>toggleStatus(e.id)}>{e.status==="active"?<ToggleRight/>:<ToggleLeft/>}</button><button className="icon-button danger-icon" title="Delete" onClick={()=>removeElection(e.id)}><Trash2/></button></div>)}{!elections.length&&<div className="empty-state">No election simulations yet. Add a constituency-specific election with candidate source links.</div>}</div>
    {showForm&&<div className="modal-backdrop"><div className="modal modal-wide"><div className="modal-heading"><div><span className="eyebrow">NEW CONSTITUENCY ELECTION</span><h2>Add sourced election data</h2></div><button className="icon-button" onClick={()=>setShowForm(false)}><X/></button></div><form className="form-stack" onSubmit={createElection}>
      <label>Display title<input className="plain-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. General Election — Hyderabad" required/></label>
      <label>Description<textarea className="plain-input" value={description} onChange={e=>setDescription(e.target.value)} rows="2" required/></label>
      <div className="two-fields"><label>Election type<select className="plain-input" value={type} onChange={e=>setType(e.target.value)}><option>Lok Sabha</option><option>State Assembly</option></select></label><label>Election year<input className="plain-input" type="number" min="1951" max="2035" value={year} onChange={e=>setYear(e.target.value)} required/></label></div>
      <div className="two-fields"><label>State / UT<select className="plain-input" value={state} onChange={e=>setState(e.target.value)}>{states.map(s=><option key={s}>{s}</option>)}</select></label><label>Constituency<input className="plain-input" value={constituency} onChange={e=>setConstituency(e.target.value)} placeholder="e.g. Hyderabad" required/></label></div>
      <label>Voting close date<input className="plain-input" type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} required/></label>
      <div className="candidate-form-heading"><strong>Candidate records</strong><button type="button" className="text-button" onClick={()=>setCandidateRows(r=>[...r,{name:"",party:"others",source:""}])}><Plus size={15}/> Add candidate</button></div>
      {candidateRows.map((c,i)=><div className="candidate-admin-row" key={i}><label>Candidate name<input className="plain-input" value={c.name} onChange={e=>updateCandidate(i,"name",e.target.value)} placeholder="Full candidate name" required/></label><label>Party<select className="plain-input" value={c.party} onChange={e=>updateCandidate(i,"party",e.target.value)}>{partyDirectory.map(p=><option value={p.id} key={p.id}>{p.short} — {p.name}</option>)}</select></label><label>Verification source URL<input className="plain-input" type="url" value={c.source} onChange={e=>updateCandidate(i,"source",e.target.value)} placeholder="https://eci.gov.in/..." required/></label>{candidateRows.length>2&&<button type="button" className="icon-button danger-icon" onClick={()=>setCandidateRows(r=>r.filter((_,idx)=>idx!==i))}><Trash2 size={15}/></button>}</div>)}
      <p className="muted-small">Only add candidate names after checking the source for this exact election year and constituency. Source URLs are stored for reviewer verification; the app does not independently authenticate them.</p><button className="primary-button full-button" type="submit">Save election records <Plus size={16}/></button>
    </form></div></div>}
  </Layout>;
}
function Stat({icon:Icon,label,value,detail}){return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-card-icon"><Icon size={19}/></span></div><strong>{value}</strong><small>{detail}</small></div>;}