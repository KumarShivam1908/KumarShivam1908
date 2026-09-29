<h1 align="center">Hi 👋, I'm Shivam Kumar</h1>
<h3 align="center">Research Associate at Stryker · medical imaging &amp; computer vision</h3>

<!-- Parked: profile-view count is a vanity metric, not a signal about the code.
<p align="center">
  <img src="https://komarev.com/ghpvc/?username=KumarShivam1908&label=Profile%20views&color=0e75b6&style=flat-square" alt="profile views" />
</p>
-->

<p align="center">
  <a href="https://www.linkedin.com/in/kumar-shivam-b8b196258/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:hey.kumarshivam@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://x.com/KShivam62684" target="_blank"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X" /></a>
  <a href="https://portfolio-frontend-pearl-rho.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Portfolio-111111?style=flat-square&logo=vercel&logoColor=white" alt="Portfolio" /></a>
</p>

---

### 🧭 What I do

I'm a **Research Associate at Stryker's Global Technology Center**, working on medical imaging and
computer vision: synthetic data generation (Blender, NVIDIA Isaac Sim), fine-tuning VLMs with
LoRA/QLoRA, and the MLOps around them (Docker, DVC, MLflow).

Outside work I'm building **[LiveIssues](https://liveissues.lol)**, an open-source issue recommender
for Google Summer of Code organizations, and contributing to **neural-lam**.

Currently going deeper on **LLMs, applied ML, and system design**.
Reach me at **hey.kumarshivam@gmail.com**.

<!-- Parked: replaced by the sections below, which show the same thing with evidence.
- 🔭 I build across the stack — from **ML models** to **production web apps**
- 🌱 Currently going deeper on **LLMs, applied ML, and system design**
- ⚡ Hackathon enthusiast — I like shipping fast and iterating
- 💬 Ask me about **Python, ML, Next.js, or backend design**
- 📫 Reach me at **hey.kumarshivam@gmail.com**
-->

---

### 🔨 Building now: LiveIssues

