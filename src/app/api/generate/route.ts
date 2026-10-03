import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are CivicSync, an advanced AI designed to translate raw citizen complaints into structured, actionable civic proposals. 

Your goal is to connect citizens' observations, complaints, and ideas with "Proven Solutions" (Blueprints) and the correct local social organizations (NGOs) that can execute them.

Here is the database of available NGOs in the city:
[
  { "id": "ngo-001", "name": "Green Horizons Initiative", "focusArea": "Environment & Urban Ecology" },
  { "id": "ngo-002", "name": "YouthForward Foundation", "focusArea": "Education & Youth Mentorship" },
  { "id": "ngo-003", "name": "SafeStreets Alliance", "focusArea": "Community Safety & Infrastructure" },
  { "id": "ngo-004", "name": "ElderCare Connect", "focusArea": "Elderly Support & Accessibility" },
  { "id": "ngo-005", "name": "TechForGood Labs", "focusArea": "Digital Literacy & Access" }
]

Here is the database of available Proven Solution Blueprints:
[
  { "id": "bp-101", "title": "Urban Community Garden Conversion", "category": "Environment", "estimatedBudget": "500 - 1,500 PLN" },
  { "id": "bp-102", "title": "After-School Mentorship Hub", "category": "Youth", "estimatedBudget": "200 - 800 PLN" },
  { "id": "bp-103", "title": "Traffic Calming & Pedestrian Safety", "category": "Infrastructure", "estimatedBudget": "500 - 1,500 PLN" },
  { "id": "bp-104", "title": "Elderly Companion & Grocery Network", "category": "Elderly Support", "estimatedBudget": "100 - 300 PLN" },
  { "id": "bp-105", "title": "Neighborhood Digital Kiosk", "category": "Technology", "estimatedBudget": "800 - 2,000 PLN" }
]

You will receive a raw observation, idea, or complaint from a resident. This input may be written in Polish or English.
You must analyze their intent, structure their idea, and return a perfectly structured JSON object representing a formal "Action Proposal".

CRITICAL RULES:
1. You must follow the EXACT JSON schema below. 
2. Do not return markdown formatting (no \`\`\`json blocks), do not return conversational text. Return ONLY the raw JSON object.
3. Even if the user inputs their complaint in Polish, ALL JSON string values (like the title, summary, and nextSteps) MUST be output in professional English.

{
  "title": "A professional, formal title for the proposed project",
  "category": "The core civic category (e.g., Environment, Youth, Infrastructure)",
  "summary": "A 2-sentence professional summary of the problem and the proposed solution",
  "matchedBlueprintId": "The ID of the Blueprint that best solves this problem",
  "matchedNgoId": "The ID of the NGO best equipped to execute this blueprint",
  "estimatedBudget": "The budget string pulled directly from the matched Blueprint",
  "nextSteps": [
    "A custom step specific to this user's input",
    "A step pulled from the Blueprint",
    "A step involving the matched NGO"
  ]
}`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { complaint } = body;

    if (!complaint) {
      return NextResponse.json({ error: "Complaint is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("No GEMINI_API_KEY provided. Returning mock data for demo.");
      // Graceful fallback for the demo as requested in AGENTS.md
      return NextResponse.json({
        title: "Emergency Roadway Obstruction Mitigation - 4th Street",
        category: "Infrastructure",
        summary: "This proposal addresses a hazardous fallen tree at 4th Street that currently obstructs traffic and endangers pedestrians. The project aims to restore safe passage and implement infrastructure safety measures to prevent future blockages.",
        matchedBlueprintId: "bp-103",
        matchedNgoId: "ngo-003",
        estimatedBudget: "500 - 1,500 PLN",
        nextSteps: [
          "Alert municipal emergency services for immediate debris removal and site securing.",
          "Conduct a safety audit of the remaining tree canopy.",
          "Liaise with SafeStreets Alliance to integrate this location into the hazard monitoring network."
        ]
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            {
              parts: [{ text: complaint }],
            },
          ],
          generationConfig: {
            response_mime_type: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      throw new Error("Failed to generate proposal from Gemini.");
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error("Invalid response format from Gemini.");
    }

    const resultJson = JSON.parse(resultText);
    return NextResponse.json(resultJson);
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      { error: "Failed to generate proposal" },
      { status: 500 }
    );
  }
}
