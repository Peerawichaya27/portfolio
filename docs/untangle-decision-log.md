# Portfolio untangling decision log

Scope: preserve the current bilingual, single-page, full-stack portfolio, cinematic opening,
code editor, procedural guitar, scroll scenes, contact actions, and existing route behavior.
The user selected both optional comment and test cleanup. The starting check/build pass;
no existing tests were found. `next-env.d.ts` has a pre-existing local modification.

## Decisions and problems they solve

### D1. A typed studio runtime owns motion, opening state, reveal readiness, strums, and hero progress

- Hidden link: FilmIntro, StudioMotion, GuitarScene, CodeEditor and FlyingCode coordinate via untyped `film:*`/`guitar:*` window events.
- Hidden link: `documentElement.dataset.intro` and `dataset.studioMotion` are read and written by unrelated modules as shared application state.
- Hidden link: the guitar reads a CSS variable another module writes and observes style mutations to receive model progress.
- Hidden link/special case: asynchronous model loading can miss the reveal event; every consumer independently decides whether to start now or wait.
- Hidden link: particle bursts copy the guitar's 1.7-second pluck timing.
- Hidden link: reduced-motion policy is independently sampled or subscribed by different consumers.
- Needless link: model rendering depends on global CSS state, event spelling, and opening implementation details.
- Special cases: prepaint deep-link/session/reduced-motion checks, optional storage, skip input handling, WebGL failure, context loss, visibility pauses and replay need explicit ownership.

### D2. Colocate studio features and separate scroll effects from the React lifecycle adapter

- Needless link: `components/studio-motion.tsx` owns unrelated hero, title, career, terminal, photo, marquee, and skill-drum selectors and animation logic.
- Hidden link: animation selectors and character-splitting conventions are scattered between large page markup, components, and styles.
- Special case: Thai characters cannot be split as Latin characters; retain the external writing-system constraint in a shared text-animation boundary.
- Surplus: pass-through orchestration and repeated lifecycle setup/cleanup should become one owning adapter, not additional configuration layers.

### D3. Career identity and dates are domain data, not formatted text

- Hidden link: role `period` strings are parsed in both company grouping and terminal output.
- Hidden link: Thai role summaries are indexed by copied display-period strings.
- Hidden link: employer/role/period data is duplicated in project records.
- Surplus: unused education, bullets, project links and detailed case-study records have no displayed consumers; retain only required legacy slug behavior.
- Special case: grouping depends on input adjacency rather than an explicit company selector.

### D4. Centralize site identity, supported routes/locales, and section navigation

- Hidden link: section IDs/order occur separately in the home page, shell and redirect pages.
- Needless link: stable locale routing imports the entire volatile translation dictionary.
- Hidden link: name, brand, origin, title and description are copied in metadata, sitemap, robots, social image, shell and translations.
- Special case/surplus: root-language href branching is unnecessary when all locale paths are known.
- Special case: keep the framework-required route files and known-project redirects, but derive their destinations from one registry.
- Surplus: publication search fallback never applies because all current publications have real URLs; require URLs.
- Hidden link: partial skill-category dictionaries rely on untyped English fallbacks; use complete typed category labels.

### D5. Split page and shell into cohesive feature sections

- Needless link: the home component owns independently changing hero, photo/about, career, skills, publication and contact markup plus derived data.
- Needless link: the shell combines theme provider, locale switch, theme control, section tracking, mobile menu and footer.
- Preserve existing CSS selectors and all visible content during extraction.

### D6. One style entry point, with feature-owned files and the existing cascade preserved

- Hidden link: current styles depend on historical append order across globals.css, performance.css and cinema.css.
- Needless link: header, film intro, Thai typography, hero/editor, and unrelated page sections share chronological stylesheets.
- Surplus: removed project cards/disclosures/résumé, old navigation, and prior hero rules remain active or unreachable.
- Special cases: responsive, dark/light, reduced-motion, print and intro-state rules must remain explicit and keep the same cascade.
- Consolidate only equivalent selector/context declarations when safe; remove only selectors with no current consumer.

