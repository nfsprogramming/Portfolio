# Mohamed Nifras S S — AI Engineer & Full Stack Developer

A futuristic **AI Laboratory** portfolio — dark mode, glassmorphism,
aurora background, neural-network animation, an interactive neural-sphere
in WebGL, 3D tilt-on-hover project cards with case-study modals, animated
counter stats, a typing-effect role subtitle, a contribution heatmap,
and a smooth-scroll experience throughout.

Think **Apple × Tesla × OpenAI × Linear × Vercel × Stripe** combined —
a portfolio that feels like booting an AI operating system, not reading
a résumé.

**Stack:** Vite + React + TypeScript · React Three Fiber + drei ·
postprocessing (Bloom/Vignette/Noise) · Framer Motion · GSAP + Lenis ·
Three.js · lucide-react.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle to ./dist
npm run preview  # serve the production build locally
```

Requires `node >= 18`.

---

## Sections

| # | Section | Feature |
| --- | --- | --- |
| 00 | **Preloader** | Animated counter 0→100, "Initializing AI Lab", curtain reveal. |
| 01 | **Hero** | Large name, typing-effect role subtitle, aurora + neural-net + WebGL neural sphere with bloom, CTAs (Projects / Resume / GitHub / LinkedIn), animated counter stats. |
| 02 | **About** | Sticky photo/monogram tile with quick facts (location, education, availability), bio, mission & vision cards. |
| 03 | **Skills** | Categorized chips — AI / Full Stack / Cloud / Languages — in glass cards with brand-colored glow. |
| 04 | **Tech Stack** | 14 floating glass tech tiles with cursor parallax. |
| 05 | **Projects** | 8 real repositories as 3D tilt-on-hover cards; click → case-study modal with features, stack, and a "View on GitHub" link. |
| 06 | **Experience** | Vertical milestone timeline with gradient progress line. |
| 07 | **Certifications** | Glass tiles with brand-colored halos. |
| 08 | **GitHub Stats** | Stat cards, pinned repo cards, contribution heatmap, language usage bar, achievement badges (mock data). |
| 09 | **Currently** | Active learning goals as status-report pills. |
| 10 | **Contact** | Oversized CTA, social/CTA buttons (email/GitHub/LinkedIn/resume), footer with motto & availability. |

Plus: custom magnetic cursor, glass navbar with smooth-scroll anchors +
mobile sheet menu, fast live local clock, Lenis smooth scroll synced with
GSAP ScrollTrigger, reduced-motion fallbacks, touch fallbacks.

---

## Project structure

```
src/
  three/                 WebGL layer
    Scene.tsx            R3F Canvas, lights, bloom/vignette/noise
    FloatingModel.tsx    Neural Sphere — wireframe globe + nodes + animated
                         edge signals (the AI-lab centerpiece)
    Particles.tsx        Background starfield
  components/            DOM sections
    Loader / Cursor / Navbar / Hero / NeuralNetwork /
    About / Skills / TechStack / Projects / Experience /
    Certifications / GitHubStats / CurrentGoals / Contact /
    SectionHeading
  hooks/
    useLenis.ts          Smooth scroll + GSAP ScrollTrigger sync
    useMouse.ts          Cursor position (ref, no re-render per frame)
    useTextAnimation.ts  useTypewriter + useCountUp
  data/
    profile.ts           Single source of truth — name, contact, bio,
                         vision, mission, education, location. Edit this.
    content.ts           Stats, 8 projects, skills, techStack, experience,
                         certifications, githubStats, currentGoals
    nav.ts               Navbar anchors + socials
  styles/
    global.css           Theme tokens (AI-lab palette), fonts, primitives
    components.css        Section-scoped styles
  utils/motion.ts        Shared Framer variants + easings
