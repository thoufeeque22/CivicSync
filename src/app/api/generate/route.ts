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
    const { complaint, useLiveAI = true } = body;

    if (!complaint) {
      return NextResponse.json({ error: "Complaint is required" }, { status: 400 });
    }
    
    const apiKey = process.env.GEMINI_API_KEY;
    
    // THE DEMO BYPASS: If UI toggle is unchecked, return instant hardcoded mapping
    if (!useLiveAI) {
      console.log("\n⚡ FAST DEMO MODE: Bypassing AI engines and returning instant mock data.\n");
      // Simulate slight network delay to make the spinner show for half a second
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const lowerComplaint = complaint.toLowerCase();
      
      if (lowerComplaint.includes("garden") || lowerComplaint.includes("weeds")) {
        return NextResponse.json({
          "title": "Revitalization of Abandoned Urban Lot into Community Garden",
          "category": "Environment",
          "summary": "A large, abandoned dirt lot is currently an eyesore accumulating trash and weeds, detracting from neighborhood aesthetics. Converting this space into a community garden will provide residents with a shared green space for recreation and growing fresh produce.",
          "matchedBlueprintId": "bp-101",
          "matchedNgoId": "ngo-001",
          "estimatedBudget": "500 - 1,500 PLN",
          "nextSteps": [
            "Form a neighborhood action committee to secure necessary permits and volunteer labor.",
            "Conduct soil testing and design the garden layout with raised beds appropriate for community use.",
            "Engage Green Horizons Initiative to secure resource allocation, planting advice, and waste cleanup."
          ]
        });
      }
      
      if (lowerComplaint.includes("older") || lowerComplaint.includes("groceries")) {
        return NextResponse.json({
          "title": "Support System for Elderly Residents and Grocery Assistance",
          "category": "Elderly Support",
          "summary": "Many senior residents struggle with mobility issues, particularly carrying groceries up stairs, leading to isolation. Implementing a structured volunteer network can provide necessary physical support and social connection.",
          "matchedBlueprintId": "bp-104",
          "matchedNgoId": "ngo-004",
          "estimatedBudget": "100 - 300 PLN",
          "nextSteps": [
            "Conduct a resident survey to gauge demand and identify specific support needs within the complex.",
            "Connect with ElderCare Connect to establish volunteer training protocols and resource mobilization.",
            "Formalize an initial program pilot focusing on 2-3 units to measure impact and refine procedures."
          ]
        });
      }
      
      if (lowerComplaint.includes("kids") || lowerComplaint.includes("internet") || lowerComplaint.includes("wi-fi")) {
        return NextResponse.json({
          "title": "Establishing Community Digital Access Point for Students",
          "category": "Technology",
          "summary": "Many students in the Starowiślna 88 area lack reliable internet access crucial for modern schoolwork. Implementing a secure, public Wi-Fi hotspot near the community center would significantly bridge this digital divide.",
          "matchedBlueprintId": "bp-105",
          "matchedNgoId": "ngo-005",
          "estimatedBudget": "800 - 2,000 PLN",
          "nextSteps": [
            "Conduct a needs assessment survey with local parents and schools to gauge demand.",
            "Finalize the optimal physical location for the digital kiosk in consultation with city planning.",
            "Engage TechForGood Labs to manage installation, maintenance, and basic usage training."
          ]
        });
      }

      if (lowerComplaint.includes("samochody") || lowerComplaint.includes("szybko") || lowerComplaint.includes("progów")) {
        return NextResponse.json({
          "title": "Enhancing Pedestrian Safety and Implementing Traffic Calming near Długa Primary School",
          "category": "Infrastructure",
          "summary": "The presence of excessive speeding vehicles near the primary school on Długa Street poses a significant danger to children crossing the street. Immediate intervention is needed, such as installing speed bumps or improving crosswalk accessibility, to prevent potential accidents.",
          "matchedBlueprintId": "bp-103",
          "matchedNgoId": "ngo-003",
          "estimatedBudget": "500 - 1,500 PLN",
          "nextSteps": [
            "Organize a neighborhood safety walk and map high-risk zones immediately.",
            "Coordinate with local traffic authorities for speed monitoring and enforcement.",
            "Collaborate with SafeStreets Alliance to advocate for and install physical calming measures."
          ]
        });
      }
      
      // Default / Custom Text Fallback
      return NextResponse.json({
        "title": "⚠️ THIS IS A HARDCODED MOCK RESPONSE",
        "category": "System Demo",
        "summary": "This is a generic placeholder proposal because 'Live AI Generation' is currently disabled and your text did not match any of our predefined testing keywords. To generate a real, dynamic proposal based on your exact text, please check the 'Live AI Generation' box in the top right corner.",
        "matchedBlueprintId": "bp-mock",
        "matchedNgoId": "ngo-mock",
        "estimatedBudget": "0 PLN",
        "nextSteps": [
          "Check the 'Live AI Generation' box in the UI.",
          "Ensure your API key or local Ollama engine is running.",
          "Click Generate again to see the real AI in action!"
        ]
      });
    }

    const modelsToTry = [
      "ollama:gemma4:latest",
      "gemini:gemini-flash-latest"
    ];

    let lastError = null;

    for (const modelConfig of modelsToTry) {
      const [provider, modelName] = modelConfig.split(":");
      try {
        let response;
        let resultText = "";

        if (provider === "ollama") {
          response = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: modelName,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: complaint }
              ],
              stream: false,
              format: "json"
            })
          });

          if (response.ok) {
            const data = await response.json();
            resultText = data.message?.content;
          }
        } else if (provider === "gemini") {
          response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: [{ parts: [{ text: complaint }] }],
                generationConfig: { response_mime_type: "application/json" },
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          }
        }

        if (!response || !response.ok) {
          const errorText = response ? await response.text() : "No response";
          console.warn(`[${modelConfig}] API Error:`, errorText);
          lastError = new Error(`Failed to generate with ${modelConfig}`);
          continue; 
        }
        
        if (!resultText) {
          lastError = new Error(`Invalid response format from ${modelConfig}.`);
          continue;
        }

        // Clean up any potential markdown code blocks hallucinated by the local LLM
        let cleanJsonText = resultText.trim();
        if (cleanJsonText.startsWith("```json")) {
          cleanJsonText = cleanJsonText.replace(/^```json/, "").replace(/```$/, "").trim();
        } else if (cleanJsonText.startsWith("```")) {
          cleanJsonText = cleanJsonText.replace(/^```/, "").replace(/```$/, "").trim();
        }

        const resultJson = JSON.parse(cleanJsonText);
        console.log(`\n✅ Successfully generated proposal using: ${modelConfig}\n`);
        return NextResponse.json(resultJson);

      } catch (err) {
        console.warn(`[${modelConfig}] fetch failed:`, err);
        lastError = err;
      }
    }

    // If we exhausted all models, return a proper 503 error to trigger the frontend modal
    console.warn("\n⚠️ All AI models failed or were overloaded. Returning 503 Error.\n");
    return NextResponse.json(
      { 
        error: "AI Engine Unavailable", 
        details: (lastError as any)?.message || "Google Gemini is currently experiencing a high-demand outage."
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      { error: "Failed to generate proposal" },
      { status: 500 }
    );
  }
}
