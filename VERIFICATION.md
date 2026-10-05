# Verification — 5 October 2026

The revised structure contains six courses, 36 sections and nine canonical scenes. Every canonical scene is shared by at least two sections. Section-map bindings preserve scene IDs and drive the shell’s existing node highlight feature.

- TypeScript, content consistency, canonical reuse and focus-target checks passed.
- Production build passed, with Vite’s existing bundle-size advisory.
- All 36 routes passed desktop (1920×1080), 4K (3840×2160) and mobile (390×844) runtime and overflow checks.
- All 36 desktop frames were visually inspected in paginated contact sheets, including changing container, tile and card highlights.
- Consumption was rendered again after improving serving layout and warehouse join routing.
- The full poster remains unchanged; detailed poster text is best read on its dedicated full-scene route.
- The regenerated audio manifest contains 36 sections. No WAVs, videos, cloud resources or published site were generated.

Render evidence is stored in the ignored frames directory. Old retained section routes and their new course prefixes are recorded in route-migration.json.
