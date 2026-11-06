# tarpp.dev

First-version portfolio for Peerawichaya Pholwiset, based on `plan.md`.

## Development

Use Node.js LTS (22.13+ or 24+) and Yarn 1.22.22.

```sh
yarn install
yarn dev
```

Open http://localhost:3000. Run `yarn typecheck` and `yarn build` for verification. Deploy to Vercel using the Next.js preset and this directory as the project root.

## Content

- Shared professional data: `src/data/site.ts`
- Project summaries: `src/data/projects.ts`
- Pages and global styles: `src/app`
- Theme defaults to dark; light and system preferences are available in the header.
- No published blog posts are supplied, so writing has an honest empty state. MDX is deferred to v1.1.
- No original résumé PDF was supplied. `/resume` provides an accessible résumé with print/save-as-PDF support. Add an approved `public/resume.pdf` and update the CTA when available.
- Employer project descriptions use only the provided plan. Review disclosure permissions before public deployment. Project diagrams are conceptual, not internal topology.
- Social URLs are taken from the plan; verify destinations and domain ownership before launch. No publication URLs are guessed.

This version does not configure analytics or deploy automatically. The site metadata assumes `https://tarpp.dev`; update it and the sitemap/robots if using another production domain.

## Code quality

ESLint uses Next.js Core Web Vitals and TypeScript rules. Prettier owns formatting;
`eslint-config-prettier` prevents conflicting formatting rules. Unused variables
and imports must be removed, and type-only imports use `import type`.

```sh
yarn format        # Format source and configuration
yarn format:check  # Check formatting without changing files
yarn lint          # Check ESLint rules (warnings fail)
yarn lint:fix      # Apply automatic ESLint fixes
yarn run check         # Formatting, ESLint, and TypeScript checks
yarn build         # Verify the production build
```

Generated files, dependencies, the lockfile, and the original `plan.md` are excluded
from formatting. Use a supported Node.js LTS release (22.13+ or 24+) for tooling.

## Design direction

Recording-studio styling connects the nickname Guitar with software engineering:
warm charcoal, ivory text, muted amber, an original six-string guitar illustration,
and numbered track references for projects. Geist Sans and Geist Mono keep technical
content readable. Project diagrams are conceptual summaries rather than proprietary architecture. Motion includes continuous, reversible scroll-linked motion in project diagrams and section headings, a reading-progress line,
and a guitar illustration with layered depth, scroll rotation, and mouse tilt. On desktop,
the hero stays in view through a short scroll scene while the guitar rotates. Reduced-motion
preferences disable motion, and printed content remains fully visible.

Design review workflow: [Unslop](https://heydamir.design/unslop), created by
[Damir Sokolovsky (@heydamir)](https://x.com/heydamir), licensed under CC BY 4.0.

## Three.js performance stage

The homepage uses an original procedural electric-guitar model, studio lighting,
and a scroll-driven camera/rotation sequence. The model is dynamically imported;
there are no downloaded models or textures. Rendering runs on scroll, pointer,
resize, and visibility changes rather than in a permanent animation loop. Device
pixel ratio is capped, and geometry/materials are disposed when leaving the page.
A vector instrument remains visible if loading or WebGL fails.

The homepage replaces panel/card layouts with an open stage, an editorial track
list, and typographic sections. Existing project detail pages remain available.
Motion follows the device’s reduced-motion preference automatically.

Renderer reference: [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer).

## Single-page navigation

All primary content now lives at `/`: about, selected work, experience, résumé,
skills, research/writing, and contact. Project tracks expand inline; direct links
use `/#project-aegis-core`, `/#project-allmap`, and `/#project-timeline-integration`.
Legacy page URLs redirect to their corresponding anchors. The résumé expands
at `/#resume` and provides a dedicated print treatment. Navigation highlights
the current section while scrolling. The guitar scene and section motion are
continuous and reversible, with automatic reduced-motion support.

## GSAP scroll orchestration

GSAP ScrollTrigger now owns scroll progress. A scrubbed hero timeline supplies
the same progress to the Three.js instrument and hero typography, while section
triggers drive the track list and content motion. Native scrolling and CSS sticky
positioning are preserved. Triggers refresh after disclosures, font loading, and
layout changes; `gsap.context().revert()` cleans up on preference changes and unmount.

Reference: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Studio polish pass

The established recording-studio direction is retained. Hero copy names Guitar
and the backend role directly; headings use a narrower size range, metadata is
at least 12px, and disclosure controls describe their action. The Three.js guitar
and track grooves keep scroll-linked animation while reading columns remain
stationary. Unused card-layout styles and the old card component were removed.

Polish workflow: [Unslop by Damir Sokolovsky](https://heydamir.design/unslop), CC BY 4.0.

## Opening guitar animation

At the top of the page, the guitar performs a one-shot GSAP fly-in, rotation, and
zoom-out sequence, then a brief visual string strum. Scroll progress remains
composable throughout the entrance. Deep links skip the opening sequence; motion
preferences settle the model immediately. The sequence
pauses offscreen or in a hidden tab, and can be replayed with the hero control.
No audio is played automatically.

### Reload behavior

The floating motion pause control has been removed. During hydration, motion
waits until the actual device preference is known, avoiding an enabled-to-disabled
flash that could interrupt the opening guitar animation. Supported motion starts
automatically; reduced-motion users receive a settled instrument.
