# Portfolio revision
- [x] Correct German copy, school/application dates, privacy, and contact information.
- [x] Verify GitHub projects and update descriptions/skills. No genuine screenshots available; existing presentation retained. Private Lua exercises remain based on Adrian's own statements.
- [x] Preserve design; improve small-screen text wrapping, contrast, and keyboard-accessible menu.
- [x] Update metadata; verify navigation, project details, timeline, clipboard, email destination, GitHub URLs, and 390/768/1069/1280px layouts. Seven tests passed; no browser errors. External email delivery is outside the website.

# GitHub Pages repair
- [x] Update the Pages base path and route tests for the renamed repository adrians-portfolio.
- [x] Configure homepage prerendering and a GitHub-Pages-only base path without changing portfolio content.
- [x] Correct the existing workflow's upload folder and assert the static HTML/assets exist before upload.
- [x] Audit static-hosting compatibility and verify preview navigation, project details, email and Linux interaction; eleven tests pass and the harness reports build OK.
- [x] Verify the generated .output/public/index.html and assets in the GitHub Pages build: run 40355112509 succeeded, including static verification, upload and deployment.
- [ ] Confirm deployment of the renamed base path: the live /adrians-portfolio/ homepage still references /pixel-perfect-replay-8921/ assets; waiting for Git sync and a new Actions run containing the path correction.