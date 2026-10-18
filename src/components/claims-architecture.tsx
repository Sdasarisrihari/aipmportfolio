import { ArrowDown, ShieldCheck } from "lucide-react";

const paths = [
  { name: "extractClaim", service: "Google Gemini API", steps: ["Actual claim document text", "Gemini structured JSON", "Schema validation", "Verbatim evidence verification", "Review flags"] },
  { name: "askPolicy", service: "Google Gemini API", steps: ["Policy chunking + section references", "BM25 lexical retrieval", "Gemini response", "Verified citations or insufficient evidence", "Escalation to human review"] },
  { name: "lookupVin", service: "NHTSA vPIC API", steps: ["VIN input validation", "NHTSA decoding", "Partial-decode warnings", "Check-digit and error handling", "Vehicle details or explicit error"] },
];

export function ClaimsArchitecture() {
  return <figure aria-label="AI Claims Copilot architecture: browser UI, three server-function paths, and external services" className="space-y-4">
    <div className="border-y border-border bg-card p-5 text-center">
      <p className="eyebrow">Browser UI</p><h3 className="mt-2 text-3xl text-foreground">React 19 / TanStack Start</h3>
      <p className="mt-3 text-sm text-foreground">Intake · Extraction · Policy Assistant · Review Queue · VIN Lookup</p>
      <p className="mt-2 text-xs">Session-only claim text, policies, extraction results, review items, notes, and decisions. Reset on refresh.</p>
    </div>
    <div className="flex items-center justify-center gap-3 text-sm text-accent"><ArrowDown aria-hidden="true" /><span>Same-origin server functions · API key stays server-side</span></div>
    <div className="grid gap-4 lg:grid-cols-3">
      {paths.map((path) => <div key={path.name} className="min-w-0 border border-border p-4">
        <p className="font-mono text-sm text-accent">{path.name}</p>
        <ol className="mt-4 space-y-3">{path.steps.map((step, i) => <li key={step} className="flex gap-2 text-sm"><span className="font-mono text-accent">{i + 1}.</span><span>{step}</span></li>)}</ol>
        <div className="mt-5 border-t border-border pt-4"><ArrowDown className="mb-2 text-accent" size={16} aria-hidden="true" /><p className="eyebrow">Server-to-server service</p><p className="mt-1 text-sm font-medium text-foreground">{path.service}</p></div>
      </div>)}
    </div>
    <figcaption className="flex items-start gap-3 border-l-2 border-accent py-2 pl-4 text-sm"><ShieldCheck size={20} className="shrink-0 text-accent" aria-hidden="true" /><span>Server-side key isolation · Fail-closed errors · Evidence grounding · Human review. Documented architecture; no OCR or vector search.</span></figcaption>
  </figure>;
}