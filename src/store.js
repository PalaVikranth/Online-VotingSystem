import { initialElections } from "./data";

const ELECTIONS_KEY = "votewise_elections";
const VOTES_KEY = "votewise_votes";

export function getElections() {
  const saved = localStorage.getItem(ELECTIONS_KEY);
  if (!saved) {
    localStorage.setItem(ELECTIONS_KEY, JSON.stringify(initialElections));
    return initialElections;
  }
  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(ELECTIONS_KEY, JSON.stringify(initialElections));
    return initialElections;
  }
}

export function saveElections(elections) {
  localStorage.setItem(ELECTIONS_KEY, JSON.stringify(elections));
}

export function getVotes() {
  return JSON.parse(localStorage.getItem(VOTES_KEY) || "[]");
}

export function castVote(userId, electionId, candidateId) {
  const votes = getVotes();
  if (votes.some((vote) => vote.userId === userId && vote.electionId === electionId)) {
    return { ok: false, message: "You have already voted in this election." };
  }
  const election = getElections().find((item) => item.id === electionId);
  if (!election || election.status !== "active") {
    return { ok: false, message: "This election is not currently open." };
  }
  if (!election.candidates.some((candidate) => candidate.id === candidateId)) {
    return { ok: false, message: "Please select a valid candidate." };
  }
  votes.push({ id: `vote-${Date.now()}`, userId, electionId, candidateId, createdAt: new Date().toISOString() });
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  return { ok: true };
}

export function hasVoted(userId, electionId) {
  return getVotes().some((vote) => vote.userId === userId && vote.electionId === electionId);
}

export function getElectionResults(election) {
  const votes = getVotes().filter((vote) => vote.electionId === election.id);
  return election.candidates.map((candidate) => ({
    ...candidate,
    votes: votes.filter((vote) => vote.candidateId === candidate.id).length
  })).sort((a, b) => b.votes - a.votes);
}