import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Info } from "lucide-react";
import { states } from "../data";

export default function Constituencies() {
  const [params] = useSearchParams();
  const state = params.get("state") || "All India";
  const level = params.get("level") || "Both";
  const year = params.get("year") || "2024";
  return <div className="catalogue-page"><header className="catalogue-header"><Link to="/" className="india-brand"><span className="chakra-mark">✺</span><span>JanVote<small>INDIA ELECTION SIMULATOR</small></span></Link><Link to="/" className="back-link"><ArrowLeft size={16}/> Home</Link></header><main className="catalogue-main"><span className="india-kicker">CONSTITUENCY DIRECTORY</span><h1>{state === "All India" ? "Explore constituencies across India" : `${state} constituencies`}</h1><p className="catalogue-lead">{level} · Reference year {year}</p><div className="notice-box"><Info size={18}/><div><strong>About this directory</strong><p>This starter version lists states and Union Territories, but does not claim to contain the complete official constituency roll. Constituency boundaries and names must be sourced from the Election Commission / Delimitation records for the selected election. No current candidate nominations are assumed.</p></div></div><div className="state-directory">{(state === "All India" ? states : [state]).map((name,i)=><div className="state-row" key={name}><div className="state-pin"><MapPin size={17}/></div><div><strong>{name}</strong><span>{name === "All India" ? "Browse by state or Union Territory" : "Constituency data awaiting official import"}</span></div><span className="data-pending">Catalogue setup</span></div>)}</div><Link className="india-primary" to="/signup">Create account to try the demo <ArrowLeft size={16}/></Link></main></div>;
}