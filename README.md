# tarpp.dev

Peerawichaya Pholwiset’s bilingual, single-page engineering portfolio. Built with
Next.js App Router, TypeScript, GSAP, and a procedural Three.js guitar.

## Run and verify

Use the Node version in `.nvmrc` and Yarn 1.22.22.

```sh
yarn install
yarn dev
```

Open <http://localhost:3000>. English is at `/`; Thai is at `/th`.

```sh
yarn format       # Format source and configuration
yarn run check    # Formatting, ESLint, TypeScript, and behavior tests
yarn test         # Run behavior tests separately
yarn build        # Build the production application
yarn test:routes  # Verify built pages, redirects, metadata, and 404 responses
yarn start        # Serve the production build
```

The Vercel Next.js preset supports this project. No deployment, analytics, CMS,
backend, or contact-form service is configured.

## Where changes belong

| Change                                                      | Owner                         |
| ----------------------------------------------------------- | ----------------------------- |
| Name, contact links, origin, shared metadata                | `src/content/site.ts`         |
| Employment facts and date formatting                        | `src/content/career.ts`       |
| Technology categories and skills                            | `src/content/skills.ts`       |
| Publications and their destinations                         | `src/content/publications.ts` |
| English/Thai wording                                        | `src/i18n/dictionaries.ts`    |
| Supported locales and their home URLs                       | `src/i18n/routing.ts`         |
| Section order, anchors, navigation, compatibility redirects | `src/navigation`              |
| Page section markup                                         | `src/features/home`           |
| Header, footer, language/theme controls                     | `src/features/navigation`     |
| Opening, guitar, editor, particles, and their coordination  | `src/features/studio`         |
| Scroll animation effects                                    | `src/features/studio/motion`  |
| Styling                                                     | `src/styles`                  |
| Behavioral checks                                           | `tests`                       |

Route files in `src/app` are framework entry points. Keep feature logic out of them.
Each locale uses the same section components and professional facts. Career records
have stable IDs and structured dates; translated summaries must use IDs rather than
formatted date ranges.

## Animation lifecycle

A typed studio runtime coordinates motion preference, opening requests, hero reveals,
strums, and scroll progress. The provider projects that state into the existing CSS
attributes; components do not use CSS mutations or ad hoc window events as a message bus.
Late-loading guitar rendering receives the current hero state rather than relying on
having heard an earlier event.

The opening is skipped for reduced motion, deep links, and visitors who have already
seen it in the current session. Replay remains explicit. Storage denial does not block
the page, and unsupported WebGL falls back to the vector instrument. Particle bursts
respond to strums instead of running continuously. GSAP effects and GPU resources are
released when their owner unmounts. Thai typography uses an appropriate font fallback
and avoids splitting tone marks from their consonants.

## Styles

`src/styles/index.css` is the only style entry point. Shared tokens and base rules,
navigation, home sections, studio surfaces, and opening titles have separate owners.
Responsive, theme, motion-state, language, and print rules stay with their feature.
The refactor preserves the existing cascade for live selectors while removing rules
from layouts that no longer render.

## Compatibility and content

The legacy `/about`, `/projects`, `/resume`, `/blog`, and known project-detail URLs
redirect to the corresponding section of the English home page. Unknown project slugs
still return 404. The page includes career history, skills, publications, and contact;
there is no downloadable résumé or standalone blog in the current implementation.

Professional facts come from the supplied résumé and project content. Keep employer
information suitable for public disclosure. Publication links are explicit; do not
guess URLs or outcomes.

See [the refactor decision log](docs/untangle-decision-log.md) for the problems,
structural decisions, remaining justified exceptions, and verification results.

Design review workflow: [Unslop](https://heydamir.design/unslop), created by
[Damir Sokolovsky (@heydamir)](https://x.com/heydamir), licensed under CC BY 4.0.

The one-time stylesheet migration can be rechecked with
`node scripts/verify-style-migration.mjs`. Its archived hash fixture describes the
pre-refactor cascade; it is deliberately excluded from ordinary checks so future
intentional design changes do not require preserving implementation fingerprints.
