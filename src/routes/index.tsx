import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import { Button } from "@/components/ui/button";
import { ProjectDocuments } from "@/components/project-documents";
import { claimsProject } from "@/lib/claims-project";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srihari Dasari — Business Analyst · P&C Insurance · Applied AI" },
      { name: "description", content: "Business Analyst turning complex business problems into practical AI-powered products across P&C insurance and workflow automation." },
      { property: "og:title", content: "Srihari Dasari — AI Product Portfolio" },
      { property: "og:description", content: "Business analysis, P&C insurance, and applied AI prototyping." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = ["Home", "About", "Experience", "Projects", "Skills", "Contact"];

const roles = [
  {
    date: "July 2026 – Present", title: "Analyst II", org: "ReSourcePro · Insurance regulatory policy operations",
    bullets: [
      "Manage commercial insurance policy configuration and maintenance using QuickSolver / QS4 and QS4 Studio, supporting client accounts and policy administration workflows.",
      "Research regulatory and bureau updates alongside client requirements to assess impacts on policy-rating functionality and operational processes.",
      "Gather and document business requirements, use cases, acceptance criteria, and functional specifications for client implementations and system enhancements.",
      "Create and execute test plans, validate rating outputs and configurations, and coordinate defect resolution across the software development lifecycle.",
      "Coordinate implementation tasks, project plans, deadlines, releases, and client issue resolution with Insurance Policy Operations and MIS teams.",
      "Support process improvement, training, and knowledge sharing with junior team members and interns.",
    ],
    evidence: [], tools: ["QuickSolver / QS4", "QS4 Studio"],
  },
  {
    date: "September 2023 – July 2026", title: "Business Analyst", org: "Hartford Insurance · P&C insurance",
    bullets: [
      "Supported Guidewire PolicyCenter enhancements across policy administration, underwriting, and policy servicing workflows.",
      "Gathered requirements for policy issuance, endorsements, renewals, and quote-to-bind with stakeholders and underwriting SMEs.",
      "Mapped AS-IS / TO-BE workflows for quote-to-bind, policy servicing, and FNOL; documented business rules, field mappings, product data, and integration dependencies.",
      "Defined API requirements and data mappings for integrations between PolicyCenter, CRM, and downstream insurance systems.",
      "Validated eligibility, underwriting, and rating rules using CGI Ratabase and Guidewire workflows.",
      "Supported UAT, defect analysis, traceability, and backend data validation with SQL.",
    ],
    evidence: ["Translated requirements into 25+ JIRA user stories with acceptance criteria and validation rules.", "Supported UAT across 10+ PolicyCenter releases."],
    tools: ["Guidewire PolicyCenter", "CGI Ratabase", "JIRA", "SQL", "REST / JSON APIs"],
  },
  {
    date: "April 2022 – September 2023", title: "Associate Business Analyst", org: "Livspace · E-commerce",
    bullets: [
      "Supported platform enhancements across product discovery, marketplace operations, checkout, and order fulfillment.",
      "Mapped AS-IS / TO-BE workflows across product listing, inventory, and checkout to identify operational improvement opportunities.",
      "Defined integration requirements and API specifications for partner integrations spanning payments, CRM, and logistics.",
      "Designed and validated UAT scenarios across releases; coordinated defect resolution before deployment.",
      "Analyzed customer feedback and KPI trends to support retention and demand analysis.",
    ],
    evidence: [
      "Facilitated requirements discussions with 10+ stakeholders across product, engineering, operations, and business teams.",
      "Authored 15+ BRDs, FRS documents, and user stories for product recommendation and dynamic pricing initiatives.",
      "Defined API specifications for 3 partner integrations and supported UAT across 5+ releases.",
    ],
    tools: ["Postman", "SoapUI", "Swagger", "Google Analytics", "Power BI", "Tableau"],
  },
];

const skills = [
  { t: "Business Analysis", i: ["Requirements gathering", "BRD / FRD / FRS", "User stories & acceptance criteria", "AS-IS / TO-BE process mapping", "Gap & data mapping", "UAT & defect management"] },
  { t: "Product & Project Management", i: ["Discovery & problem framing", "MVP definition", "Backlog & prioritization", "Roadmaps & dependencies", "Risk management", "KPI definition", "Agile / Scrum delivery"] },
  { t: "Insurance & Technology", i: ["P&C insurance", "Guidewire PolicyCenter", "QuickSolver / QS4", "CGI Ratabase", "SQL", "REST / JSON APIs", "Postman · SoapUI · Swagger", "Power BI · Tableau · Google Analytics"] },
  { t: "Applied AI", i: ["LLM", "RAG", "Lovable", "ChatGPT", "Claude", "NotebookLM", "Replit", "Floot AI"] },

];

const Chip = ({ children }: { children: string }) => (
  <span className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{children}</span>
);

function SectionHead({ n, label, right, title }: { n: string; label: string; right: string; title: React.ReactNode }) {
  return (
    <div className="mb-14">
      <div className="mb-8 flex justify-between border-b border-border pb-4">
        <span className="eyebrow"><span className="text-accent">{n}</span> — {label}</span>
        <span className="eyebrow">{right}</span>
      </div>
      <h2 className="text-5xl leading-[1.02] md:text-7xl">{title}</h2>
    </div>
  );
}

function Index() {
  const [filter, setFilter] = useState("All");
  const showClaims = filter === "All" || ["AI Products", "Business Analysis", "Product Management", "Insurance"].includes(filter);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-wrap justify-between gap-2 bg-primary px-6 py-2 font-mono text-[10px] text-primary-foreground">
        <span>PRODUCT THINKING / P&C INSURANCE / APPLIED AI</span><span>PORTFOLIO · 2026</span>
      </div>
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <a href="#home" className="font-display text-3xl">SD<span className="text-accent">•</span></a>
          <nav aria-label="Primary" className="hidden gap-8 text-sm lg:flex">
            {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-accent">{n}</a>)}
          </nav>
          <div className="flex items-center gap-6 text-sm">
            <a href={resumeAsset.url} download="Srihari_Dasari_Resume.pdf" className="hidden items-center gap-1 sm:flex">Download Resume <ArrowDownRight size={14} /></a>
            <a href="#projects" className="flex items-center gap-2 bg-primary px-4 py-3 text-xs text-primary-foreground">View Projects <ArrowDownRight size={14} /></a>
          </div>
        </div>
        <nav aria-label="Sections" className="flex gap-5 overflow-x-auto border-t border-border px-6 py-2 text-xs lg:hidden">
          {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}
        </nav>
      </header>

      <section id="home" className="mx-auto max-w-[1200px] px-6 pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow mb-8 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Business Analyst · P&C Insurance · Applied AI</p>
            <h1 className="text-5xl leading-[0.95] sm:text-6xl md:text-[88px]">I turn complex business problems into practical AI-powered products.</h1>
            <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">Business Analyst with P&C insurance experience and practical AI product-building skills. I translate business problems into requirements, define focused MVPs, and build evidence-grounded prototypes with human review and testable evaluation criteria.</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href="#projects" className="flex items-center gap-6 bg-primary px-5 py-4 text-sm text-primary-foreground">Explore My Work <ArrowDown size={16} /></a>
              <a href={resumeAsset.url} download="Srihari_Dasari_Resume.pdf" className="flex items-center gap-2 border-b border-foreground pb-1 text-sm">Download Resume <ArrowDownRight size={14} /></a>
            </div>
          </div>
          <div className="relative aspect-[6/5] border border-border bg-card">
            <div className="absolute inset-y-0 left-1/2 w-px bg-border" /><div className="absolute inset-x-0 top-1/2 h-px bg-border" />
            <span className="absolute left-6 top-6 font-mono text-[11px] text-muted-foreground">A working principle</span>
            <span className="absolute right-6 top-6 font-mono text-[11px] text-muted-foreground">01 / 03</span>
            <svg viewBox="0 0 300 300" className="orbit absolute left-1/2 top-1/2 h-[62%] -translate-x-1/2 -translate-y-1/2 text-muted-foreground">
              <ellipse cx="150" cy="150" rx="140" ry="95" transform="rotate(-55 150 150)" fill="none" stroke="currentColor" strokeWidth=".8" />
              <ellipse cx="150" cy="150" rx="135" ry="110" transform="rotate(-30 150 150)" fill="none" stroke="currentColor" strokeWidth=".8" />
              {[[150, 12], [262, 82], [22, 180], [55, 230], [118, 245], [175, 255]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className="fill-accent" />)}
            </svg>
            <div className="absolute left-1/2 top-1/2 flex h-[38%] aspect-square -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-muted-foreground/50 bg-background/40 font-mono text-[11px] tracking-widest">
              COMPLEXITY<span className="my-2 text-xl text-accent">→</span>CLARITY
            </div>
            <span className="absolute bottom-6 left-5 font-mono text-[10px] tracking-widest text-muted-foreground">PROBLEM → REQUIREMENT → PROTOTYPE</span>
            <span className="absolute bottom-12 right-5 text-right text-[11px] text-muted-foreground">Make the work legible.<br />Keep the human in control.</span>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-6 text-xs text-muted-foreground">
          {["Business Analysis & Product Strategy", "Insurance & Workflow Automation", "AI Prototyping & Implementation"].map((t, i) => <span key={t}><span className="mr-2 font-mono text-accent">0{i + 1}</span>{t}</span>)}
        </div>
        <div className="mt-5 flex justify-between border-t border-border py-4"><span className="eyebrow">01 / A practice built around usefulness</span><span className="eyebrow flex gap-2">Scroll to explore <ArrowDown size={12} /></span></div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-16 md:grid-cols-[180px_1fr_80px]">
          <span className="eyebrow">A point of view</span>
          <p className="font-display text-3xl leading-tight">Good AI product work starts before the model: with the operational reality, the people doing the work, and a definition of <em className="text-accent">better</em> that can be tested.</p>
          <span className="eyebrow text-right">SD / 26</span>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-[1200px] px-6 py-28">
        <SectionHead n="01" label="About" right="The through-line" title="Translate the messy middle." />
        <div className="grid gap-14 md:grid-cols-2">
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p className="font-display text-2xl text-foreground">I work where operational needs meet product decisions and technical possibility.</p>
            <p>My experience spans P&C insurance and e-commerce. I’ve supported Guidewire PolicyCenter and commercial policy systems, translating stakeholder needs into requirements, user stories, acceptance criteria, process maps, and testable changes. I’ve also worked with REST/JSON APIs, SQL validation, UAT, Agile delivery, and partner integrations.</p>
            <p>I’m building on that foundation through AI Claims Copilot: making MVP scope trade-offs, integrating APIs and structured outputs, validating evidence, handling errors, and designing human-in-the-loop workflows. I document architecture, risks, limitations, and a measurable evaluation plan before claiming value.</p>
          </div>
          <div>
            {["Discover the real problem", "Translate needs into buildable requirements", "Map today and the better future", "Test value before scaling"].map((t, i) => (
              <div key={t} className="flex gap-6 border-b border-border py-5 font-display text-2xl"><span className="font-mono text-xs text-accent">0{i + 1}</span>{t}</div>
            ))}
            <p className="mt-6 font-mono text-[11px] tracking-widest text-muted-foreground">FROM <b className="text-foreground">Stakeholder reality</b> → <b className="text-foreground">Product requirements</b> → <b className="text-foreground">Testable prototype</b> TO</p>
          </div>
        </div>
      </section>

      <section id="experience" className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1200px] px-6 py-28">
          <SectionHead n="02" label="Experience" right="Verified record" title="Experience, grounded in the work." />
          <p className="-mt-8 mb-14 max-w-2xl text-muted-foreground">Across insurance policy operations and e-commerce, the through-line is clear requirements, mapped workflows, integrations, and careful delivery with business and technical teams.</p>
          {roles.map((r, i) => (
            <article key={r.title} className="grid gap-8 border-t border-border py-12 md:grid-cols-[260px_1fr]">
              <div><p className="eyebrow">0{i + 1} / Role</p><p className="mt-3 text-sm font-medium">{r.date}</p></div>
              <div>
                <h3 className="text-4xl">{r.title}</h3><p className="mt-1 text-sm text-muted-foreground">{r.org}</p>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">{r.bullets.map((b) => <li key={b} className="flex gap-3"><span className="text-accent">—</span>{b}</li>)}</ul>
                {r.evidence.length > 0 && <div className="mt-8"><p className="eyebrow mb-3">Selected verified evidence</p><div className="grid gap-3 md:grid-cols-3">{r.evidence.map((e) => <p key={e} className="border border-border bg-background p-4 text-sm">{e}</p>)}</div></div>}
                <p className="eyebrow mb-3 mt-8">Tools & systems</p><div className="flex flex-wrap gap-2">{r.tools.map((t) => <Chip key={t}>{t}</Chip>)}</div>
              </div>
            </article>
          ))}
          <div className="grid gap-8 border-t border-border pt-12 md:grid-cols-3">
            <div><p className="eyebrow mb-3">Education</p><h3 className="text-2xl">Bachelor of Technology (B.Tech.) in Computer Science and Engineering</h3><p className="mt-2 text-sm text-muted-foreground">Gitam University · Visakhapatnam, India · July 2022</p></div>
            <div><p className="eyebrow mb-3">Certifications</p><p className="text-sm">Microsoft Certified: Power BI Data Analyst Associate (PL-300)</p><p className="mt-2 text-sm">Professional Scrum Product Owner I (PSPO I)</p></div>
            <div><p className="eyebrow mb-3">Languages</p><p className="text-sm">English — Professional Working Proficiency</p><p className="mt-2 text-sm">Telugu — Native</p></div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-[1200px] px-6 py-28">
        <SectionHead n="03" label="Selected work" right="One flagship prototype" title="AI Claims Copilot." />
        <p className="-mt-8 mb-10 max-w-2xl text-muted-foreground">Synthetic P&C Insurance Claims Decision-Support Prototype — independent portfolio work, grounded in documented implementation and QA.</p>
        <div className="mb-8 flex flex-wrap gap-2">{["All", "AI Products", "Business Analysis", "Product Management", "Insurance"].map((f) => <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} aria-pressed={filter === f} onClick={() => setFilter(f)} className="rounded-none">{f}</Button>)}</div>
        {showClaims && <div className="grid gap-10 border border-border md:grid-cols-2">
          <div className="relative bg-card p-8">
            <p className="eyebrow">Prototype / 2026 · Synthetic-data MVP</p>
            <div className="mt-8 border border-border bg-background p-6">
              <p className="eyebrow mb-4">Workflow overview · Human review</p>
              {[["Extracted values", "Source evidence checked"], ["Policy passages", "Citation matching"], ["Uncertain information", "Escalated for review"], ["VIN decoding", "Validation + warnings"]].map(([k, v]) => <div key={k} className="flex flex-wrap justify-between gap-2 border-b border-border py-2 text-sm"><span className="text-muted-foreground">{k}</span><b className="font-medium">{v}</b></div>)}
              <p className="mt-4 text-sm italic text-accent">Human verification stays central</p>
            </div>
            <p className="mt-6 font-display text-3xl">Assist the decision,<br />never make it</p>
            <p className="eyebrow mt-4">Session-only demo · Not a live claims system</p>
          </div>
          <div className="p-8">
            <p className="eyebrow">AI Product Development | P&C Insurance | 2026</p>
            <h3 className="mt-4 text-4xl sm:text-5xl">{claimsProject.name}</h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">{claimsProject.description}</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {[
                ["AI-powered extraction", "Google Gemini via secure server-side functions, with source-quote validation to flag missing information."],
                ["Policy Q&A & grounding", "BM25 retrieval with citation verification, escalating when evidence is insufficient."],
                ["Human-in-the-loop review", "A Review Queue for missing fields, ambiguous information, unsupported questions, and processing failures."],
                ["API integration", "NHTSA vPIC vehicle lookup with input validation, error handling, and VIN check-digit warnings."],
                ["Quality & safety", "Automated tests for evidence grounding, validation, API failure handling, and review state — 52/52 passing."],
                ["Product thinking", "Documented architecture, QA results, a demo script, and a business-value evaluation plan."],
              ].map(([t, d]) => <li key={t} className="flex gap-3"><span className="text-accent">—</span><span><b className="font-medium text-foreground">{t}:</b> {d}</span></li>)}
            </ul>
            <p className="mt-6 border-l-2 border-accent pl-3 font-mono text-[11px] text-accent">Prototype status: {claimsProject.status}. Two live policy-answer checks were blocked in the QA report.</p>
            <p className="eyebrow mb-3 mt-8">Tools & technologies</p>
            <div className="flex flex-wrap gap-2">{["Lovable", "React", "TypeScript", "Google Gemini API", "BM25 Retrieval", "NHTSA vPIC API", "Server Functions", "Vitest", "AI Prototyping", "API Integration", "QA", "Human-in-the-Loop Design"].map((t) => <Chip key={t}>{t}</Chip>)}</div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild className="rounded-none"><Link to="/case-study">View Case Study <ArrowUpRight size={14} /></Link></Button>
              <Button asChild variant="outline" className="rounded-none"><a href={claimsProject.demoUrl} target="_blank" rel="noopener noreferrer">View Live Demo <ArrowUpRight size={14} /></a></Button>
            </div>
            <div className="mt-6 border-t border-border pt-5"><p className="eyebrow mb-4">Supporting documents</p><ProjectDocuments compact /></div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Scope: synthetic-data MVP; claims and review state are session-only. This is a prototype demonstrating the proposed workflow—not a production claims system, and no production claims data is used.</p>
          </div>
        </div>}
      </section>

      <section id="skills" className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1200px] px-6 py-28">
          <SectionHead n="04" label="Skills" right="Experience + applied AI" title="Tools for making ambiguity actionable." />
          <p className="-mt-8 mb-14 max-w-2xl text-muted-foreground">Business analysis and insurance experience, complemented by practical AI product-building tools.</p>
          <div className="grid gap-px bg-border md:grid-cols-2">
            {skills.map((s, i) => (
              <div key={s.t} className="bg-card p-8"><span className="font-mono text-xs text-accent">0{i + 1}</span><h3 className="mb-5 mt-2 text-3xl">{s.t}</h3><div className="flex flex-wrap gap-2">{s.i.map((x) => <Chip key={x}>{x}</Chip>)}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1200px] px-6 py-28">
          <div className="mb-10 flex justify-between border-b border-primary-foreground/20 pb-4 font-mono text-[11px] tracking-[0.14em] opacity-70"><span>05 — CONTACT</span><span>BANGALORE, INDIA</span></div>
          <h2 className="text-5xl leading-[1.02] md:text-8xl">Have a business problem<br />worth solving with AI? <em>Let’s talk.</em></h2>
          <p className="mt-12 font-mono text-[11px] tracking-[0.14em] opacity-70">GET IN TOUCH</p>

          <a href="mailto:sdasari1229@gmail.com" className="mt-8 inline-flex items-center gap-3 bg-background px-6 py-4 text-sm text-foreground">Email <ArrowUpRight size={14} /></a>
        </div>
      </section>
    </div>
  );
}
