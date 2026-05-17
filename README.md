<div align="center">

# 🌌 Sachin verma— Dev Portfolio

### *A high-performance, data-driven developer portfolio powered by live API integrations, immersive animations, and a modern React stack.*

<br/>

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0D1117)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=0D1117)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=646CFF&labelColor=0D1117)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=0D1117)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=FF0055&labelColor=0D1117)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-2.0-3ECF8E?style=for-the-badge&logo=supabase&logoColor=3ECF8E&labelColor=0D1117)](https://supabase.com/)

<br/>

[![GitHub Stars](https://img.shields.io/github/stars/sangamsingh18/sangam.ai?style=social)](https://github.com/sangamsingh18)
[![LinkedIn](https://img.shields.io/badge/Connect-sangam--singh-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/sangam-singh-94a52633b)
[![Portfolio Live](https://img.shields.io/badge/🚀_Live_Portfolio-Visit-8B5CF6?style=flat)](https://github.com/sangamsingh18)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🧱 Architecture Overview](#-architecture-overview)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔌 Live API Integrations](#-live-api-integrations)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration](#️-configuration)
- [📐 Component Breakdown](#-component-breakdown)
- [🎨 Design System](#-design-system)
- [📦 Scripts Reference](#-scripts-reference)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 Live Data Integrations
- **GitHub API** — Real-time repos, stars, forks, and contribution heatmap
- **LeetCode API** — DSA stats with difficulty breakdown
- **Codolio API** — Activity feed, awards & competitive programming metrics
- **Vite Proxy** — Bypasses CORS for seamless third-party data fetching

</td>
<td width="50%">

### 🎬 Premium Animations
- **Framer Motion** — Scroll-triggered reveals, stagger effects, spring physics
- **3D Flip Cards** — Projects & Certifications with CSS `rotateY` perspective
- **Typewriter Effect** — Animated role carousel via `react-type-animation`
- **Floating Badges** — Levitating stat badges with infinite `y`-oscillation

</td>
</tr>
<tr>
<td>

### 🌑 Immersive Hero Experience
- **Black Hole WebM** — Looping cinematic background video
- **Mask Gradient** — CSS radial masks for seamless video fade
- **Glowing Avatar Ring** — Dual rotating orbital rings with avatar glow
- **Scroll Indicator** — Animated mouse scroll prompt

</td>
<td>

### 📐 UI/UX Excellence
- **Glassmorphism Cards** — Backdrop-blur floating card components
- **Dark Theme** — Deep `#020005` space-black design language
- **Fully Responsive** — Mobile-first, tested across all breakpoints
- **WhatsApp CTA** — Contact form pre-fills a WhatsApp deep-link message

</td>
</tr>
</table>

---

## 🧱 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                        │
│                                                              │
│  ┌──────────┐    ┌─────────────────┐    ┌───────────────┐   │
│  │  React   │───▶│  React Router   │───▶│  Page: Index  │   │
│  │  v18.3   │    │  (SPA Routing)  │    │  / NotFound   │   │
│  └──────────┘    └─────────────────┘    └───────┬───────┘   │
│                                                  │           │
│           ┌──────────────────────────────────────┘           │
│           ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Component Layer (src/components)       │    │
│  │  Navbar  HeroSection  AboutSection  SkillsSection   │    │
│  │  ExperienceSection  ProjectsSection  GitHubSection  │    │
│  │  CertificationsSection  AchievementsSection         │    │
│  │  CodolioAwardsSection   CodolioActivitySection      │    │
│  │  ContactSection  Footer  AnimatedBackground         │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│  ┌──────────────────▼──────────────────────────────────┐    │
│  │                  API / Data Layer                    │    │
│  │  githubApi.ts │ leetcodeApi.ts │ codolioApi.ts       │    │
│  │  TanStack Query (caching & async state management)  │    │
│  └───────┬──────────────────────┬──────────────────────┘    │
│          │                      │                            │
└──────────┼──────────────────────┼────────────────────────────
           │                      │
  ┌────────▼────────┐   ┌─────────▼─────────┐
  │   GitHub API    │   │  Codolio / Vite    │
  │   api.github    │   │  Proxy for CORS   │
  │   ungh.cc (fb)  │   │  + Supabase DB    │
  └─────────────────┘   └───────────────────┘
```

---

## 🛠 Tech Stack

### 🎯 Core Framework

| Technology | Version | Purpose |
|:---:|:---:|:---|
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat) | `18.3.1` | UI library with hooks & concurrent features |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat) | `5.8.3` | Static typing, interfaces & advanced generics |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat) | `5.4.19` | Next-gen build tool with HMR & SWC compiler |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white&style=flat) | `6.30.1` | Client-side SPA routing |

### 🎨 Styling & UI

| Technology | Version | Purpose |
|:---:|:---:|:---|
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=flat) | `3.4.17` | Utility-first responsive styling |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?logo=radixui&logoColor=white&style=flat) | `*` | Accessible headless UI primitives |
| ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?logo=lucide&logoColor=white&style=flat) | `0.462.0` | Crisp open-source icon system |
| `shadcn/ui` | — | Pre-built component library on top of Radix UI |
| `class-variance-authority` | `0.7.1` | Variant-based component class management |

### 🎬 Animation & Motion

| Technology | Version | Purpose |
|:---:|:---:|:---|
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-FF0055?logo=framer&logoColor=white&style=flat) | `12.25.0` | Physics-based animations, scroll triggers, transitions |
| `react-type-animation` | `3.2.0` | Typewriter text animation |
| `embla-carousel-react` | `8.6.0` | Touch-friendly carousel component |
| `tailwindcss-animate` | `1.0.7` | CSS keyframe animation utilities |

### 🔌 Data & State Management

| Technology | Version | Purpose |
|:---:|:---:|:---|
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white&style=flat) | `5.83.0` | Server state, caching & async data management |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=black&style=flat) | `2.90.1` | Backend as a Service — DB & Auth |
| `react-hook-form` | `7.61.1` | Performant form state management |
| `zod` | `3.25.76` | Runtime schema validation & type inference |

### 📊 Data Visualization

| Technology | Version | Purpose |
|:---:|:---:|:---|
| ![Recharts](https://img.shields.io/badge/Recharts-8884d8?logo=chart.js&logoColor=white&style=flat) | `2.15.4` | Declarative chart library for React |
| `date-fns` | `3.6.0` | Lightweight date manipulation utilities |

---

## 📁 Project Structure

```
sangam.ai_main/
│
├── 📁 public/
│   ├── favicon.svg               # Site favicon
│   ├── hero_avatar.jpeg          # Profile photo
│   ├── placeholder.svg           # Fallback image
│   ├── robots.txt                # SEO robots directive
│   └── 📁 video/
│       └── blackhole.webm        # Hero background cinematic video
│
├── 📁 src/
│   ├── App.tsx                   # Root: Router + QueryClient + Providers
│   ├── main.tsx                  # ReactDOM render entrypoint
│   ├── index.css                 # Global styles, CSS variables, animations
│   ├── App.css                   # App-level scoped styles
│   ├── vite-env.d.ts             # Vite type declarations
│   │
│   ├── 📁 pages/
│   │   ├── Index.tsx             # Main page — assembles all sections
│   │   └── NotFound.tsx          # 404 page
│   │
│   ├── 📁 components/           # Feature components
│   │   ├── AnimatedBackground.tsx
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx       # Hero + video + floating badges
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx   # 3D flip card carousel
│   │   ├── GitHubSection.tsx     # Live GitHub stats + heatmap
│   │   ├── CertificationsSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── CodolioAwardsSection.tsx
│   │   ├── CodolioActivitySection.tsx
│   │   ├── LeetCodeHeatmap.tsx
│   │   ├── ContactSection.tsx    # WhatsApp deep-link contact form
│   │   ├── Footer.tsx
│   │   ├── NavLink.tsx
│   │   └── 📁 ui/               # shadcn/ui component library (40+ components)
│   │       └── ...
│   │
│   ├── 📁 lib/                  # API service classes
│   │   ├── githubApi.ts          # GitHub REST API + fallback via ungh.cc
│   │   ├── leetcodeApi.ts        # LeetCode stats scraper / API
│   │   ├── codolioApi.ts         # Codolio activity + awards API
│   │   └── utils.ts              # Tailwind merge + shared helpers
│   │
│   ├── 📁 config/
│   │   └── usernames.ts          # Central config: GitHub, LeetCode, Codolio, LinkedIn
│   │
│   ├── 📁 hooks/
│   │   ├── use-mobile.tsx        # Responsive breakpoint detection hook
│   │   └── use-toast.ts          # Toast notification hook
│   │
│   └── 📁 integrations/
│       └── 📁 supabase/
│           ├── client.ts         # Supabase client initialization
│           └── types.ts          # Auto-generated DB type definitions
│
├── 📁 supabase/
│   └── config.toml               # Supabase local dev configuration
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🔌 Live API Integrations

### 🐙 GitHub API
The `GitHubApiService` class (`src/lib/githubApi.ts`) provides resilient data fetching with a **primary → fallback** strategy:

```
Primary:  api.github.com  →  REST API (profile, repos, contributions)
Fallback: ungh.cc         →  Public GitHub mirror (rate-limit bypass)
Heatmap:  github-contributions-api.deno.dev  →  Contribution grid data
```

**Data Fetched:** Profile info • Public repositories (non-fork) • Total stars & forks • Yearly contribution heatmap

---

### 🧠 LeetCode Integration
Fetches DSA performance stats including:
- Total problems solved (Easy / Medium / Hard)
- Acceptance rate & ranking
- Submission heatmap calendar

---

### 🏆 Codolio Integration
Via **Vite dev proxy** to bypass CORS:
- Platform-wide problem count aggregation
- Competitive programming awards
- Activity feed display

```ts
// src/config/usernames.ts — Single source of truth
export const USERNAMES = {
  github:   'sangamsingh18',
  leetcode: 'sangamsingh18',
  codolio:  'sangamsingh18',
  linkedin: 'sangam-singh-94a52633b'
} as const;
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node  >= 18.0.0
npm   >= 9.0.0
```

### 1. Clone the Repository

```bash
git clone https://github.com/sangamsingh18/sangam.ai.git
cd sangam.ai/sangam.ai_main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment (Optional)

If you want to use Supabase features, create a `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser. Hot Module Replacement (HMR) is enabled by default.

### 5. Build for Production

```bash
npm run build
```

Output is placed in the `dist/` directory, ready for static hosting (Vercel, Netlify, GitHub Pages, etc).

### 6. Preview Production Build Locally

```bash
npm run preview
```

---

## ⚙️ Configuration

### 🔑 Personalizing for Your Own Profile

All platform usernames are centralized in a single config file:

```ts
// src/config/usernames.ts
export const USERNAMES = {
  github:   'YOUR_GITHUB_USERNAME',
  leetcode: 'YOUR_LEETCODE_USERNAME',
  codolio:  'YOUR_CODOLIO_USERNAME',
  linkedin: 'YOUR_LINKEDIN_PROFILE_ID'
} as const;
```

> ⚠️ Changing usernames here automatically updates **all** API calls, links, and data-fetching hooks across the entire application.

### 🎨 Theme & Color Tokens

Design tokens are defined in `src/index.css` using CSS custom properties:

```css
:root {
  --primary:    8B5CF6;   /* Violet — brand accent */
  --secondary:  D946EF;   /* Fuchsia — secondary accent */
  --background: 020005;   /* Deep space black */
  --foreground: FAFAFA;   /* Near-white text */
  --card:       glass;    /* Glassmorphism card surface */
}
```

---

## 📐 Component Breakdown

| Component | Description | Key Technologies |
|:---|:---|:---|
| `AnimatedBackground` | Floating particle mesh behind all sections | CSS animations, Canvas |
| `HeroSection` | Full-screen hero with video, avatar, live badges | Framer Motion, TypeAnimation, WebM video |
| `AboutSection` | Personal bio and quick stat highlights | Framer Motion scroll reveal |
| `SkillsSection` | Infinite scrolling skills marquee | CSS keyframes, Tailwind |
| `ExperienceSection` | Timeline of work/internship experience | Framer Motion stagger |
| `ProjectsSection` | 3D flip card carousel with project details | Embla Carousel, Framer 3D |
| `GitHubSection` | Live GitHub profile + contribution heatmap | GitHubApiService, TanStack Query |
| `LeetCodeHeatmap` | Submission calendar from LeetCode | Recharts, custom heatmap |
| `CertificationsSection` | Auto-advancing card carousel | Embla Carousel, 3D flip |
| `AchievementsSection` | Competitive programming awards feed | Framer Motion |
| `CodolioAwardsSection` | Codolio platform recognition badges | codolioApi.ts |
| `CodolioActivitySection` | Recent coding activity aggregator | Vite Proxy, TanStack Query |
| `ContactSection` | WhatsApp-linked contact form | react-hook-form, Zod |
| `Footer` | Social links, copyright | Lucide icons |

---

## 🎨 Design System

### Color Palette

```
Primary   ████  #8B5CF6  — Violet
Secondary ████  #D946EF  — Fuchsia / Pink
Base      ████  #020005  — Deep Space Black
Surface   ████  #0D0010  — Card background
Muted     ████  #6B7280  — Secondary text
```

### Typography

| Role | Font | Weight |
|:---|:---|:---|
| Display / Headings | Inter / system-ui | 700, 600 |
| Body | Inter | 400, 500 |
| Mono (code) | JetBrains Mono | 400 |

### Animation Principles

- **Entrance**: `opacity: 0 → 1` + `y: 20 → 0` with staggered delays
- **Hover**: `scale(1.05)` + glow shadow intensification
- **Continuous**: Infinite `y` oscillation (`-12px → 0 → -12px`) for floating elements
- **Rotation**: Dual counter-rotating orbital rings at 20s / 15s duration

---

## 📦 Scripts Reference

```bash
npm run dev          # Start dev server with HMR (localhost:8080)
npm run build        # Production build → dist/
npm run build:dev    # Development-mode production build
npm run preview      # Serve production build locally
npm run lint         # ESLint with TypeScript-aware rules
```

---

## 🤝 Contributing

Contributions, improvements, and feedback are welcome!

1. **Fork** this repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is open source and available under the **MIT License**.

---

<div align="center">

### 🌌 Built with passion by **Sachin Verma**

*Data Scientist • ML Engineer • Full Stack Developer • AI/ML Enthusiast*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-sangamsingh18-181717?style=for-the-badge&logo=github)](https://github.com/sangamsingh18)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sangam_Singh-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sangam-singh-94a52633b)

<br/>

*"Building intelligent systems that make a positive impact on society."*

⭐ **Star this repo if you found it useful!**

</div>
