export type Status = "ongoing" | "research";
export type Focus = "Healthcare" | "Agentic" | "Applied AI" | "Evaluation" | "Systems";

export type Project = {
  slug: string;
  title: string;
  status?: Status;
  featured?: boolean;
  tags: Focus[]; // focus areas, shown on cards
  outcome: string; // one line, shown on cards
  summary: string; // short paragraph, shown on detail page
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "clinotrust",
    title: "Clinotrust",
    status: "ongoing",
    featured: true,
    tags: ["Healthcare", "Agentic", "Evaluation"],
    outcome:
      "Checks every sentence of an AI-written clinical note against the original consultation, and shows the evidence.",
    summary:
      "AI scribes can write confident notes that contradict the visit. Clinotrust turns a transcript into a SOAP note, splits the note into atomic claims, and verifies each claim against the transcript with a verdict and a quoted line.",
    highlights: [
      "Pydantic-validated JSON with retry, plus a code check that every quoted line exists in the cited turns.",
      "Batching claims per transcript cut LLM cost about 6x.",
      "Evaluation set of 211 labeled claims, 25 omissions, 5 consultations.",
    ],
    stack: ["Python", "Pydantic", "LangGraph", "FastAPI", "Groq", "Qwen", "GPT-OSS", "PriMock57", "Pytest"],
    links: [
      { label: "Case study", href: "/work/clinotrust" },
      { label: "GitHub", href: "https://github.com/Heeral03/Clinotrust" },
    ],
  },
  {
    slug: "healrag",
    title: "HealRAG",
    tags: ["Healthcare", "Applied AI", "Evaluation"],
    outcome:
      "Corrective RAG for GDPR, EHDS and NHS rules. It refuses to answer when the evidence is weak.",
    summary:
      "An implementation and extension of the Corrective RAG paper for digital health regulation. A five stage pipeline with an evaluator gate, query expansion and a web fallback blocks unsupported answers.",
    highlights: [
      "Dense, BM25 and RRF retrieval with cross-encoder reranking.",
      "Semantic caching and model pre-loading cut latency 63%, to about 1.5 s. A context refiner cut prompt tokens 62%.",
      "DeepEval golden set: retriever 0.96 recall and 0.97 precision, generator about 0.90 faithfulness.",
      "Context relevancy raised from 0.29 to 0.92 (n=10).",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Qdrant", "BM25", "RRF", "Multilingual E5", "Cross-Encoder", "Groq", "DeepEval", "LangSmith"],
    links: [
      { label: "GitHub", href: "https://github.com/Heeral03/HealRAG" },
      { label: "Live demo", href: "https://healrag.onrender.com/" },
    ],
  },
  {
    slug: "barney",
    title: "Barney",
    tags: ["Agentic", "Applied AI", "Evaluation"],
    outcome:
      "A multi-agent shopping assistant that searches stores in parallel and recommends one pick, with reasons.",
    summary:
      "A LangGraph workflow that asks product-specific questions, searches stores in parallel and recommends one pick. Routing and ranking are rule-based, so the LLM only runs where it adds value.",
    highlights: [
      "Human-in-the-loop: the graph pauses on a real trade-off, the shopper chooses, and the run resumes, even after a restart.",
      "Junk filter on a labelled set: 10 of 10 bad listings dropped, 19 of 19 good ones kept.",
      "Eval gates exposed real defects and drove fixes: year parsing 93% to 100%, \"just show me\" handling 25% to 100%.",
      "205 offline tests.",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "PostgreSQL", "pgvector", "Pydantic", "Next.js", "Docker", "DeepEval"],
    links: [{ label: "GitHub", href: "https://github.com/Heeral03/Barney" }],
  },
  {
    slug: "slotguard",
    title: "SlotGuard",
    tags: ["Agentic", "Healthcare", "Systems"],
    outcome:
      "A booking engine that cannot double book under load, with a LangGraph agent that books clinic slots in plain language.",
    summary:
      "A high-concurrency seat and resource booking engine. Redis Lua scripts make holds atomic, and a PostgreSQL unique index is the backstop. Expired holds pass to the next person on the waitlist automatically, and clients get live updates over SSE.",
    highlights: [
      "50 simultaneous users racing for one seat: exactly 1 hold granted, 49 rejected with 409, 0% double booking.",
      "1,000 concurrent users: 825 req/s, 100% success, p95 latency 1.07 s.",
      "Idempotency keys for safe retries, a Redis token bucket rate limiter, and an optional virtual waiting room.",
      "LangGraph agent with tools to hold, confirm and waitlist slots, wired to the same atomic locks.",
    ],
    stack: ["Node.js", "Express", "LangGraph", "Redis", "Lua", "PostgreSQL", "BullMQ", "SSE", "JWT"],
    links: [{ label: "GitHub", href: "https://github.com/Heeral03/SlotGuard" }],
  },
  {
    slug: "stratumgrid",
    title: "StratumGrid",
    tags: ["Systems", "Agentic"],
    outcome:
      "A resource arbiter that locks warehouse regions as a tree, so a robot and a picker never claim the same space.",
    summary:
      "A backend that models a warehouse as a tree (facility, zone, aisle, rack, bin). A lock is granted only if no ancestor is locked and no descendant is occupied. Each node keeps a counter of locked descendants, so a check costs the height of the tree, not the number of nodes.",
    highlights: [
      "30 second leases with heartbeat renewal, so a crashed robot cannot block a region for good.",
      "Tested with real threads: 20 racing for one node gives exactly 1 winner, and 50 threads of lock and unlock cycles end with zero deadlocks.",
      "Lock upgrade merges child locks into one parent lock. Live events stream over WebSockets, and every change goes to an append-only audit ledger.",
    ],
    stack: ["Python", "FastAPI", "WebSockets", "Pydantic", "Pytest", "Threading"],
    links: [{ label: "GitHub", href: "https://github.com/Heeral03/StratumGrid" }],
  },
  {
    slug: "xai-guard",
    title: "XAI-Guard",
    tags: ["Applied AI", "Systems"],
    outcome: "Explainable cyberattack detection on the SWaT water treatment dataset. Team project.",
    summary:
      "An explainable detection framework for industrial infrastructure. Models flag the attack and SHAP and LIME say why.",
    highlights: [], // TODO: add 2 outcome bullets
    stack: ["XGBoost", "scikit-learn", "SHAP", "LIME", "SWaT"],
    links: [{ label: "GitHub", href: "https://github.com/Heeral03/XAIGuard" }],
  },
];

export const featured = projects.find((p) => p.featured)!;
export const others = projects.filter((p) => !p.featured);
