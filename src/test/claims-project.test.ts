import { describe, expect, it } from "vitest";
import { evaluationPlan, projectDocuments, reportedQA } from "@/lib/claims-project";

describe("Source-report results and planned evaluation", () => {
  it("lists five supporting documents including the architecture diagram", () => {
    expect(projectDocuments.map((doc) => doc.id)).toEqual(["qa", "demo", "architecture", "architecture-diagram", "evaluation"]);
    const diagram = projectDocuments.find((doc) => doc.id === "architecture-diagram");
    expect(diagram?.title).toBe("Architecture Diagram");
    expect(diagram?.asset.content_type).toBe("application/pdf");
  });
  it("retains the automated report counts", () => {
    expect(reportedQA.automated).toMatchObject({ passed: 52, failed: 0, files: 7, command: "bunx vitest run", build: "clean" });
  });
  it("keeps the two live checks blocked rather than passing", () => {
    expect(reportedQA.live).toMatchObject({ passed: 9, failed: 0, blocked: 2 });
  });
  it("records the manual limitation check separately", () => {
    expect(reportedQA.manual).toEqual({ passed: 1, failed: 0, blocked: 0 });
  });
  it("keeps evidence and citation validity as proposed 100 percent targets", () => {
    expect(evaluationPlan.status).toBe("planned");
    expect(evaluationPlan.targets.evidenceValidity).toBe(100);
    expect(evaluationPlan.targets.citationValidity).toBe(100);
  });
  it("keeps hallucination and unsafe resolution as zero targets", () => {
    expect(evaluationPlan.targets.hallucinationRate).toBe(0);
    expect(evaluationPlan.targets.unsafeResolutionRate).toBe(0);
  });
  it("requires at least 30 synthetic claims", () => {
    expect(evaluationPlan.minimumClaims).toBe(30);
  });
  it("requires at least 20 policy questions", () => {
    expect(evaluationPlan.minimumQuestions).toBe(20);
  });
  it("plans a study with three to five participants", () => {
    expect(evaluationPlan.participants).toEqual({ min: 3, max: 5 });
  });
});