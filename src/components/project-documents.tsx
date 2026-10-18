import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectDocuments } from "@/lib/claims-project";

export function ProjectDocuments({ compact = false }: { compact?: boolean }) {
  if (compact) return <div className="flex flex-wrap gap-x-5 gap-y-3">
    {projectDocuments.map((doc) => <Button key={doc.id} asChild variant="link" className="h-auto justify-start whitespace-normal p-0 text-left text-xs">
      <a href={doc.asset.url} download={doc.asset.original_filename}><Download aria-hidden="true" />{doc.title} <span className="font-mono text-muted-foreground">PDF</span></a>
    </Button>)}
  </div>;

  return <div className="grid gap-4 sm:grid-cols-2">
    {projectDocuments.map((doc) => <article key={doc.id} className="flex min-w-0 flex-col border border-border bg-card p-5">
      <FileText className="mb-4 text-accent" size={22} aria-hidden="true" />
      <h3 className="text-2xl text-foreground">{doc.title}</h3>
      <p className="mt-2 flex-1 text-sm">{doc.description}</p>
      <p className="mt-3 font-mono text-[10px] text-muted-foreground">PDF · {Math.round(doc.asset.size / 1024)} KB · Original document</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild size="sm" className="rounded-none"><a href={doc.asset.url} download={doc.asset.original_filename}><Download aria-hidden="true" />Download<span className="sr-only"> {doc.title}</span></a></Button>
        <Button asChild variant="outline" size="sm" className="rounded-none"><a href={doc.asset.url} target="_blank" rel="noopener noreferrer">Open<span className="sr-only"> {doc.title}</span><ArrowUpRight aria-hidden="true" /></a></Button>
      </div>
    </article>)}
  </div>;
}