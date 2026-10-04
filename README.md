# 🚀 CivicSync

**Turn local ideas into civic action.**
*Submitted to HackYeah 2026 — Smart City Category*

CivicSync is an AI-powered translation engine that allows residents to report infrastructure issues in plain language. The local AI engine instantly translates these casual observations into highly structured, formal civic proposals and routes them to the correct local NGO and verified city blueprint.

**✨ TRY THE LIVE APP:** [https://civic-sync-gold.vercel.app](https://civic-sync-gold.vercel.app)

---

## 👨‍⚖️ Note to Judges: How to Test the App

We built CivicSync with a highly resilient cloud waterfall architecture. **We highly recommend testing the live app linked above.** If you prefer to test the source code locally, follow the steps below.

### 1. Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. The "Live AI" Toggle (Important!)
In the top right corner of the input card, you will see a toggle for **"Live AI Generation"**.

* 🟢 **If you want to test the real AI:** You must have [Ollama](https://ollama.com/) running locally with the `gemma4:latest` (or `llama3.1`) model installed. Leave the toggle **checked**, and the app will generate the proposal dynamically using local AI.
* ⚡ **If you want a fast evaluation (Recommended):** If you do not have Ollama installed, or if you simply don't want to wait 20 seconds for the LLM to generate text, **uncheck the toggle**. The app will instantly fall back to our mock-data engine, allowing you to experience the UI, routing, and proposal formatting with zero friction.

---

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, shadcn/ui
- **AI Engine:** Local Ollama integration (Gemma 4) for extreme privacy and zero-cloud dependency
- **Architecture:** Fallback resilience ensuring the app never crashes even if AI rate limits occur
