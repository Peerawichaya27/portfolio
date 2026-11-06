# tarpp.dev — Portfolio Website Implementation Plan

**Status:** Planning / Ready for implementation  
**Owner / Brand:** Peerawichaya Pholwiset — `tarpp.dev`  
**Last updated:** 2026-11-06  
**Primary objective:** Build a fast, accessible, professional personal website that showcases real software engineering experience, projects, technical writing, and publications.

## 1. Product vision

Create a portfolio that combines a **professional enterprise-engineering identity** with a **modern developer aesthetic**. The website should help recruiters assess experience quickly and help engineers explore technical decisions and project case studies in depth.

**Positioning:** Software Engineer / Backend Engineer building secure, scalable systems.

**Core themes:** Backend systems, enterprise integrations, multi-tenant architecture, cloud deployment, security-aware development.

**Target audiences:**
1. Recruiters and hiring managers looking for a concise work history, competencies, and résumé.
2. Software engineers and technical interviewers looking for system designs, trade-offs, and demonstrated implementations.
3. Potential collaborators reading blog posts, research publications, and project details.

**Primary calls to action:** View Projects; Download Résumé.  
**Secondary calls to action:** Read Blog; GitHub; LinkedIn; Email.

## 2. Source of truth and editorial rules

The uploaded résumé dated 2026-11-06 is the source of truth for initial employment, skills, education, and publication details. Use the real names, employment dates, and technologies below. Verify all public-facing links and résumé download path before launch.

- **Name:** Peerawichaya Pholwiset
- **Current role:** Developer, PTT Digital (Aug 2026–Present)
- **Previous role:** Developer, Gosoft (Thailand) (Nov 2025–Jul 2026)
- **Internship:** Intern Software Engineer, Gosoft (Thailand) (Jan 2025–May 2025)
- **Education:** B.Eng. Computer Engineering, Cloud Computing and Cybersecurity, Sirindhorn International Institute of Technology (Thammasat University), 2021–2025
- **GitHub:** https://github.com/Peerawichaya27
- **GitLab:** https://gitlab.com/Peerawichaya27
- **LinkedIn:** https://linkedin.com/in/peerawichaya
- **Email:** pprw.27@gmail.com

**Do not invent:** company metrics, percentages, completed deliverables, personal ownership of team-wide outcomes, testimonials, awards, GitHub repository URLs, screenshots, or publication DOIs.

**Confidentiality:** Employer projects are portfolio case studies, not necessarily public code repositories. Use anonymized/sanitized diagrams and only information cleared for public disclosure. Do not publish proprietary implementation details, internal hostnames, client data, secrets, security weaknesses, or screenshots without authorization. Public demo/repository buttons should appear only when real public destinations exist.

## 3. Technology decisions

| Concern | Choice | Reason |
|---|---|---|
| Framework | **Next.js App Router (React)** | React-based architecture with server rendering, static generation, routing, and metadata |
| Language | **TypeScript** | Type-safe content models and UI components |
| Styling | **Tailwind CSS** | Responsive styles and consistent design tokens |
| UI foundation | **shadcn/ui**, selectively | Accessible baseline components without overloading bundle |
| Icons | **lucide-react** | Consistent, minimal iconography |
| Motion | **Motion for React** | Lightweight, intentional entrance/hover effects |
| Theming | **next-themes** | Dark, light, and system preferences |
| Blog | **Local MDX** | Technical writing with code samples and version control |
| Content | **Typed `.ts` data + MDX** | No backend or CMS needed for v1 |
| Deployment | **Vercel** | Preview deployments, HTTPS, easy Git integration |
| Analytics | Optional, privacy-conscious Vercel Analytics | Understand top pages and engagement |

**Explicit v1 non-goals:** Custom API/server, database, authentication, comments, contact form backend, complex CMS, live dashboards, and unnecessary 3D graphics.

## 4. Information architecture

