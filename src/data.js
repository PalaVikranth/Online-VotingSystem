// Party names are real. Symbols are text labels for the academic demo;
// verify official reserved/free symbols and candidate lists for the selected election year.
export const partyDirectory = [
  { id: "bjp", name: "Bharatiya Janata Party", short: "BJP", symbol: "Lotus", category: "National party", color: "saffron" },
  { id: "inc", name: "Indian National Congress", short: "INC", symbol: "Hand", category: "National party", color: "blue" },
  { id: "aap", name: "Aam Aadmi Party", short: "AAP", symbol: "Broom", category: "National party", color: "blue" },
  { id: "bsp", name: "Bahujan Samaj Party", short: "BSP", symbol: "Elephant", category: "National party", color: "blue" },
  { id: "cpi-m", name: "Communist Party of India (Marxist)", short: "CPI(M)", symbol: "Hammer, Sickle and Star", category: "National party", color: "red" },
  { id: "npp", name: "National People's Party", short: "NPP", symbol: "Book", category: "National party", color: "green" },
  { id: "dmdk", name: "Desiya Murpokku Dravida Kazhagam", short: "DMDK", symbol: "Nagara", category: "Party reference", color: "blue" },
  { id: "dmk", name: "Dravida Munnetra Kazhagam", short: "DMK", symbol: "Rising Sun", category: "Party reference", color: "red" },
  { id: "aiadmk", name: "All India Anna Dravida Munnetra Kazhagam", short: "AIADMK", symbol: "Two Leaves", category: "Party reference", color: "green" },
  { id: "tdp", name: "Telugu Desam Party", short: "TDP", symbol: "Bicycle", category: "Party reference", color: "yellow" },
  { id: "ysrcp", name: "Yuvajana Sramika Rythu Congress Party", short: "YSRCP", symbol: "Ceiling Fan", category: "Party reference", color: "blue" },
  { id: "janasena", name: "Jana Sena Party", short: "JSP", symbol: "Glass Tumbler", category: "Party reference", color: "red" },
  { id: "shs", name: "Shiv Sena", short: "SHS", symbol: "Bow and Arrow", category: "Party reference", color: "saffron" },
  { id: "ss-ubt", name: "Shiv Sena (Uddhav Balasaheb Thackeray)", short: "SHS (UBT)", symbol: "Flaming Torch", category: "Party reference", color: "orange" },
  { id: "ncp", name: "Nationalist Congress Party", short: "NCP", symbol: "Clock", category: "Party reference", color: "blue" },
  { id: "ncp-sp", name: "Nationalist Congress Party – Sharadchandra Pawar", short: "NCP (SP)", symbol: "Man Blowing Turha", category: "Party reference", color: "blue" },
  { id: "sp", name: "Samajwadi Party", short: "SP", symbol: "Bicycle", category: "Party reference", color: "red" },
  { id: "jd-u", name: "Janata Dal (United)", short: "JD(U)", symbol: "Arrow", category: "Party reference", color: "green" },
  { id: "rjd", name: "Rashtriya Janata Dal", short: "RJD", symbol: "Hurricane Lamp", category: "Party reference", color: "green" },
  { id: "aitc", name: "All India Trinamool Congress", short: "AITC", symbol: "Flowers and Grass", category: "Party reference", color: "green" },
  { id: "bjd", name: "Biju Janata Dal", short: "BJD", symbol: "Conch", category: "Party reference", color: "green" },
  { id: "jmm", name: "Jharkhand Mukti Morcha", short: "JMM", symbol: "Bow and Arrow", category: "Party reference", color: "green" },
  { id: "akali", name: "Shiromani Akali Dal", short: "SAD", symbol: "Scales", category: "Party reference", color: "blue" },
  { id: "agp", name: "Asom Gana Parishad", short: "AGP", symbol: "Elephant", category: "Party reference", color: "green" },
  { id: "others", name: "Independent / Other", short: "IND", symbol: "Various", category: "Independent", color: "gray" }
];

export const states = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];

