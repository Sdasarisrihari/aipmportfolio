<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep document pointers, project identity, reported QA, and planned evaluation values in `src/lib/claims-project.ts`; sharing one evidence model prevents the portfolio and case study from contradicting each other.
- Reuse `ProjectDocuments` for original PDF actions and `ClaimsArchitecture` for the documented system diagram; neither module implements or changes the external prototype.
- Keep `/case-study` as the single flagship project detail route; replace its content rather than creating duplicate project pages.