| Route | Content | Priority |
|---|---|---|
| `/` | Home: hero, expertise, featured work, experience, publications, blog preview, contact | P0 |
| `/projects` | Project index, category/technology tags | P0 |
| `/projects/[slug]` | Individual case study | P0 |
| `/resume` | Readable résumé, print/download PDF | P0 |
| `/about` | Background, approach, education, career story | P0 |
| `/blog` | Article listing | P1 |
| `/blog/[slug]` | MDX article with metadata and syntax highlighting | P1 |
| `/not-found` | Styled 404 page | P1 |

**Navigation:** Home · Projects · Experience (homepage anchor or About) · Blog · About · Résumé · theme toggle.  
**Persistent external links:** GitHub, LinkedIn, Email.

## 5. Detailed homepage blueprint

### 5.1 Sticky header
- Left: text logo `tarpp.dev` (click → `/`).
- Center/right: Projects, Experience, Blog, About, Résumé.
- Right utilities: theme toggle, GitHub, LinkedIn, contact CTA (desktop).
- Mobile: accessible menu/drawer with keyboard and screen-reader support.
- When scrolling: translucent surface and subtle border/backdrop blur.

### 5.2 Hero (above the fold)
**Eyebrow:** `Software Engineer · Backend & Cloud`  
**Headline:** `I build secure, scalable systems for real-world products.`  
**Intro:** `I'm Peerawichaya Pholwiset, a software engineer focused on backend development, enterprise integrations, and cloud-native deployment. I build APIs and reliable platforms using TypeScript, Node.js, React, PostgreSQL, Docker, and Kubernetes.`

- CTAs: **View Projects** → `/projects`; **Download Résumé** → `/resume.pdf`.
- Supporting links: GitHub, LinkedIn, Email.
- Right visual: restrained engineering-profile panel (current role, focus, technologies), not a fake terminal or misleading live metrics.
- Responsive: two columns ≥1024px, stacked on small screens.

### 5.3 Expertise (3 cards)
1. **Backend Engineering** — API design, data modeling, business workflows, NestJS/Express/Spring Boot.
2. **Cloud & Deployment** — Docker, Kubernetes, AWS, environment configuration, Bash automation.
3. **Secure Integrations** — OAuth2/OIDC, JWT, RBAC, API keys, validation, idempotency, auditing.

### 5.4 Featured work (3 cards)
**Aegis Core — Multi-Tenant Service Management Platform**  
*PTT Digital; Aug 2026–Present*  
REST APIs for tickets/tasks, SLA/OLA tracking, dashboards, reporting, tenant-scoped PostgreSQL access, enterprise/telephony integrations, Kubernetes deployment, S3-compatible storage, logging and testing.  
Tags: TypeScript, Node.js, Express, PostgreSQL, TypeORM, Docker, Kubernetes, Elasticsearch.

**AllMap — Enterprise Geospatial Analytics Platform**  
*Gosoft (Thailand); Nov 2025–Jul 2026*  
Geospatial analysis APIs, NestJS modular/hexagonal backend, PostGIS-powered location operations, React/OpenLayers map features.  
Tags: React, NestJS, TypeScript, PostgreSQL, PostGIS, OpenLayers, AWS.

**Timeline Information System & Integration Platform**  
*Gosoft (Thailand); Nov 2025–Jul 2026*  
User lifecycle and approvals, internal React admin interface, audit history, AWS Cognito OIDC, JWT, RBAC, Active Directory, enterprise information integrations and email notifications.  
Tags: React, NestJS, TypeScript, MySQL, AWS Cognito, Active Directory, Docker.

Each card links to its own case study. Show the platform/company attribution without implying the application is personally owned or open source. Only add real screenshots with clearance.

