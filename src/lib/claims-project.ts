import qaReport from "@/assets/QA_REPORT.pdf.asset.json";
import demoScript from "@/assets/DEMO_SCRIPT.pdf.asset.json";
import architecture from "@/assets/ARCHITECTURE.pdf.asset.json";
import architectureDiagram from "@/assets/ARCHITECTURE_DIAGRAM.pdf.asset.json";
import businessValue from "@/assets/BUSINESS_VALUE_PLAN.pdf.asset.json";

export const claimsProject = {
  name: "AI Claims Copilot",
  subtitle: "Synthetic P&C Insurance Claims Decision-Support Prototype",
  demoUrl: "https://aiclaimscopilot.vercel.app/",
  status: "Local preview tested; published deployment verification pending",
  description: "An AI-assisted claims decision-support prototype that extracts structured information from synthetic claim documents, verifies extracted values against source evidence, answers policy questions with passage-level citations, flags uncertain items for human review, and supports VIN lookup through the public NHTSA API.",
};

// Reported results, not tests executed against this portfolio or the deployed demo.
export const reportedQA = {
  date: "18 October 2026",
  environment: "local preview",
  automated: { passed: 52, failed: 0, files: 7, command: "bunx vitest run", build: "clean" },
  live: { passed: 9, failed: 0, blocked: 2, blocker: "Gemini free-tier HTTP 503 outage" },
  manual: { passed: 1, failed: 0, blocked: 0 },
};

export const evaluationPlan = {
  status: "planned",
  targets: { evidenceValidity: 100, citationValidity: 100, hallucinationRate: 0, unsafeResolutionRate: 0, failureTransparency: 100 },
  minimumClaims: 30,
  minimumQuestions: 20,
  participants: { min: 3, max: 5 },
};

export const projectDocuments = [
  { id: "qa", title: "QA Report", description: "Test coverage, results, blockers, and known limitations.", asset: qaReport },
  { id: "demo", title: "Demonstration Script", description: "A five-minute walkthrough of extraction, evidence, policy Q&A, review, and VIN lookup.", asset: demoScript },
  { id: "architecture", title: "Architecture", description: "System components, data flow, external APIs, and safety rules.", asset: architecture },
  { id: "architecture-diagram", title: "Architecture Diagram", description: "One-page visual of the browser UI, three server-function paths, external APIs, safety controls, and the human review flow.", asset: architectureDiagram },
  { id: "evaluation", title: "Business Value Evaluation Plan", description: "Hypotheses, metrics, methods, and decision criteria; no measured business results.", asset: businessValue },
];