```

---

## Edit your content

Almost everything is centralized. Edit these files:

### `src/data/profile.ts` — your identity & links
```ts
export const profile = {
  name: "Mohamed Nifras S S",
  role: "AI Engineer · Full Stack Developer",
  titles: [/* typed in hero, one after another */],
  tagline: "Building intelligent systems that transform ideas into real-world impact.",
  shortBio: /* shown under hero title */,
  about / about2: /* About section paragraphs */,
  vision / mission: /* About section cards */,
  location: "Tamil Nadu, India",
  education: { degree, school },
  contact: {
    email: "mohammed.nifras.000555@gmail.com",
    github: "https://github.com/nfsprogramming",
    linkedin: "https://www.linkedin.com/in/nfs-programming",
    resume: "/resume.pdf",   // drop a real resume.pdf in /public
  },
};
```

The brand string `MOHAMED NIFRAS` also appears in
`src/components/Navbar.tsx` and `src/components/Loader.tsx`.

### `src/data/content.ts` — projects, skills, stats, etc.
- `projects` — your 8 GitHub repos (each has `repo:` URL already wired)
- `stats` — numbers shown in the hero counter row
- `skillCategories` — AI / Full Stack / Cloud / Languages chips
- `techStack` — the 14 floating tech tiles
- `experience` — timeline rows
- `certifications` — certificate tiles (currently placeholder — replace
  with your real credentials)
- `githubStats` — currently mock; see note below
- `currentGoals` — what you're building right now

### Real links already wired in
- ✅ Email → `mohammed.nifras.000555@gmail.com`
- ✅ GitHub → `https://github.com/nfsprogramming`
- ✅ LinkedIn → `https://www.linkedin.com/in/nfs-programming`
- ✅ Resume → `/resume.pdf` (drop a real PDF in `public/`)
- ✅ Each project's "View on GitHub" button → its real repo URL
- ⚠️ Note: project #9 ("Apex Resume Studio") was omitted because its
  URL was duplicated with "Vision AI". Send the correct URL and I'll add it.

---

## Making the GitHub stats live

`githubStats` in `src/data/content.ts` is mock data —
the contribution heatmap, repo stars, follower count, and contribution
count are illustrative. To wire real data, either:

1. **Static** (simplest): open `content.ts`, replace the numbers and
   the `topRepos` array with values copied from your GitHub profile,
   and update `contributionGraph` from your actual contribution summary.
2. **Live via GitHub REST API**: add a `useEffect` in
   `GitHubStats.tsx` to `fetch("https://api.github.com/users/nfsprogramming")`
   for followers/repos and `GET /users/{user}/repos` for top repos.
   Unauthenticated calls are rate-limited to ~60/hr per visitor; use a
   token via a serverless function for a production site.
3. **Embedded widget**: drop `<img src="https://github-readme-stats...">`
   URLs into the section if you'd rather not maintain your own fetch.

The username is already correct: `nfsprogramming`.

---

## Swap the hero centerpiece

The hero renders the **Neural Sphere** — a procedural, wireframe globe
with glowing nodes and animated edge signals (built in
`src/three/FloatingModel.tsx`). No external assets needed.

To use a real GLTF model instead, replace the body of `FloatingModel.tsx`
with:

```tsx
import { useGLTF } from "@react-three/drei";

export default function FloatingModel({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { scene } = useGLTF("/model.glb"); // drop the file in /public
  return <primitive object={scene} />;
}
```

Bloom, particles, and aurora will keep working unchanged.

---

## Color palette

Defined in `src/styles/global.css` under `:root`:

| Token | Hex | Use |
| --- | --- | --- |
| `--bg-0` | `#050816` | page background |
| `--bg-2` | `#111827` | surface |
| `--accent-1` | `#00E5FF` | primary — cyan |
| `--accent-2` | `#7B61FF` | secondary — indigo |
| `--accent-3` | `#14F195` | accent — mint |
| `--accent-pink` | `#FF4D8D` | aurora highlights |

Fonts: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono**
(code / status / labels). Swap via the Google Fonts `<link>` in
`index.html` and the `--font-*` tokens in `global.css`.

---

## Performance & accessibility

- DPR capped at `[1, 1.8]` with `AdaptiveDpr` / `AdaptiveEvents`.
- Particles + neural sphere use a handful of instanced buffers — cheap
  draw calls, additive blending for bloom-friendly glow.
- The 2D `NeuralNetwork` canvas pauses on `prefers-reduced-motion`.
- Reduced motion disables Lenis, the custom cursor, and shortens all
  transitions to ~0ms.
- Coarse-pointer (touch) devices fall back to native scroll and skip
  cursor/tilt effects.
- Project modal scrolls independently (`data-lenis-prevent`) and traps
  the page underneath.

---

## Deploy

The build emits static files to `./dist`.

- **Vercel / Netlify**: import the repo, framework = Vite,
  build command `npm run build`, output dir `dist`.
- **GitHub Pages**: `npm run build` then publish `./dist`.
- **Cloudflare Pages**: same as Vercel.

No environment variables required.

---

## Credits

Designed and built with React 18, Vite 5, React Three Fiber 8, drei,
postprocessing, Framer Motion 11, GSAP 3, Lenis 1, lucide-react.
Sample project imagery via [picsum.photos](https://picsum.photos) —
swap each project's `image:` field in `src/data/content.ts` for your
own promo stills when ready.