// Sample constituency catalogue is intentionally a starter list, not an exhaustive official roll.
export const constituencies = [
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Amalapuram" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Anakapalli" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Anantapur" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Araku" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Bapatla" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Chittoor" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Eluru" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Guntur" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Hindupur" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Kadapa" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Kakinada" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Kurnool" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Machilipatnam" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Nandyal" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Narasaraopet" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Narsapuram" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Ongole" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Rajampet" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Rajahmundry" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Srikakulam" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Tirupati" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Vijayawada" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Visakhapatnam" },
  { state: "Andhra Pradesh", type: "Lok Sabha", name: "Vizianagaram" },
  { state: "Telangana", type: "Lok Sabha", name: "Adilabad" },
  { state: "Telangana", type: "Lok Sabha", name: "Bhongir" },
  { state: "Telangana", type: "Lok Sabha", name: "Chevella" },
  { state: "Telangana", type: "Lok Sabha", name: "Hyderabad" },
  { state: "Telangana", type: "Lok Sabha", name: "Karimnagar" },
  { state: "Telangana", type: "Lok Sabha", name: "Khammam" },
  { state: "Telangana", type: "Lok Sabha", name: "Mahabubabad" },
  { state: "Telangana", type: "Lok Sabha", name: "Mahbubnagar" },
  { state: "Telangana", type: "Lok Sabha", name: "Malkajgiri" },
  { state: "Telangana", type: "Lok Sabha", name: "Medak" },
  { state: "Telangana", type: "Lok Sabha", name: "Nagarkurnool" },
  { state: "Telangana", type: "Lok Sabha", name: "Nalgonda" },
  { state: "Telangana", type: "Lok Sabha", name: "Nizamabad" },
  { state: "Telangana", type: "Lok Sabha", name: "Peddapalle" },
  { state: "Telangana", type: "Lok Sabha", name: "Secunderabad" },
  { state: "Telangana", type: "Lok Sabha", name: "Warangal" },
  { state: "All India", type: "Lok Sabha", name: "Browse other constituencies by state" }
];

// Historical sample roster transcribed from ECI's 2024 Lok Sabha constituency-wise
// detailed results for Araku (Andhra Pradesh). These are 2024 candidates, not current
// nominees. Active status is only to let students test the classroom voting workflow.
const eci2024Source = "https://www.eci.gov.in/eci-backend/public/all_files/GE-2024-statistical-report/33-Constituency-Wise-Detailed-Result.pdf";
export const initialElections = [
  {
    id: "eci-2024-araku-demo",
    title: "Araku Lok Sabha — 2024 historical candidate simulation",
    description: "Historical candidate roster from the Election Commission of India's 2024 constituency-wise detailed results. Voting here is a classroom simulation only.",
    state: "Andhra Pradesh",
    constituency: "Araku",
    type: "Lok Sabha",
    year: "2024",
    category: "Lok Sabha · Historical roster",
    status: "active",
    endDate: "2026-12-31",
    candidates: [
      { id: "araku-ysrcp-gumma", name: "Gumma Thanuja Rani", party: "Yuvajana Sramika Rythu Congress Party", partyShort: "YSRCP", symbol: "Ceiling fan", bio: "Candidate in the 2024 Araku Lok Sabha election.", source: eci2024Source },
      { id: "araku-bjp-geetha", name: "Kothapalli Geetha", party: "Bharatiya Janata Party", partyShort: "BJP", symbol: "Lotus", bio: "Candidate in the 2024 Araku Lok Sabha election.", source: eci2024Source },
      { id: "araku-cpim-pachipenta", name: "Appalanarasa Pachipenta", party: "Communist Party of India (Marxist)", partyShort: "CPI(M)", symbol: "Hammer, Sickle and Star", bio: "Candidate in the 2024 Araku Lok Sabha election.", source: eci2024Source },
      { id: "araku-bsp-lahari", name: "Avashya Lahari Varam", party: "Bahujan Samaj Party", partyShort: "BSP", symbol: "Elephant", bio: "Candidate in the 2024 Araku Lok Sabha election.", source: eci2024Source }
    ]
  }
];