### 5.5 Experience timeline
- **PTT Digital — Developer** | Aug 2026–Present. Multi-tenant services, API integration, Kubernetes, testing and operational tooling.
- **Gosoft (Thailand) — Developer** | Nov 2025–Jul 2026. Geospatial analytics, enterprise integrations, React/NestJS platforms.
- **Gosoft (Thailand) — Intern Software Engineer** | Jan 2025–May 2025. Spring Boot backend modules, MySQL/Oracle integration, SQL optimization, AWS support and secure coding.

Use short summary and link to `/resume`. Do not repeat every résumé bullet on home.

### 5.6 Technical skills
Display accessible text chips grouped by:
- Languages: TypeScript, JavaScript, Java, Python, SQL.
- Backend: Node.js, Express.js, NestJS, Spring Boot.
- Frontend: React, Tailwind CSS, Zustand, TanStack Query.
- Databases: PostgreSQL, PostGIS, MySQL.
- Cloud & DevOps: Docker, Kubernetes, Bash, GitLab, Elasticsearch, AWS.
- Testing/API: Jest, Mocha, Postman, OpenAPI, Zod.

No unsupported proficiency bars or numeric skill ratings.

### 5.7 Publications
1. **FPRESSO: Fast and Privacy-Preserving SSO Authentication With Dynamic Load Balancing for Multi-Cloud-Based Web Applications** — *IEEE Access, 2024*.
2. **A Verifiable and Secure E-Transcript System Using Self-Sovereign Identity and Blockchain** — *KST, 2025*.

Display venue/year and only link to verified publication URLs when available.

### 5.8 Blog preview
Show 2–3 **published** articles with category, date, read-time estimate, and title. Initial editorial ideas (not yet written/published):
- Designing Multi-Tenant APIs: Lessons from Enterprise Systems.
- Deploying Backend Services with Docker and Kubernetes.
- Building Secure Integrations with OAuth2, JWT and Idempotency.

If no articles are published, use a tasteful “Writing coming soon” state rather than pretend the articles exist.

### 5.9 Contact and footer
**Heading:** `Let's build something useful.`  
**Copy:** `Open to engineering opportunities and conversations about backend systems, cloud platforms, and secure software design.`
- Email: `mailto:pprw.27@gmail.com`.
- LinkedIn: `https://linkedin.com/in/peerawichaya`.
- Footer: `© {current year} tarpp.dev`, GitHub, GitLab, LinkedIn, résumé.
- Avoid displaying telephone number by default for public privacy; it may remain in the downloadable résumé if intended.

## 6. Project case study specification

Use this repeatable template for `/projects/[slug]`:
1. Title, employer attribution, role, date range, approved tech stack.
2. Context and user/business problem (public-safe summary).
3. Responsibility and scope — clear distinction between personal and team work.
4. High-level architecture — sanitized custom diagrams.
5. Selected engineering decisions — tradeoffs and rationale.
6. Technical implementation — 3–6 verified highlights.
7. Testing, reliability, performance, security considerations.
8. Outcomes and learnings — qualitative where metrics are unavailable.
9. Public external links only if verified and authorized.

**Suggested slugs:** `aegis-core`, `allmap`, `timeline-integration`.

## 7. Visual design system

**Direction:** Dark-first hybrid minimalist; enterprise credibility with restrained developer details. No exaggerated neon, unnecessary animation, or clutter.

### Color tokens
| Token | Dark | Light |
|---|---|---|
| Background | `#0B1120` | `#F8FAFC` |
| Surface | `#151F30` | `#FFFFFF` |
| Subtle surface | `#1C293B` | `#EEF3F7` |
| Border | `#2A374B` | `#DCE4EA` |
| Text | `#F1F5F9` | `#0F172A` |
| Muted | `#94A3B8` | `#526277` |
| Accent | `#38D9C5` | `#087F75` |

**Accessibility:** Check actual contrast ratios for all combinations (including text on accent buttons), ensure keyboard focus states and visible link affordances.

