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

- Keep school/application facts and mail links in the browser-safe portfolio module so dates and contact actions stay consistent.
- Use existing shadcn buttons with portfolio variants and Radix dialog primitives for accessible controls while retaining the original neon design.
- Project descriptions must reflect verified public repository contents; do not fetch GitHub during page rendering or invent screenshot assets.
- Playful elements that dodge the pointer must stay reachable by keyboard: block the dodging only while the element has `:focus-visible`, never on plain focus — a mouse click leaves the element focused forever and would disable it.
- GitHub Pages builds use GITHUB_PAGES=true, TanStack homepage prerendering without Nitro, and upload only .output/public; the build-time SSR bundle stays separate, while Lovable retains its managed Nitro build and root base path.
- Use import.meta.env.BASE_URL for the router mount and public asset/root URLs so repository-subpath hosting and the Lovable preview share unchanged portfolio content.
