---
marp: true
theme: default
paginate: true
footer: "CivicSync — HackYeah 2026"
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  
  section {
    background-color: #ffffff;
    background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
    background-size: 32px 32px;
    color: #334155;
    font-family: 'Inter', sans-serif;
    font-size: 26px;
    padding: 70px 90px;
  }
  
  h1 {
    color: #0f172a;
    font-size: 2.2em;
    font-weight: 800;
    letter-spacing: -0.02em;
    border-bottom: 5px solid #3b82f6;
    padding-bottom: 15px;
    margin-bottom: 40px;
    display: inline-block;
  }
  
  strong {
    color: #2563eb;
    font-weight: 700;
  }
  
  li {
    margin-bottom: 18px;
    line-height: 1.6;
  }

  /* Custom Class for the Title & Final Slide */
  section.title-slide {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    color: white;
    text-align: center;
  }
  section.title-slide h1 {
    color: white;
    border-bottom: none;
    font-size: 3.5em;
    margin-bottom: 10px;
    display: block;
  }
  section.title-slide strong { color: #93c5fd; font-size: 1.3em; }
  section.title-slide em { color: #cbd5e1; font-style: normal; display: block; margin-top: 40px; }
  section.title-slide a { color: #60a5fa; text-decoration: none; border-bottom: 1px dashed #60a5fa; }
  
  .text-center { text-align: center; }
  .text-center h1 { display: block; border-bottom: none; }
---

<!-- class: title-slide -->
# CivicSync
**Turn local ideas into civic action.**

**Team**: Context Window
**Members**: Razeena, Thoufeeque

---
<!-- class: -->
# The Problem & The Solution

**The Problem:** Citizens see broken infrastructure every day, but reporting requires technical jargon and figuring out which department to contact. Because of this friction, community insights are lost.

**The Solution:** CivicSync is an AI-powered translation engine. Users report issues in plain language, and the AI translates it into a highly structured, formal civic proposal—instantly matching it with the right local NGO and city blueprint.

---
<!-- class: text-left -->
# Category Focus: Smart City

**Modernizing Urban Communication**

CivicSync solves the core bottleneck of Smart Cities: *Citizen Friction*. 

Instead of forcing residents to navigate complex municipal portals or fill out confusing categorization forms, our platform acts as a universal translator. 

It uses advanced local AI to seamlessly bridge the gap between casual citizen observations and the rigid, structured data pipelines required by city planners and local NGOs.

---
<!-- class: text-left -->
# How It Works (The Tech)

1. **AI Parsing:** A user types a casual observation in plain text (e.g., Polish or English). 
2. **Local AI Engine:** Our LLM engine (prioritizing local **Gemma 4 / Llama 3.1** execution for zero-latency) parses the intent.
3. **Smart Routing:** The AI scans a database of "Proven Solutions" (Blueprints).
4. **NGO Matching:** Automatically matches the problem with the exact organization equipped to handle it.

---
<!-- class: text-center -->
<!-- footer: "" -->
# App Preview: Natural Language Input

![h:500px drop-shadow:0,5px,10px,rgba(0,0,0,.2)](screenshot_input.png)

---
<!-- class: text-left -->
<!-- footer: "CivicSync — HackYeah 2026" -->
# Usability & Impact

**Zero Friction for the User:**
- No complex government forms to fill out or categories to memorize.
- Users describe issues in their own words using natural language.
- Built-in multi-language support (e.g., Polish input is seamlessly translated).

**Actionable Data for the City:**
- NGOs and city planners receive standardized, machine-readable JSON payloads instead of chaotic, angry emails, allowing them to take immediate action.

---
<!-- class: text-center -->
<!-- footer: "" -->
# App Preview: Structured JSON & NGO Matching

![h:460px drop-shadow:0,5px,10px,rgba(0,0,0,.2)](screenshot_proposal.png)

---
<!-- class: text-left -->
<!-- footer: "CivicSync — HackYeah 2026" -->
# Safety & Spam Prevention

Because we deal with public infrastructure, AI safety is critical:
- **Translation, not Allocation:** AI is trusted with text generation, not city money. Budgets are historical estimates.
- **Community Verification:** Proposals require a threshold of community upvotes before being officially routed to prevent spam.
- **GPS Precision:** We capture exact coordinates to eliminate vague addresses.

---
<!-- class: text-left -->
# Design & Implementation

**The Tech Stack:**
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, shadcn/ui.
- **AI Engine:** Local Ollama integration (Gemma 4 / Llama 3.1) for privacy and speed.

**The Architecture:**
- **UX:** Designed to feel like a modern, sleek consumer app—not a clunky government portal.
- **Resilience:** A robust, multi-model fallback API that safely handles timeouts and prevents the application from crashing even if cloud APIs face severe rate limits.

---
<!-- class: title-slide -->
# Summary & Links

*Bridging the gap between residents, NGOs, and the city.*

**Demo Video:** https://youtube.com/shorts/eWNjSvegPvc
**Live App (Try it!):** https://civic-sync-gold.vercel.app
**Code Repository:** https://github.com/thoufeeque22/CivicSync

<br>

**CivicSync by Team Context Window**
*Powering the smart cities of tomorrow. Thank you.*