### D7. Behavior checks and current architectural documentation

- Hidden link: README describes removed project/résumé features and old module locations.
- Missing safety net: no automated coverage for startup/replay/late readiness, locale routing, career formatting or compatibility redirects.
- Add behavioral regression tests against public seams; do not mirror implementation details.
- Remove comments that only restate implementation; retain external constraints and source-of-truth explanations.

## Remaining justified special cases

- Reduced motion, deep links and one-intro-per-session behavior are product/accessibility policies.
- Session storage and WebGL can be unavailable; graceful fallback is required.
- Thai grapheme handling and font fallback are writing-system requirements.
- Mailto fallback after clipboard denial is a browser-capability fallback.
- Next.js route/layout entry files are framework-required.

## Verification and review

- Baseline: `yarn run check` and `yarn build` pass.
- After implementation: format, lint, typecheck, behavior tests, production build, and route smoke checks.
- Independent subagents re-audit for hidden links, needless links, surplus, and unnecessary special cases; append any findings and resolve before completion.

## Refinements discovered during implementation

- D1: control-registration cleanup must be identity-safe across remounts; an old owner must not unregister its replacement. Idle skip is a no-op rather than a new reveal.
- D1: the prepaint opening request must survive React's development effect cleanup before the real motion preference is available. Capture the request in the provider adapter and project state only after initialization.
- D1: model-progress subscriptions replay the latest bounded, finite value without causing React renders on every animation frame.
- D3: company grouping and date ranges now work for interleaved or reordered input, rather than requiring adjacent roles.
- D4: mobile-menu behavior derives from the rendered control's visibility instead of copying a CSS breakpoint.
- D6: source-order preservation must include overlapping selectors with equal specificity, not just repeated identical selectors. Only proven-dead rules can be dropped.
- D7: current public text, links, and section anchors from both prerendered locales were captured outside the repository before implementation for the final comparison.

## Independent review and resolved follow-ups

- Content/navigation reviewer verified all three runtime follow-ups: stale reveals during replay, partially typed editor cleanup, and duplicated Thai splitting policy. The stale-reveal case first failed a regression test, then passed after the fix.
- A real React StrictMode DOM test verifies preservation of the prepaint request, reduced-motion cancellation of interrupted editor typing, and detachment of DOM side effects on unmount.
- Animation reviewer independently checked content, navigation, and metadata and found no further worthwhile coupling.
- Styles were partitioned by feature and obsolete layouts removed. The migration check verifies 494 retained selector/condition declaration sequences and 280 relevant overlapping cascade relationships, not merely file sizes or names.
- Independent CSS review identified shared editor/terminal chrome and semantic text roles in feature-specific files. They belong with shared code-view styles and were moved without changing their selectors or cascade.
- The six-string instrument and standardized browser media-query syntax remain fixed product/platform constraints. A speculative configurable-instrument layer was not added.

## Final verification

- `yarn run check`: formatting, zero-warning ESLint, TypeScript, and **23 behavior tests** pass; no skipped tests.
- `node scripts/verify-style-migration.mjs`: **494 declaration sequences and 280 overlapping cascade relationships** preserved. This one-time migration audit is intentionally outside ordinary checks.
- `yarn build`: production build succeeds for both language pages and all compatibility/metadata routes.
- `yarn test:routes`: both locales, all four legacy pages, all three known project slugs, unknown-project/page 404s, sitemap, robots, and social image pass against a temporarily served production build; server stopped afterward.
- Prerendered English and Thai text content, link destinations, and section anchors match the captured pre-refactor pages.
- Resolved source-import audit: no dependency cycles, stale layer imports, old stylesheet imports, global film/guitar event protocols, or CSS mutation-observer messaging remain.
- Independent content/navigation, runtime, and stylesheet reviews have no remaining worthwhile structural findings after their follow-up fixes.
- Full browser/WebGL visual QA remains unavailable in this session. DOM lifecycle tests and the stylesheet cascade audit cover their specific boundaries; they do not substitute for a rendered GPU screenshot.
