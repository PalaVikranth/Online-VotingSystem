# JanVote — Indian Election Simulation

Professional saffron, white, green and navy Indian-election-inspired academic demo built with React + Vite.

## Run
```bash
npm install
npm run dev
```

## Demo admin
- Email: `admin@voting.com`
- Password: `admin123`

## Included
- India-themed landing page
- Lok Sabha / State Assembly selector
- State and Union Territory directory starter
- Political party reference directory
- Admin election setup with candidate source URL fields
- User registration/login, constituency election demo voting, results
- Local Storage persistence and Vercel SPA rewrite

## Data integrity note
Party names are real-world reference labels; symbol labels and recognition classifications must be checked against the Election Commission of India list for the relevant date/election. A historical Araku (Andhra Pradesh) Lok Sabha 2024 candidate-roster example is seeded from the ECI's constituency-wise detailed results PDF. It is clearly labelled as a historical roster; the active state only enables a classroom voting simulation and is not an official/current ballot. The constituency directory is a starter UI, not an exhaustive official delimitation list. For other constituencies and Assembly elections, an administrator must enter candidates only after verifying each person against official ECI nomination/affidavit/results records for the exact constituency and election year, and add the source URL. Candidate records entered by an admin are not independently verified by this client-side app.

This is an educational simulation, not an official ECI product and not suitable for real voting. Local Storage can be edited, data is browser-local, and there is no secure identity verification, server-side vote custody, audit trail, or tamper resistance.
