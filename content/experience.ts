export const experience = {
  role: "Product Developer (Internship)",
  org: "Across Medical",
  orgNote: "MedTech venture, King's College London",
  dates: "Jun 2026 to Sep 2026",
  stack: ["TypeScript", "Node.js", "React", "LangGraph", "LangChain", "PostgreSQL", "Azure"],
  intro:
    "Across Medical is a MedTech venture based at King's College London, building tools for families who move between health systems. I joined for the summer as a product developer and worked across design, backend and AI.",
  // TODO: edit freely. Anything below is from your resume, expanded in plain words.
  blocks: [
    {
      title: "The family dashboard",
      body: "I owned the Across family dashboard from scoping to release. I spoke with more than 20 users, turned their pain points into concrete UI and UX decisions, and shipped the result.",
    },
    {
      title: "From mock data to a live database",
      body: "The dashboard started on static mock data. I rebuilt the data layer on a live Azure PostgreSQL schema of 45+ tables, and wrote migration scripts that were safe to run on data that mattered.",
    },
    {
      title: "Nion, the multi-agent provider search",
      body: "Alongside the dashboard I built Nion, a multi-agent workflow that finds healthcare providers from one prompt. It reached 0.97 precision and 0.98 accuracy.",
    },
    {
      title: "How the team worked",
      body: "We worked in an Agile cycle. I led design discussions and code reviews, and handled testing and the production release.",
    },
  ],
  learned:
    "Real users change your assumptions fast, and migrations are where trust is won or lost. Both shaped how I think about evaluation: check against what actually happened, not against what you expected.", // TODO: rewrite in your own voice
};

export const education = {
  school: "LNM Institute of Information Technology, Jaipur",
  degree: "B.Tech, Computer Science and Engineering",
  years: "2023 to 2027",
  cgpa: "CGPA 7.35 / 10",
};

export const achievements = [
  { title: "1st Prize, TON Dev Experience Lab", detail: "TON Foundation and Telegram. Top 20 global developer, SDK and documentation audits. Dec 2025." },
  { title: "2nd Runner-Up, The Open Hack 2025", detail: "India Blockchain Week. Built Loyalty Layer, a full-stack TON Telegram Mini App." },
];