### Typography
- Headings/body: **Geist Sans** (fallback: Inter, system sans).
- Small technical labels: **Geist Mono**.
- Hero: fluid `clamp(2.5rem, 6vw, 5rem)`.
- Section heading: fluid `clamp(1.75rem, 3vw, 2.75rem)`.
- Body: 16–18px; line-height ~1.6; ideal reading width ~65–75 characters.

### Spacing and layout
- Content max width: 1200px; reading/article width: ~760px.
- Desktop grid: 12 columns; mobile: single column with optional 2-column chips.
- Horizontal padding: 20–24px mobile; 32–48px desktop.
- Section vertical spacing: 64px mobile; 96–120px desktop.
- Card radius: 12–16px; buttons: 8–10px.

### Motion
- Hero reveal: opacity + slight vertical translation (about 400–600ms).
- Card hover: subtle border/translation, no aggressive glows.
- Section reveals: once, modest distance (~12–20px).
- Theme transitions: smooth color changes with no flash of incorrect theme.
- Respect `prefers-reduced-motion`; keep interactions usable with motion disabled.

## 8. Component and file architecture

```text
tarpp-portfolio/
├── public/
│   ├── images/projects/
│   ├── resume.pdf
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/{header,footer,mobile-nav,theme-toggle}.tsx
│   │   ├── home/{hero,expertise,featured-projects,experience,skills,publications,blog-preview,contact}.tsx
│   │   ├── projects/{project-card,project-detail}.tsx
│   │   ├── blog/{post-card,mdx-components}.tsx
│   │   └── ui/...
│   ├── content/
│   │   └── blog/*.mdx
│   ├── data/{site,experience,skills,projects,publications}.ts
│   ├── lib/{mdx,utils}.ts
│   └── types/{project,post}.ts
├── package.json
├── next.config.ts
└── README.md
```

**Implementation principles:**
- Prefer server components; use client components only for interactivity (theme toggle, mobile menu, animations, filters).
- Use semantic HTML and optimized Next.js image/font handling.
- Keep data in typed objects; do not hardcode the same project details in multiple pages.
- Use static generation for case studies/blog where practical.
- Add structured metadata and Open Graph images for homepage, projects, and posts.
- Keep public résumé at `public/resume.pdf` and make the page accessible without downloading.

### Suggested TypeScript data contracts

```ts
type Project = {
  slug: string;
  title: string;
  organization?: string;
  role?: string;
  period?: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  category: 'Backend' | 'Full-stack' | 'Cloud' | 'Research';
  featured: boolean;
  image?: string; // Only approved/public-safe asset
  repositoryUrl?: string; // Only verified & approved
  demoUrl?: string; // Only verified & approved
};

type BlogPostMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string; // YYYY-MM-DD
  tags: string[];
  draft?: boolean;
};
```

## 9. Implementation phases and tasks

### Phase 0 — Content and safety audit
- [ ] Confirm preferred public display name: `Peerawichaya Pholwiset` and brand `tarpp.dev`.
- [ ] Review employer-project descriptions for publication permissions.
- [ ] Confirm domain registration/ownership and actual social URLs.
- [ ] Prepare publishable `resume.pdf` (remove private details if desired).
- [ ] Obtain approved project visuals or prepare sanitized original diagrams.

**Done when:** Public content is accurate, approved, and ready to use.

### Phase 1 — Foundation and design system
- [ ] Initialize Next.js App Router project with TypeScript and Tailwind.
- [ ] Add fonts, icons, semantic color tokens, light/dark/system themes.
- [ ] Configure shadcn/ui components selectively.
- [ ] Build responsive site container, header, footer, theme toggle, mobile nav.
- [ ] Set site metadata and global accessibility defaults.

**Done when:** Shared shell works across mobile and desktop with persistent theme selection and no hydration/theme flash.

