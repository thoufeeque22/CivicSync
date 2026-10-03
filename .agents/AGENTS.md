# Hackathon AI Guidelines: Hubmi Engine

> **Primary rules file for Agy (Antigravity).** Optimized specifically for a 48-hour hackathon environment. Speed, visual impact, and the "Happy Path" demo are the highest priorities.

## 1. Hackathon Orchestration (Speed Mode)
- **Skip TDD & QA Blockers:** The strict requirement to write E2E tests before development is **DISABLED**. Agents should immediately write application code (`src/`) to build out the core features.
- **Wizard of Oz Prototypes:** Do not waste time building complex relational databases for things that can be mocked. Hardcode JSON arrays for NGOs, Blueprints, and Users if it saves time. The goal is a perfect demo, not a production-ready backend.
- **Direct Execution:** The Orchestrator has full permission to write code directly without needing to spawn separate QA or Dev sub-agents unless dealing with a massive architectural refactor. 

## 2. Tech Stack & UI Standards
- **UI Framework:** We are using **Tailwind CSS** and **shadcn/ui**. Do NOT use Material UI (MUI).
- **Aesthetic Integrity:** The UI must look incredibly sleek and modern. Use generous padding, subtle borders, and smooth loading states (e.g., skeletons or spinners) to make the AI processing feel magical during the pitch.
- **Next.js 15 App Router:** Ensure `'use client'` is only used when React hooks or browser APIs are required. Default to Server Components for speed and simplicity.

## 3. Strict AI Coding Guidelines (Bug Prevention)
*Even in a hackathon, a runtime crash during a demo is fatal. Follow these rules to prevent bugs:*
- **TypeScript Strictness:** NEVER use the `any` type. Use `unknown` and validate. The compiler is your best friend when moving fast.
- **No nested ternaries:** Avoid complex inline logic that is hard to debug at 3 AM.
- **Optional Chaining:** Prefer `obj?.prop?.sub` over verbose checks.
- **Hydration & Storage:** Do not use `window` for global variables; use `globalThis` instead.

## 4. The Hubmi Engine AI Integration
- **Structured JSON Only:** When interacting with the Gemini API, always enforce strict JSON schema outputs. The AI must return a predictable object (e.g., `{ title, category, budget, matchedBlueprint, assignedNGO }`) that the frontend can safely parse and render.
- **Graceful Fallbacks:** If the AI API fails or times out during the demo, have a hardcoded fallback "Proposal" ready to render so the pitch is not ruined.

## 5. Branding & Naming
- **Application Name:** Always refer to the project as **Hubmi Engine** (or the final name chosen).
- **The Core Value:** Every feature built must align with connecting Residents, NGOs, and Institutions using "Proven Solutions" (Blueprints).

## 6. Transient & State Files
- All phase artifacts and transient files MUST be written to `<appDataDir>/brain/<conversation-id>/` (artifacts) or `<appDataDir>/brain/<conversation-id>/scratch/` (scratch files). Do not litter the project repository with `.md` brainstorming files.