**[liveissues.lol](https://liveissues.lol)** · <sub>[walkthrough video](https://youtu.be/NjKuE4BFB1I) · source is private, happy to walk through it</sub>

Sign in with GitHub and LiveIssues reads what you already build, matches you to the Google Summer
of Code organizations that fit, and hands you unclaimed issues you can pick up today, each with the
reasons it was picked.

- **Recommender:** three retrievers (structured, full-text, embedding kNN) feed a reranker built from nine weighted, explainable components, so every match says *why*
- **Fresh issues:** all 511 GSoC organizations are scanned continuously; each followed organization becomes a channel with a room per repository, and new issues land within the hour, flagged if someone has already started
- **Architecture:** five FastAPI services (sign-in and token custody, org scanning, GitHub profile building, ranking, and the API with its channels worker) behind a React frontend; only one service talks to GitHub
- **Outcomes:** tracks the pull requests opened and merged on recommended issues, to measure whether a recommendation actually led to a contribution
- **Deployed** with Docker Compose behind Caddy on GCP

<sub>Built with FastAPI · React · Elasticsearch · PostgreSQL · SQLite FTS5 · Supabase · Docker · GCP</sub>

---

### 🌍 Open source

Contributing to **[mllam/neural-lam](https://github.com/mllam/neural-lam)** ⭐ 296, research software for neural weather prediction over limited areas, mostly on its test suite and CI:

| Pull request | Status |
| :-- | :-- |
| [Use one actions/cache step so PRs stop storing duplicate test data](https://github.com/mllam/neural-lam/pull/754) | ✅ Merged |
| [Keep a copy of the DANRA test data between CI runs](https://github.com/mllam/neural-lam/pull/751) | 🟢 Open |
| [Update the flags of the testsuite](https://github.com/mllam/neural-lam/pull/750) | 🟢 Open |
| [Add property-based tests for output clamping](https://github.com/mllam/neural-lam/pull/741) | 🟢 Open |
| [Add Markdown link checking and a PR-template doc-update reminder](https://github.com/mllam/neural-lam/pull/738) | 🟢 Open |

---

### 🧠 Machine Learning & Computer Vision

| Project | What it does | Built with |
| :-- | :-- | :-- |
| **[Stamp & Signature Segregation](https://github.com/KumarShivam1908/Stamp-Signature-Segregate)** ⭐ 9 | Detects stamps and signatures overlapping a scanned document and lifts them off, leaving the text underneath readable | YOLO · SegFormer · Streamlit |
| **[Railway Infrastructure Inspection](https://github.com/KumarShivam1908/RAILWAY-INFRASTRUCTURE-INSPECTION)** ⭐ 4<br/><sub>2nd Runner-Up — Wabtec Exceed 3.0</sub> | Finds track defects, bridge damage and obstacles in inspection footage to drive predictive maintenance | YOLOv11 · R-CNN · OpenCV |
| **[Model Profiling](https://github.com/KumarShivam1908/MODEL-PROFILING)** | Converts PyTorch models to ONNX and TensorRT and profiles latency and memory — the step that decides whether a model is deployable | PyTorch · ONNX · TensorRT |
| **[Prompt-Based Segmentation](https://github.com/KumarShivam1908/Prompt-Based-Segmentation)** | Text-conditioned segmentation for infrastructure inspection: pass an image and “segment crack”, get a binary mask back | PyTorch · vision-language models |
| **[Scratch Detector](https://github.com/KumarShivam1908/Mowito-ScratchDetector)** | Classifies surface defects with CNNs and transformers, including synthetic data generation and a deployment pass | PyTorch · CNNs · ViT |

---

### 🚢 Shipped & Live

| Project | What it does | Built with |
| :-- | :-- | :-- |
| **[outsubscribe.lol](https://outsubscribe.lol)** — <sub>[source](https://github.com/KumarShivam1908/ChannelBid)</sub> | A public leaderboard you buy your way up: bids are stored as increments, a raise charges only the difference, and two boards run off the same ledger | Next.js · Prisma · Postgres · Dodo Payments |
| **[Portfolio OS](https://portfolio-frontend-pearl-rho.vercel.app)** | This portfolio, built as a Windows XP desktop: a hand-written window manager, a virtual file system with a terminal over it, and a tool-using AI assistant grounded in a wiki, with Groq→OpenRouter failover and per-minute token budgeting | React · TypeScript · Express · Groq |
| **[Portfolio Wars](https://portfolio-wars.vercel.app)** — <sub>[source](https://github.com/KumarShivam1908/PortfolioWars)</sub> | No-login gallery where people submit a portfolio site and everyone else browses, likes and comments | Next.js · Supabase |
| **[Stitch](https://github.com/KumarShivam1908/Stitch)** ⭐ 1 | Browser-based video editor that plans an edit and routes each task to a specialist tool over MCP | TypeScript · Rust/WASM · Bun |
| **[CPP-Hub](https://github.com/KumarShivam1908/CPP-Hub)** ⭐ 4 | DSA, core C++ and graphics programming, with multiple solution approaches per problem | C++ |

---

### 🛠️ Tech Stack

<table>
  <tr>
    <td valign="top" width="50%">

**AI / ML & Data**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikitlearn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)

**Web / Frontend**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

  </td>
    <td valign="top" width="50%">

**Backend / Database**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=flat-square&logo=elasticsearch&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)

**Cloud / DevOps**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-4285F4?style=flat-square&logo=googlecloud&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

  </td>
  </tr>
</table>

---

### 📈 Activity

<p align="center">
  <img src="https://raw.githubusercontent.com/KumarShivam1908/KumarShivam1908/main/metrics.svg" alt="metrics" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/KumarShivam1908/KumarShivam1908/main/contribution-radar.svg" alt="contribution mix across commits, issues, pull requests and code review" width="440" />
</p>

<!-- Parked: streak card measures showing up daily, and duplicates the calendar below.
<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=KumarShivam1908&theme=gotham" alt="streak" />
</p>
-->

<!-- Parked: the isometric calendar hid each day's count behind bar heights; the calendar below prints them.
<p align="center">
  <img src="https://raw.githubusercontent.com/KumarShivam1908/KumarShivam1908/main/metrics.isocalendar.svg" alt="isometric contribution calendar" />
</p>
-->

<p align="center">
  <img src="https://raw.githubusercontent.com/KumarShivam1908/KumarShivam1908/main/contribution-calendar.svg" alt="contribution calendar for the last year, with each day's count in its cell" width="100%" />
</p>

<!-- Parked: decoration, says nothing about the work.
### 🐍 Watch My Contributions Get Eaten

<p align="center">
  <img src="https://raw.githubusercontent.com/KumarShivam1908/KumarShivam1908/output/github-contribution-grid-snake-dark.svg" alt="contribution snake" />
</p>
-->

<p align="center">
  <i>⭐️ From <a href="https://github.com/KumarShivam1908">KumarShivam1908</a></i>
</p>