### Phase 2 — Homepage
- [ ] Build hero with verified intro and working CTAs.
- [ ] Build expertise and featured project cards.
- [ ] Build experience timeline and categorized skill groups.
- [ ] Build publications and blog preview/empty state.
- [ ] Build contact section and footer links.
- [ ] Add restrained animations with reduced-motion support.

**Done when:** Complete homepage works at common mobile/tablet/desktop sizes without overflow or fake links.

### Phase 3 — Project and résumé pages
- [ ] Create typed project data and project listing.
- [ ] Implement dynamic case-study route and static metadata.
- [ ] Author 3 accurate, publication-safe case studies.
- [ ] Create web résumé page and PDF download.
- [ ] Create About page using résumé-confirmed facts.

**Done when:** Every project route renders correctly, has accessible content, and links are verified.

### Phase 4 — Blog
- [ ] Configure MDX and code syntax highlighting.
- [ ] Implement blog index, post pages, publication date, tags, reading time.
- [ ] Write and review 2 original technical posts.
- [ ] Keep drafts hidden from production indices and metadata.
- [ ] Add article-specific metadata and social sharing previews.

**Done when:** Two public posts load from directly navigable URLs and render well on mobile.

### Phase 5 — QA, SEO, deployment
- [ ] Validate responsive layout at ~360, 768, 1024, and 1440px.
- [ ] Test accessibility: keyboard, screen reader labels, focus, contrast, reduced motion.
- [ ] Check images and fonts, lazy loading, and page performance.
- [ ] Confirm metadata, `robots.txt`, sitemap and canonical URLs.
- [ ] Check PDF download, all CTAs, external links and 404 handling.
- [ ] Check for sensitive/proprietary information and dependency issues.
- [ ] Publish from GitHub to Vercel; test preview and production.
- [ ] Configure custom domain + HTTPS and verify canonical redirects.
- [ ] Optionally add privacy-conscious analytics.

**Done when:** Site is live, working, accessible, and safe to share with recruiters.

## 10. Delivery order / releases

### MVP v1.0 (launch first)
- Home, About, Projects, 3 case studies, Résumé, contact, dark/light/system theme, responsive layout, core metadata.
- Blog route can show an honest empty state if articles aren't ready.

### v1.1
- Full MDX blog with 2 articles, enhanced social previews, refined scroll animations.

### v1.2 (optional)
- Project filtering/search, richer approved diagrams, RSS, additional writings, ongoing content improvements.

## 11. Definition of done

- [ ] Homepage immediately communicates role, core strengths, and proof of work.
- [ ] Facts match the supplied résumé; no fabricated outcomes or links.
- [ ] Project case studies explain context, contribution, technical decisions, and learnings.
- [ ] All pages render on mobile and desktop with no horizontal overflow.
- [ ] Dark/light/system theme works without flashing.
- [ ] No animation prevents reading or violates reduced-motion preference.
- [ ] Navigation, keyboard focus, alt text, and contrast are usable.
- [ ] Resume PDF opens/downloads; contact/social links work.
- [ ] Unique page titles/descriptions, sitemap, robots, and Open Graph image exist.
- [ ] Run production build, lint/type checks, and accessibility/performance checks.
- [ ] Target Lighthouse scores of 90+ for Performance, Accessibility, and SEO on key public pages; diagnose any misses rather than treating the target as a guarantee.
- [ ] Confidential information review completed before launch.

## 12. Immediate first implementation sprint

1. Scaffold Next.js + TypeScript + Tailwind.
2. Add brand design tokens, Geist fonts, and `next-themes`.
3. Create `src/data/site.ts`, `experience.ts`, `projects.ts`, `skills.ts`, and `publications.ts` using the résumé.
4. Build header, hero, two reusable CTA buttons, and project card component.
5. Complete homepage sections with verified data.
6. Run locally, review at mobile and desktop sizes, then create first Git commit.

**First deliverable:** A responsive, polished homepage for `tarpp.dev` that reflects real experience and is ready for review, before deeper project pages and blog work begin.
