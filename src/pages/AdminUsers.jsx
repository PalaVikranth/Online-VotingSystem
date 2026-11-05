import { useState } from "react";
import { Users, Mail, ShieldCheck } from "lucide-react";
import Layout from "../components/Layout";
import { getCurrentUser, getUsers } from "../auth";

export default function AdminUsers() {
  const user = getCurrentUser();
  const users = getUsers().filter(item => item.role === "user");
  return <Layout user={user}><div className="page-heading"><div><span className="eyebrow">ADMINISTRATION</span><h1>Registered voters</h1><p>View the user accounts registered in this browser demo.</p></div><div className="result-total"><Users size={18}/><strong>{users.length}</strong><span>voters</span></div></div><div className="management-list">{users.map(person => <div className="management-row" key={person.id}><div className="avatar large-avatar">{person.name.charAt(0).toUpperCase()}</div><div className="management-info"><strong>{person.name}</strong><span><Mail size={14}/> {person.email}</span></div><span className="status-pill status-active"><i/>Registered</span></div>)}{!users.length && <div className="empty-state">No voters have registered yet.</div>}</div><p className="results-note"><ShieldCheck size={15}/> This list only includes accounts saved in this browser's Local Storage.</p></Layout>;
}