import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ArrowRight, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ProjectDocuments } from "@/components/project-documents";
import { ClaimsArchitecture } from "@/components/claims-architecture";
import { claimsProject, reportedQA, evaluationPlan } from "@/lib/claims-project";

export const Route = createFileRoute("/case-study")({
  head: () => ({ meta: [
    { title: "AI Claims Copilot — Evidence-Grounded Case Study · Srihari Dasari" },
    { name: "description", content: "Synthetic P&C claims decision-support prototype: Gemini extraction, BM25 policy citations, human review, VIN integration, documented QA, limitations, and planned evaluation." },
    { property: "og:title", content: "AI Claims Copilot — Synthetic P&C Claims Case Study" },
    { property: "og:description", content: "Implemented workflows, documented test results, architecture, and an honest business-value evaluation plan by Srihari Dasari." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CaseStudy,
});

const sections: [string, string][] = [
  ["a", "Problem & objective"], ["b", "Users & scope"], ["c", "Implemented capabilities"],
  ["d", "User workflow"], ["e", "Product decisions"], ["f", "Architecture"],
  ["g", "QA & test results"], ["h", "Limitations & security"], ["i", "Evaluation plan"],
  ["j", "Demo & documents"], ["k", "Roadmap"],
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="grid min-w-0 gap-7 border-t border-border py-14 md:grid-cols-[180px_minmax(0,1fr)]">
    <div><p className="eyebrow text-accent">{id.toUpperCase()} / Case study</p><h2 className="mt-3 text-3xl">{title}</h2></div>
    <div className="min-w-0 space-y-5 leading-relaxed text-muted-foreground">{children}</div>
  </section>;
}

function Callout({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-accent py-2 pl-4 text-sm text-foreground">{children}</p>;
}

const capabilities = [
  ["Intake", "Load synthetic claim samples and sample policies, upload text-based PDFs, TXT or MD files, or paste claim text. OCR is not implemented."],
  ["Claim extraction", "Gemini extracts structured fields from the actual claim text. Schema validation and verbatim checks verify the source quote and that each nonempty extracted value appears in supporting evidence. Missing, ambiguous, or unsupported fields are flagged."],
  ["Policy assistant", "Policy text is chunked with document and section references. BM25 lexical retrieval selects passages; Gemini answers from those passages. Citations must match retrieved text, otherwise the answer is invalidated and insufficient evidence is reported."],
  ["Review queue", "Missing or ambiguous fields, unsupported policy questions, and processing failures are routed for human review. A note alone cannot resolve missing information: an explicit verified correction is required. New extraction results invalidate prior field decisions."],
  ["VIN lookup", "Validate VIN format before requesting the public NHTSA vPIC API. Show decoded details or clear errors, with warnings for partial decodes and check-digit mismatches. Failed lookups do not invent vehicle details."],
];
const decisions = [
  { title: "Source evidence must support extracted values", rationale: "A handler needs traceable document-backed information, not plausible model output.", tradeoff: "Verbatim checks can reject useful normalizations or paraphrases.", safety: "Unsupported values are flagged rather than silently accepted." },
  { title: "Unverifiable citations invalidate the whole answer", rationale: "A citation must refer to a real retrieved passage that the handler can inspect.", tradeoff: "Otherwise useful answers may be rejected when citation matching fails.", safety: "Fabricated or unverifiable citations fail closed and prompt review." },
  { title: "Escalate missing or ambiguous information", rationale: "Uncertainty is a business exception, not an invitation to guess.", tradeoff: "More queue items increase reviewer effort.", safety: "Missing facts remain visible and are kept out of downstream decisions." },
  { title: "Provider failures return clear errors", rationale: "Outages, malformed responses, credentials, and quotas must be distinguishable from successful work.", tradeoff: "The workflow may pause rather than providing a fallback answer.", safety: "Errors and review items replace fabricated results." },
  { title: "Notes are not verified corrections", rationale: "Commentary does not supply missing underlying evidence.", tradeoff: "Resolution requires an explicit verified correction, not just a saved note.", safety: "A missing field cannot be resolved by commentary alone; new extraction invalidates stale decisions." },
  { title: "Citation matching does not prove entailment", rationale: "BM25 is lexical and an exact quote does not guarantee the answer's interpretation is supported.", tradeoff: "Human semantic review is still necessary, even with valid citations.", safety: "Handlers inspect the passage and verify the answer before relying on it." },
  { title: "Session-only storage is an MVP trade-off", rationale: "Keep the synthetic prototype focused on extraction, grounding, and review workflows.", tradeoff: "Refresh clears claims, results, notes, and decisions; there is no durable or multi-user review.", safety: "This is disclosed prominently and must be addressed before a broader pilot." },
];
const testSuites = [
  ["Grounding", "9", "Verbatim evidence matching, whitespace tolerance, fabricated-quote rejection."],
  ["Claims validation", "18", "Schema, missing vs undeterminable fields, non-atomic values in evidence, stale-decision invalidation."],
  ["Store", "2", "Provider/consumer identity and the useStore-outside-provider regression across hot reloads."],
  ["Provider", "10", "Pinned model, override rejection, missing credentials, rate-limit error messages."],
  ["Application routing", "1", "All five application routes render."],
  ["VIN service", "5", "Invalid-input short-circuit, NHTSA outage, no fabricated details, error-row rejection."],
  ["VIN server function", "7", "Actual handler: empty/error rows, NHTSA error code 7, invalid VIN rejected before API call."],
];
const metrics = [
  ["Extraction quality", ["Field-level exact-match rate", "Evidence validity rate", "Missing-field recall", "Hallucination rate"]],
  ["Policy-answer quality", ["Citation validity rate", "Human-scored answer entailment", "Correct abstention on unanswerable questions"]],
  ["Safe escalation", ["Escalation precision and recall", "Unsafe-resolution rate"]],
  ["Usability and efficiency", ["Median claim-review time vs a manual baseline", "Reviewer time per queue item", "Percentage of extracted fields accepted without correction"]],
  ["Reliability and cost", ["Failure transparency rate", "API failure handling", "Estimated API cost per processed claim"]],
] as const;
const roadmap = [
  ["Pending", "Reverify live policy citation behavior after provider availability recovers."],
  ["Pending", "Publish or update the deployment and run deployed QA."],
  ["Proposed", "Build a repeatable labeled synthetic evaluation dataset."],
  ["Proposed", "Measure extraction accuracy, citation validity, abstention, and escalation quality."],
  ["Proposed", "Improve document support and retrieval evaluation."],
  ["Proposed", "Consider persistent storage, per-user rate limits, access controls, and audit logging before any broader pilot."],
];

function Workflow({ steps }: { steps: string[] }) {
  return <ol className="grid gap-3 sm:grid-cols-2">{steps.map((step, i) => <li key={step} className="flex min-w-0 items-center gap-3 border-b border-border py-3 text-sm text-foreground"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><span className="flex-1">{step}</span>{i < steps.length - 1 && <ArrowRight size={16} className="shrink-0 text-accent" aria-hidden="true" />}</li>)}</ol>;
}

function CaseStudy() {
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4">
        <Button asChild variant="link" className="h-auto p-0"><Link to="/"><ArrowLeft />Back to portfolio</Link></Button>
        <Link to="/" aria-label="Srihari Dasari portfolio" className="font-display text-2xl">SD<span className="text-accent">•</span></Link>
      </div>
    </header>
    <main className="mx-auto max-w-[1200px] px-6">
      <div className="pb-12 pt-16 md:pt-20">
        <p className="eyebrow">AI Product Development | P&C Insurance | 2026</p>
        <h1 className="mt-6 text-5xl leading-none sm:text-6xl md:text-8xl">AI Claims Copilot</h1>
        <p className="mt-5 font-display text-2xl md:text-3xl">{claimsProject.subtitle}</p>
        <p className="mt-6 max-w-3xl text-muted-foreground leading-relaxed">{claimsProject.description}</p>
        <p className="mt-6 flex items-start gap-3 text-sm text-accent"><ShieldCheck className="shrink-0" size={20} aria-hidden="true" /><span>Prototype · {claimsProject.status}.</span></p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild className="rounded-none"><a href={claimsProject.demoUrl} target="_blank" rel="noopener noreferrer">View Live Demo <ArrowUpRight /></a></Button>
          <Button asChild variant="outline" className="rounded-none"><a href="#j">Supporting PDFs <ArrowRight /></a></Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Demo landing page checked on 18 October 2026. Availability is not deployed QA; live policy Q&A depends on provider availability.</p>
        <nav aria-label="Case study sections" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-xs">{sections.map(([id, title]) => <a key={id} href={`#${id}`} className="hover:text-accent"><span className="mr-2 font-mono text-accent">{id.toUpperCase()}</span>{title}</a>)}</nav>
      </div>
      <Section id="a" title="Problem & objective">
        <p>Claim-document intake requires handlers to locate relevant fields, transcribe information, search policy wording, and resolve missing or ambiguous details. Reliable assistance needs traceable evidence and clear exceptions—not just a fluent answer.</p>
        <p>The objective is to test an evidence-grounded workflow: extract structured information, retrieve policy passages, make uncertainty visible, and keep the handler responsible for verification.</p>
        <Callout>Independent portfolio prototype using synthetic claims and sample policies. It is not deployed for an insurer and is not used by real policyholders. No measured operational savings are claimed.</Callout>
      </Section>
      <Section id="b" title="Users & scope">
        <p><b className="text-foreground">Primary user:</b> a claims handler or adjuster reviewing a synthetic P&C claim.</p>
        <p>The MVP supports intake, extraction, evidence inspection, policy-document lookup, review exceptions, and VIN lookup. Requirements prioritize traceability, validation, explicit errors, and human review.</p>
        <Callout>Decision support only. No coverage decisions, claim approvals, settlement calculations, fraud scoring, or customer communications.</Callout>
      </Section>
      <Section id="c" title="Implemented capabilities">
        {capabilities.map(([title, text], i) => <div key={title} className="border-b border-border pb-5"><p className="eyebrow">0{i + 1} / Implemented · documented</p><h3 className="mt-2 text-2xl text-foreground">{title}</h3><p className="mt-2 text-sm">{text}</p></div>)}
        <Callout>The policy-answer path is documented as implemented, but two live re-verification checks were blocked by the reported provider outage. Future enhancements are listed separately in the roadmap.</Callout>
      </Section>
      <Section id="d" title="User workflow">
        <Workflow steps={["Load Synthetic Claim", "Extract Structured Fields", "Verify Source Evidence", "Flag Missing or Ambiguous Data", "Ask Policy Questions", "Inspect Citations", "Review Exceptions", "Handler Verifies"]} />
        <h3 className="pt-4 text-2xl text-foreground">Supporting workflow / VIN lookup</h3>
        <Workflow steps={["Enter VIN", "Validate Format", "Query NHTSA vPIC", "Inspect Details, Warnings, or Error"]} />
      </Section>
      <Section id="e" title="Product decisions & trade-offs">
        {decisions.map((d, i) => <details key={d.title} className="group border-b border-border pb-4" open={i === 0}><summary className="flex cursor-pointer items-start justify-between gap-4 text-foreground"><span>{d.title}</span><span aria-hidden="true" className="text-accent group-open:rotate-45">+</span></summary><dl className="mt-4 space-y-3 text-sm">{[["Rationale", d.rationale], ["Trade-off", d.tradeoff], ["Safety implication", d.safety]].map(([label, text]) => <div key={label}><dt className="font-medium text-foreground">{label}</dt><dd>{text}</dd></div>)}</dl></details>)}
      </Section>
      <Section id="f" title="Architecture">
        <p className="text-sm">Based on ARCHITECTURE.pdf. These are the documented implementation paths, not a proposed replacement architecture.</p>
        <ClaimsArchitecture />
        <details className="border-b border-border pb-4"><summary className="cursor-pointer text-foreground">Provider configuration & input boundaries</summary><ul className="mt-4 space-y-2 text-sm"><li>Gemini is the sole LlmProvider; documented model: gemini-3.8-flash, with a 120-second timeout and bounded retries.</li><li>NHTSA is public and needs no key; 10-second timeout and one retry.</li><li>Limits: 60,000-character claims; 20 policies × 200,000 characters; 10 MB files; 1,000-character questions.</li><li>GEMINI_API_KEY is read inside server-function handlers. Missing credentials, malformed output, provider outages, and rate limits produce errors and review items.</li></ul></details>
        <p className="text-xs">The PDFs describe the prototype's implementation. This portfolio does not contain its private source; the public demo page confirms its five application areas, not every internal code path.</p>
      </Section>
      <Section id="g" title="QA & test results">
        <p className="eyebrow">QA Report · {reportedQA.date} · Local preview</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <article className="border border-border bg-card p-5"><h3 className="text-2xl text-foreground">Automated</h3><p className="mt-3 font-display text-4xl text-accent">{reportedQA.automated.passed} passed</p><p className="mt-2 text-sm">0 failed · 7 test files</p><p className="mt-3 break-words font-mono text-xs">{reportedQA.automated.command}</p><p className="mt-2 text-xs">Preview build completed cleanly.</p></article>
          <article className="border border-border bg-card p-5"><h3 className="text-2xl text-foreground">Live API</h3><p className="mt-3 font-display text-4xl text-accent">{reportedQA.live.passed} passed</p><p className="mt-2 text-sm">0 failed · <b className="text-foreground">2 blocked</b></p><p className="mt-3 text-xs">Gemini free-tier HTTP 503 outage at the time of the report.</p></article>
          <article className="border border-border bg-card p-5"><h3 className="text-2xl text-foreground">Manual</h3><p className="mt-3 font-display text-4xl text-accent">1 passed</p><p className="mt-2 text-sm">0 failed · 0 blocked</p><p className="mt-3 text-xs">Review Queue behavior and session-only persistence limitation confirmed.</p></article>
        </div>
        <Callout>{claimsProject.status}. These are source-report results, not a new test run against the published demo.</Callout>
        <details className="border-b border-border pb-4"><summary className="cursor-pointer text-foreground">Automated coverage / seven test files</summary><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3 pr-3 text-foreground">Suite</th><th className="py-3 pr-3 text-foreground">Tests</th><th className="py-3 text-foreground">Coverage</th></tr></thead><tbody>{testSuites.map(([suite, count, coverage]) => <tr key={suite} className="border-b border-border align-top"><td className="py-3 pr-3 text-foreground">{suite}</td><td className="py-3 pr-3 font-mono">{count}</td><td className="py-3">{coverage}</td></tr>)}</tbody></table></div></details>
        <h3 className="text-2xl text-foreground">Live checks: passed and blocked</h3>
        <p className="text-sm">Extraction from the original and modified claim, VIN validation and decoding, partial-decode warnings, server-side API-key isolation, and provider failure handling passed the documented checks. Browser inspection recorded zero requests to Google.</p>
        <div className="border-l-2 border-accent pl-4 text-sm"><p className="font-medium text-foreground">Blocked: LA-03 and LA-04 answer path</p><p className="mt-2">Supported rental-reimbursement Q&A citation re-verification and the unsupported boat-damage answer path were blocked during the HTTP 503 outage. Earlier successful checks were documented. Error transparency and escalation were observed during the outage; that does not reverify successful policy answers or their citations.</p></div>
        <details className="border-b border-border pb-4"><summary className="cursor-pointer text-foreground">Source-report reconciliation note</summary><p className="mt-3 text-sm">The report's summary states 9 live passes and 2 blocked checks, while its detailed table lists LA-01 through LA-10 (8 rows marked Pass and 2 Blocked). The summary counts are retained as requested; the source report should reconcile the row-level count. Its publication note names a different Lovable deployment URL; the current Vercel landing page is reachable, but deployed QA remains pending.</p></details>
      </Section>
      <Section id="h" title="Limitations & security">
        <ul className="space-y-4">{[
          "State, claims, extraction results, reviewer notes, and decisions are session-only and reset on refresh. No database or multi-user review.",
          "PDF processing is text-based; OCR is not implemented.",
          "BM25 retrieval is lexical. Semantic entailment is not proven by retrieval or valid citations.",
          "Human review remains necessary before any information is relied on.",
          "The public demo has no per-user rate limiting; provider quotas are not a substitute.",
          "Gemini free-tier availability and quotas can affect live policy Q&A.",
        ].map((text) => <li key={text} className="border-l-2 border-border pl-4 text-sm">{text}</li>)}</ul>
        <Callout>Documented safeguards include server-side API-key isolation, input validation, timeouts, bounded retries, and fail-closed errors. They do not constitute a full production security audit.</Callout>
      </Section>
      <Section id="i" title="Business value evaluation">
        <h3 className="text-3xl text-foreground">Evaluation Plan — Results Not Yet Established</h3>
        <p>This section defines hypotheses, metrics, and methods from BUSINESS_VALUE_PLAN.pdf. It does not establish real-world savings, production accuracy, or actual business impact.</p>
        <ol className="space-y-3 text-sm"><li>1. AI extraction may reduce manual data-entry time without reducing accuracy.</li><li>2. Evidence-cited policy answers may reduce policy-search effort.</li><li>3. Safe escalation may prevent unsupported information from flowing into downstream decisions.</li></ol>
        <div className="divide-y divide-border">{metrics.map(([title, items]) => <div key={title} className="grid gap-3 py-5 sm:grid-cols-[180px_1fr]"><h3 className="text-2xl text-foreground">{title}</h3><ul className="space-y-2 text-sm">{items.map((item) => <li key={item}>— {item}</li>)}</ul></div>)}</div>
        <Callout>Proposed targets, not measured results: {evaluationPlan.targets.evidenceValidity}% evidence validity; {evaluationPlan.targets.citationValidity}% citation validity; {evaluationPlan.targets.hallucinationRate}% hallucination; 0% unsafe resolution; 100% failure transparency. These must be measured, even where code enforces a guardrail.</Callout>
        <h3 className="text-2xl text-foreground">Planned evaluation approach</h3>
        <ul className="space-y-3 text-sm"><li>— Freeze a labeled set of at least {evaluationPlan.minimumClaims} synthetic claims, including missing fields, ambiguous dates, and conflicting amounts.</li><li>— Use at least {evaluationPlan.minimumQuestions} policy questions across answerable, partially answerable, and unanswerable categories.</li><li>— Run a timed study with {evaluationPlan.participants.min}–{evaluationPlan.participants.max} participants using the same synthetic claims in manual and AI-assisted workflows; randomize workflow order.</li><li>— Score evidence/citation matching automatically and answer entailment with a human rubric: supported, partially supported, unsupported.</li><li>— Record dataset version, run date, model version, and sample sizes; repeat after model, prompt, or retrieval changes.</li><li>— Estimate cost from requests and token usage; induce API failures in a controlled test environment to evaluate transparency.</li></ul>
        <p className="text-sm">Pilot decision criteria are proposed, not passed: any fabricated citation or unsafe resolution is a release blocker. Set an abstention threshold with stakeholders; never extrapolate synthetic results to real-world savings.</p>
      </Section>
      <Section id="j" title="Demo & supporting documents">
        <ProjectDocuments />
        <h3 className="pt-3 text-2xl text-foreground">Five-minute demo checklist</h3>
        <ol className="space-y-3 text-sm">{[
          "Load synthetic claim and sample policy documents.",
          "Run extraction and inspect verbatim source quotes and review flags.",
          "Modify the claim sample; rerun and verify extracted values follow the changed document.",
          "Ask a supported policy question (rental reimbursement deductible) and inspect citations.",
          "Ask an unsupported question (boat damage) and inspect abstention or escalation behavior.",
          "Review an item, add a note, distinguish a note from verified correction, then demonstrate that refresh clears session-only state.",
          "Test an invalid VIN (ABC) and a valid VIN (1HGCM82633A004352); inspect decoded details and warnings.",
        ].map((step, i) => <li key={step} className="flex gap-3"><span className="font-mono text-accent">{i + 1}.</span>{step}</li>)}</ol>
        <Callout>Live policy Q&A may be affected by provider availability. Show the actual error and review behavior rather than presenting the script's expected answer as a current result.</Callout>
      </Section>
      <Section id="k" title="Future roadmap">
        <ol className="space-y-4">{roadmap.map(([status, task], i) => <li key={task} className="flex items-start gap-4 border-b border-border pb-4"><span className="font-mono text-xs text-accent">0{i + 1}</span><div><span className="font-mono text-[10px] uppercase text-accent">{status}</span><p className="mt-1 text-sm">{task}</p></div></li>)}</ol>
        <p className="text-sm">Pending and proposed items are future work. The reachable demo URL alone does not mark publication or deployed QA as complete.</p>
      </Section>
      <footer className="flex flex-wrap gap-3 border-t border-border py-10"><Button asChild className="rounded-none"><Link to="/"><ArrowLeft />Back to portfolio</Link></Button><Button asChild variant="outline" className="rounded-none"><a href="mailto:sdasari1229@gmail.com">Discuss this project <ArrowUpRight /></a></Button></footer>
    </main>
  </div>;
}
