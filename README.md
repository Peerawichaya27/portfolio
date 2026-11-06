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

Near-black engineering-document styling, Geist Sans and Geist Mono, quiet rules,
and numbered work references. The career overview uses supplied facts; project
diagrams are conceptual summaries rather than proprietary architecture. Motion
is limited to one hero entrance and brief interaction feedback, with reduced-motion support.

Design review workflow: [Unslop](https://heydamir.design/unslop), created by
[Damir Sokolovsky (@heydamir)](https://x.com/heydamir), licensed under CC BY 4.0.
