export type Verdict = "supported" | "contradicted" | "unsupported" | "uncertain";

export const clinotrust = {
  title: "Clinotrust",
  tagline: "An AI scribe that shows its evidence.",
  github: "https://github.com/Heeral03/Clinotrust",

  problem: {
    heading: "AI scribes write confident notes that can contradict the visit.",
    body: [
      "A scribe listens to a consultation and writes the clinical note. The note reads well, so the clinician trusts it. But a fluent sentence is not a true sentence. A dropped \"no\" or an invented number can sit unnoticed in a note that looks perfect.",
      "Clinotrust does not try to write a better note. It checks the note that was written, one claim at a time, against the original transcript.",
    ],
  },

  pipeline: [
    { step: "Transcript", detail: "Doctor and patient turns, as spoken." },
    { step: "SOAP note", detail: "An LLM drafts a structured clinical note." },
    { step: "Atomic claims", detail: "The note is split into one-fact claims." },
    { step: "Verification", detail: "Each claim gets a verdict and a quoted line." },
    { step: "Human review", detail: "Anything not supported goes to the clinician." },
  ],
  rule: "Anything not discussed is \"not documented\", never assumed absent.",

  demo: {
    label: "Synthetic example. Not from a real consultation.",
    transcript: [
      { id: "T1", who: "Doctor", text: "What brings you in today?" },
      { id: "T2", who: "Patient", text: "A sore throat for three days. No chest pain, no cough, but I have had a fever." },
      { id: "T3", who: "Doctor", text: "How high was the fever?" },
      { id: "T4", who: "Patient", text: "I did not measure it. I just felt hot at night." },
      { id: "T5", who: "Doctor", text: "Any allergies to medication?" },
      { id: "T6", who: "Patient", text: "Penicillin gives me a rash." },
      { id: "T7", who: "Doctor", text: "Okay. Let's do a throat swab, and I will prescribe paracetamol for the fever." },
      { id: "T8", who: "Doctor", text: "Come back in a week if it has not improved." },
    ],
    claims: [
      { id: "C1", text: "Sore throat for 3 days.", verdict: "supported" as Verdict, turns: ["T2"], why: "The patient says three days." },
      { id: "C2", text: "Denies chest pain and cough.", verdict: "supported" as Verdict, turns: ["T2"], why: "Both negations are in the same turn." },
      { id: "C3", text: "Fever up to 39 C.", verdict: "unsupported" as Verdict, turns: ["T4"], why: "The patient never measured it. The number is invented." },
      { id: "C4", text: "Allergic to penicillin (rash).", verdict: "supported" as Verdict, turns: ["T6"], why: "Stated directly." },
      { id: "C5", text: "No known drug allergies.", verdict: "contradicted" as Verdict, turns: ["T6"], why: "The patient reports a penicillin rash." },
      { id: "C6", text: "Likely streptococcal pharyngitis.", verdict: "uncertain" as Verdict, turns: ["T7"], why: "A swab is planned. No diagnosis was stated." },
      { id: "C7", text: "Follow up in one week if no improvement.", verdict: "supported" as Verdict, turns: ["T8"], why: "Stated directly." },
    ],
  },

  evaluation: {
    heading: "How I know whether it works",
    setup:
      "I built a labeled set from PriMock57 consultations: 211 claims, 25 omissions, 5 consultations. Labels were drafted with an LLM and reviewed by hand, one claim at a time.",
    // Real numbers from eval/score.py on verifier v0, 210 scored claims (score_v0_relabeled.txt)
    baseline: {
      name: "Verifier v0",
      rows: [
        { label: "4-class accuracy", value: "88.6%" },
        { label: "Not-supported claims caught (recall)", value: "9 of 28 (32%)" },
        { label: "Flags that were right (precision)", value: "9 of 12 (75%)" },
        { label: "Quotes not found in the cited turns", value: "8 of 206" },
      ],
    },
    // TODO: run the full labeled set on the improved verifier and fill this in.
    // A partial run exists (44 of 210 claims) but is not comparable, so it is not shown.
    improved: {
      name: "Verifier v1 (batched, quote-checked)",
      rows: [
        { label: "4-class accuracy", value: "TODO" },
        { label: "Not-supported claims caught (recall)", value: "TODO" },
        { label: "Flags that were right (precision)", value: "TODO" },
        { label: "Quotes not found in the cited turns", value: "TODO" },
      ],
    },
    honest:
      "88.6% sounds fine. It is not. Most claims in a note are correct, so a verifier that says \"supported\" almost every time scores high and misses most of the errors. The number that matters is how many wrong claims it catches: 9 of 28.",
  },

  lessons: {
    heading: "What broke, and what I learned",
    items: [
      {
        title: "The splitter dropped negations in lists",
        body: "A list like \"no chest pain, no cough, no fever\" could lose its \"no\" on the way to becoming separate claims. Nothing crashed. The verifier was then checking a claim the patient never made.",
        fix: "A guard that keeps a negation attached to every item it covers, plus tests for lists.",
      },
      {
        title: "\"Only\" was copied across list items",
        body: "When a sentence said \"only\" before a list, the splitter copied \"only\" onto every item. Each claim then said something stronger than the patient did.",
        fix: "A guard for scope words, with a regression test per case.",
      },
    ],
    takeaway:
      "Both bugs were in the step before verification. A verifier can only be as honest as the claims it is handed.",
  },

  limitations: [
    "Five consultations is a small set. Numbers will move with more data.",
    "Labels were drafted by an LLM and reviewed by me alone. There is no second annotator yet.",
    "Transcripts are from a primary care dataset, in English. Other specialties and languages are untested.",
    "The verifier can still be wrong. Clinotrust is a review aid, not a replacement for the clinician.",
  ],

  next: [
    "Run the improved verifier on the full labeled set and report it next to v0.",
    "Add a second annotator and report agreement.",
    "Test on ACI-Bench.",
    "A review screen where a clinician can accept or reject each claim.",
  ],
};
