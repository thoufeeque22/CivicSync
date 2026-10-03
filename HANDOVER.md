# Project Handover: Hubmi Engine (HackYeah 2026)

## 📌 Current Status
**Phase:** Pre-Hackathon Preparation Complete.
**Goal:** We have completed 100% of the allowed setup before the hackathon officially begins. The boilerplate is built, the UI is styled, the mock data is ready, and the AI prompt is tested. 

## 🏗️ The Architecture & Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui + lucide-react
- **AI Integration:** Google Gemini API
- **Data Layer:** "Wizard of Oz" Mock JSON (No database required for demo)

## 🧠 Core Product Logic & Pitch Strategy
*These are the critical product decisions made to survive judge scrutiny. Ensure they are reflected in the UI and the pitch.*

1. **Community Verification:** To prevent spam, AI proposals are not instantly funded. They go to a public board and require a threshold of resident upvotes (e.g., 10 upvotes) before officially routing to the NGO.
2. **Exact Location (Map Pins):** "Nowohucka street" is too vague. The app captures exact GPS coordinates via a "Use My Location" button, providing NGOs with a precise map pin so they don't waste time searching for the hazard.
3. **Budget Verification:** The AI only provides a *historical estimate* based on Blueprints. The matched NGO conducts the site visit and provides the *final human-verified quote* before the City releases any funds. The AI is trusted with translation, not money.

## 📁 What We Built Today
1. **`src/app/page.tsx`:** The static UI layout. Split-screen design (Left: input, Right: Proposal Card).
2. **`src/lib/mock-data.ts`:** Contains 5 highly realistic NGOs and 5 Proven Solution Blueprints with PLN budgets.
3. **`PROMPT_ENGINEERING.md`:** The master system prompt. Instructs Gemini to parse a messy complaint (even in Polish), map it to the mock data, and return a strict JSON payload in English.
4. **`.agents/AGENTS.md`:** A custom, hackathon-optimized agent ruleset prioritizing speed and Tailwind.

## 🚀 Next Steps (When the Hackathon Timer Starts)
Instruct your AI agent to execute the following steps in order:

- [ ] **Step 1: UI Polish.** Update `page.tsx` to visually include the new product logic:
    * Add a "📍 Use My Location" button to the input form.
    * Add a "Community Verification" progress bar (e.g., 1/10 upvotes) to the Proposal Card.
    * Add a static Map/Location section to the Proposal Card showing coordinates.
- [ ] **Step 2: API Route.** Create the serverless API route (`src/app/api/generate/route.ts`).
- [ ] **Step 3: Gemini Integration.** Write the server-side code to call the Gemini API using the prompt from `PROMPT_ENGINEERING.md`.
- [ ] **Step 4: Connect UI to API.** Update `page.tsx` to `fetch()` this API when the "Generate Proposal" button is clicked. Map the returned JSON directly into the Proposal Card UI.
- [ ] **Step 5: Record Pitch.** Record the 3-minute video demonstrating the app translating a Polish complaint into a formal proposal, highlighting the verification flows.
