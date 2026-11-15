export type Note = {
  slug: string;
  title: string;
  date: string; // ISO date, TODO: set when you publish
  summary: string;
  draft: boolean;
};

// Each post body lives in app/notes/<slug>/page.mdx
export const notes: Note[] = [
  {
    slug: "claim-splitter-dropped-no",
    title: "How my claim splitter silently dropped \"no\"",
    date: "2026-01-01", // TODO
    summary: "A list of negations went in. A list of positive claims came out. Nothing crashed.",
    draft: true,
  },
  {
    slug: "first-90-percent-verifier",
    title: "Why I didn't trust my verifier's first 90% accuracy",
    date: "2026-01-01", // TODO
    summary: "88.6% accuracy sounds good until you look at what it missed.",
    draft: true,
  },
];
