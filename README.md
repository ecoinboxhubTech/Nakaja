# NAKAJAH Care Foundation

> **Safe spaces, stronger children, brighter futures.**

This repository contains the complete website for **Nakajah Care Foundation (NAKAJAH)**, a Nigerian non-profit that creates safe, nurturing spaces where children, women and young people are heard, protected, mentored, educated and empowered.

It is more than a brochure site. Alongside the public pages it includes an **AI assistant** that answers visitors' questions, a **contact form with automated email handling**, and a **safeguarding filter** that makes sure messages describing abuse, self-harm or danger are always handled by a human and never by the AI.

---

## Table of contents

1. [What is NAKAJAH?](#1-what-is-nakajah)
2. [What the website does](#2-what-the-website-does)
3. [Safeguarding: how the system protects vulnerable users](#3-safeguarding-how-the-system-protects-vulnerable-users)
4. [Project structure](#4-project-structure)
5. [Tech stack](#5-tech-stack)
6. [Getting started](#6-getting-started)
7. [Configuration (environment variables)](#7-configuration-environment-variables)
8. [Deployment](#10-deployment)
9. [Security and privacy notes](#11-security-and-privacy-notes)
10. [Troubleshooting](#12-troubleshooting)

---

## 1. What is NAKAJAH?

NAKAJAH Care Foundation is a child-protection and youth-empowerment organisation based in Nigeria, working across communities in Africa. Its approach is built on the idea that **nobody should have to guess their way through growing up**: every young person deserves a trusted adult, accurate information and a safe place to ask questions.

**Mission.** To create safe and nurturing spaces where children, women and young people are heard, protected, mentored, educated and empowered with the knowledge, opportunities and confidence to thrive. Through mentorship, advocacy, education, protection and sustainable empowerment, NAKAJAH works to prevent violence, promote equality and ensure no one is left behind.

**Vision.** A beacon of hope where every child is protected, every woman is empowered, every young person is equipped to succeed, and every community is inspired to build a future free from violence, inequality and poverty.

**Founder.** Dr. Lilian Odinakachi Onyeizu, PhD: a Gender and Development consultant, author and mentor with more than ten years of experience across Africa. She is the author of the book *I Know Me. I Lead Me. I Choose Well.: A Girl's Guide to Identity, Self-Leadership, Healthy Choices, Relationships, and Purpose.*

### Who NAKAJAH serves

Children, adolescents, young people and women across Nigeria and the wider African region, with parents, schools and community leaders as partners.

### The six programmes

| # | Programme | What it involves |
|---|---|---|
| 1 | **Mentorship & personal development** | One-to-one and group mentorship: monthly mentor circles, goal-setting, confidence workshops. |
| 2 | **SRHR & life skills** | Age-appropriate education on sexual and reproductive health and rights, consent, relationships and informed decision-making: puberty and health talks, consent education, safe-choices sessions. |
| 3 | **Community engagement & empowerment** | Working with families, schools and community leaders: parent forums, school partnerships, leader dialogues. |
| 4 | **Education & scholarships** | Keeping girls and boys in school: school kits, tuition support, retention follow-up. |
| 5 | **GBV prevention & child protection** | Teaching boundaries and safe reporting and building protection systems: safeguarding training, reporting pathways, safe-space clubs. |
| 6 | **Support for girls and boys** | Inclusive spaces where every young person is seen and heard: peer clubs, leadership training, career exposure. |

### The NAKAJAH values

The name doubles as an acronym for the organisation's seven values:

| Letter | Value | Meaning |
|---|---|---|
| **N** | Nurture Identity | Helping children discover their worth and their voice. |
| **A** | Aspire with Purpose | Encouraging dreams, education and intentional living. |
| **K** | Keep Safe | Teaching child protection, healthy relationships, consent and boundaries in age-appropriate ways. |
| **A** | Acquire Skills | Building leadership, communication, financial literacy and practical life skills. |
| **J** | Journey with Mentors | Connecting young people with trusted adults who guide and encourage them. |
| **A** | Advance and Serve | Equipping young people to become leaders who positively impact others. |
| **H** | Hope and Transformation | Helping individuals rise above limiting circumstances, embrace possibilities and become agents of positive change. |

### Impact figures (as published on the website)

- 1,000+ young people mentored
- 5,000 girls reached with health and life-skills education
- 500+ students supported
- 300+ women empowered
- 200+ youth helped into work

### How NAKAJAH works: Listen, Protect, Mentor, Equip, Launch

1. **Listen**: start by hearing young people, parents and teachers so every programme answers a real need.
2. **Protect**: safe spaces, clear boundaries and trusted reporting channels come before anything else.
3. **Mentor**: each young person is matched with a trusted adult who walks with them month after month.
4. **Equip**: leadership, money skills, health knowledge and education support turn confidence into capability.
5. **Launch**: graduates move into school, work and service, and become mentors for the next cohort.

### Ways people can get involved

- **Partner with us**: organisations, schools and funders co-design programmes.
- **Volunteer as a mentor**: a few hours a month, with training and safeguarding support provided. Remote volunteering is open to people anywhere in the world.
- **Sponsor a girl's education**: covers school materials, tuition support and mentorship for a year.
- **Invite NAKAJAH to your school**: SRHR, life-skills and child-protection sessions for students.

**Contact:** hello@nakajahcare.org (replies within 24 hours). In an emergency, contact local emergency services first (**112 in Nigeria**).

---

## 2. What the website does

The site is a single, animated, mobile-friendly page with these sections: Home (hero), What We Do, Impact stats, About, the five-step Journey, Values, Founder, the founder's Book, Ways to Get Involved, FAQ, a call to action and Contact.

### Public features

- **Single-page marketing site** with scroll-spy navigation, smooth animations (which respect the visitor's "reduce motion" setting) and a responsive layout.
- **"Get support" panel**: a confidential help panel for young people, parents and teachers, with an emergency reminder (112) and ways to reach the team.
- **NAKAJAH Assistant (AI chat widget)**: a floating chat window that answers questions about programmes, volunteering, sponsorship, partnerships and safeguarding. It answers **only from a fixed knowledge base** (`backend/knowledge.js`), so it does not invent facts, phone numbers or promises.
- **Contact form**: visitors pick why they are writing (partner, volunteer, sponsor, invite us to a school, get support, other). They receive an instant confirmation email and the team receives the message plus an AI-drafted reply.
- **Email fallback**: if the backend is unreachable, the contact form opens the visitor's own email app with the message pre-filled so nothing is lost.
- **SEO and sharing**: the production build is **pre-rendered** to static HTML so search engines and link previews (Google, Bing, WhatsApp, Facebook, LinkedIn) see real content without running JavaScript. It includes structured data (schema.org NGO, Person, Book, FAQ), Open Graph and Twitter cards, a sitemap, `robots.txt` and a web manifest.

### Behind the scenes

- **AI email drafting**: every contact-form message gets an AI-written suggested reply, sent to staff for review (default) or sent straight to the sender for routine enquiries (optional "auto" mode).
- **Inbound email webhook**: your email provider can forward incoming emails to the backend, which drafts (or sends) replies the same way.
- **Rate limiting and abuse protection**: per-visitor limits on chat, contact and inbound email, a hidden honeypot field on the form, request-size limits and reply-loop protection for auto-responders.
- **Mock mode**: with no API keys configured, everything still works. The chat answers from a built-in FAQ and "sent" emails are written to `backend/outbox.log` instead of being delivered. This makes local development and testing safe.

---

## 3. Safeguarding: how the system protects vulnerable users

Because NAKAJAH works with children and survivors of violence, the software is deliberately conservative:

- **A keyword safety filter** (`backend/safety.js`) scans chat messages and contact-form messages for signs of abuse, sexual violence, bullying, self-harm or suicide, trafficking, forced or child marriage, pregnancy-related crisis, running away, and general danger.
- **Flagged chat messages are never sent to the AI.** The visitor instead receives a fixed, compassionate reply that points them to emergency services (112 in Nigeria), a trusted adult and the contact form.
- **Flagged form or email messages are never auto-answered.** The sender gets an acknowledgement with the emergency note, and the team receives an email titled **`[URGENT - SAFEGUARDING]`** with no AI draft, asking staff to follow the child protection procedure and reply personally.
- **The AI is restricted by design**: it must not give medical, legal or counselling advice, must not ask children for identifying details, must not claim to be human and must refuse instructions hidden inside user text.
- **Failing safe**: a false alarm only means a human handles the message, which is the correct failure mode for a child-protection organisation.

> **Important:** the keyword filter is a safety net, **not a guarantee**. It must not be the only safeguarding measure. Staff should monitor the inbox and follow the organisation's child protection policy.

---

## 4. Project structure

```
nakajah/
├── README.md
├── .gitignore
├── frontend/                  # The website (React single-page app)
│   ├── index.html             # HTML shell, SEO meta tags, structured data
│   ├── package.json
│   ├── vite.config.js         # Vite config; proxies /api to the backend in dev
│   ├── tailwind.config.js     # Brand colours, fonts, shadows
│   ├── postcss.config.js
│   ├── public/                # Static files copied as-is (logo, icons, photos,
│   │   └── img/               #   og-image, robots.txt, sitemap.xml, manifest)
│   ├── scripts/
│   │   └── prerender.mjs      # Bakes the rendered page into dist/index.html
│   └── src/
│       ├── main.jsx           # Browser entry (hydrates the pre-rendered page)
│       ├── entry-server.jsx   # Server-side render entry used by the prerender step
│       ├── App.jsx            # Page layout and scroll-spy
│       ├── sections.jsx       # All page sections incl. the contact form
│       ├── data.js            # Website copy: programmes, stats, values, FAQ...
│       ├── index.css          # Tailwind layers and custom styles
│       └── components/
│           ├── Shell.jsx      # Header, footer, logo, icons, "Get support" panel
│           ├── Chat.jsx       # AI chat widget
│           └── motion.jsx     # Animation helpers
└── backend/                   # Node server (API + serves the built site)
    ├── index.js               # HTTP server and routes
    ├── ai.js                  # AI assistant and email drafting (Groq API)
    ├── safety.js              # Safeguarding filter, rate limiter, input helpers
    ├── mail.js                # Email sending (Resend) with mock mode
    ├── knowledge.js           # Facts the AI is allowed to use
    ├── package.json
    └── .env.example           # Template for your secrets/config
```

---

## 5. Tech stack

| Part | Technology |
|---|---|
| Frontend | React 18, Vite 5, Tailwind CSS 3, Framer Motion |
| Rendering | Static pre-rendering (React server rendering at build time, hydrated in the browser) |
| Backend | Plain Node.js (built-in `http`, `fetch`, `zlib`); **no third-party dependencies** |
| AI | [Groq](https://console.groq.com) chat completions (default model `openai/gpt-oss-120b`) |
| Email | [Resend](https://resend.com) |
| Fonts / icons | Plus Jakarta Sans and Material Symbols Rounded (Google Fonts) |

**Requirements:** Node.js **20.18 or newer** (22 LTS recommended) and npm.

---

## 6. Getting started

### 6.1 Install the frontend

```bash
cd frontend
npm install
```

The backend has no dependencies, so it needs no install step.

### 6.2 Configure the backend

```bash
cd backend
cp .env.example .env
# open .env and fill in your keys (optional for local testing)
```

You can skip the keys to try the project in mock mode.

### 6.3 Run in development (two terminals)

```bash
# Terminal 1: backend API on http://localhost:8787
cd backend
npm run dev

# Terminal 2: frontend with hot reload on http://localhost:5173
cd frontend
npm run dev
```

The Vite dev server automatically forwards `/api/*` requests to the backend on port 8787, so the chat widget and contact form work in development.

### 6.4 Run as in production (single server)

```bash
cd frontend
npm run build        # creates frontend/dist, pre-rendered for SEO

cd ../backend
npm start            # serves the site and the API on http://localhost:8787
```

Open <http://localhost:8787> and check <http://localhost:8787/api/health>.

### Frontend scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot reload. |
| `npm run build` | Builds the site, builds the server-render bundle, then pre-renders the page into `dist/index.html` and writes `sitemap.xml` and `robots.txt`. |
| `npm run preview` | Serves the built `dist/` folder locally (static only, no API). |

### Backend scripts

| Command | What it does |
|---|---|
| `npm start` | Runs the server, loading `.env` if it exists. |
| `npm run dev` | Same, but restarts automatically when files change. |

---

## 7. Configuration (environment variables)

All backend settings live in `backend/.env` (copy from `backend/.env.example`). **Never commit `.env`**; it is already in `.gitignore`.

| Variable | Required? | Purpose |
|---|---|---|
| `GROQ_API_KEY` | For AI | API key from <https://console.groq.com/keys>. Without it the chat uses simple built-in answers and no AI drafts are produced. |
| `GROQ_MODEL` | No | Any Groq chat model. Default: `openai/gpt-oss-120b`. |
| `RESEND_API_KEY` | For real email | API key from <https://resend.com>. Verify your sending domain first. Without it, emails are written to `backend/outbox.log` instead of being sent. |
| `MAIL_FROM` | No | The "From" header, e.g. `NAKAJAH Care Foundation <hello@nakajahcare.org>`. |
| `STAFF_EMAIL` | No | Where staff notifications and AI drafts are delivered. Default: `hello@nakajahcare.org`. |
| `AUTO_REPLY` | No | `draft` (default, recommended): AI writes a suggested reply and staff approve it. `auto`: AI replies directly to routine emails. Safeguarding concerns are **never** auto-answered. |
| `INBOUND_SECRET` | For inbound email | Shared secret protecting the inbound-email webhook. If empty, the webhook is disabled. |
| `PORT` | No | Server port. Default: `8787`. |
| `FRONTEND_DIST` | No | Path to the built frontend. Default: `../frontend/dist`. |

Frontend build option: set `SITE_URL` when building (for example `SITE_URL=https://example.org npm run build`) to rewrite the canonical domain in the HTML, sitemap and robots.txt. It defaults to `https://nakajahcare.org`.

---


## 8. Deployment

The backend serves both the API and the built website, so a single Node process is enough.

1. Build the frontend: `cd frontend && npm install && npm run build`.
2. Copy the project to your server (or connect the repository to a Node host such as Render, Railway, Fly.io or a VPS).
3. Set the environment variables from section 7 on the host (do not upload a `.env` file to a public place).
4. Start the server with `cd backend && npm start`, and put it behind HTTPS (for example via your host's built-in TLS, Nginx or Caddy).
5. Point your domain at the server and set `SITE_URL` to it when building so the canonical URLs, sitemap and robots.txt are correct.
6. (Optional) Configure your email provider's inbound webhook to `https://your-domain/api/inbound-email?secret=YOUR_INBOUND_SECRET`.

The server compresses text responses with gzip, sets long cache lifetimes on hashed assets and adds basic security headers. If you run behind a reverse proxy, make sure it forwards the visitor's IP in `X-Forwarded-For` so rate limiting works per visitor.

---

## 9. Security and privacy notes

- **API keys stay on the server.** The browser never sees them; it only talks to `/api/*`.
- **Never commit `.env`.** If a key was ever shared or committed, rotate it in the Groq / Resend dashboard.
- **Emails are escaped** before being rendered as HTML, and email text sent to the AI is fenced as untrusted data.
- **Rate limits are in memory.** They reset when the server restarts and are per process. For multiple servers, use a shared store or limit at the proxy.
- **Privacy.** The chat tells visitors not to share personal details. Messages sent through the chat and form are passed to the AI provider (Groq) and email provider (Resend) when keys are configured. Make sure your privacy policy reflects this.
- **The AI can be wrong.** Chat answers are labelled "AI-generated" and limited to the knowledge base, but staff should review AI-drafted emails before sending (keep `AUTO_REPLY=draft` unless you are confident).

---

## 10. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Cannot find module` or `vite: not found` | Run `npm install` inside `frontend/`. |
| Backend shows a blank page or 404 at `/` | The frontend has not been built. Run `npm run build` in `frontend/`. |
| `node: bad option: --env-file-if-exists` | Node is too old. Upgrade to Node 20.18+ or 22+. |
| Chat gives generic answers | `GROQ_API_KEY` is missing or invalid. Check `/api/health` (`"ai": false`). |
| No emails arrive | `RESEND_API_KEY` is missing, or your sending domain is not verified. Check `backend/outbox.log` in mock mode. |
| Chat/form fails during development | Make sure the backend is running on port 8787 (the Vite proxy expects this port). If you changed `PORT`, update `proxy` in `frontend/vite.config.js`. |
| "Too many messages" error | Rate limit reached; wait a few minutes (chat) or an hour (form). |

---

*NAKAJAH Care Foundation: Safe spaces, stronger children, brighter futures.*
