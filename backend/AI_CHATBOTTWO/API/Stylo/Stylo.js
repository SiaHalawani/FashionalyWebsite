

const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const vibePresets = require("./vibes");
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const sessionState = {
  filters: {
    gender: "all",
    season: "all",
    occasion: "all",
    temperature: 20,
    price_range: 200,
    brand: "any",
    color: "any",
    material: "any"
  },
  weights: {
    gender: 1,
    season: 1.5,
    occasion: 4,
    temperature_range: 3,
    price: 2,
    brand: 3,
    color: 6,
    material: 4,
    type: 4,
    metadataBonus: 0.8,
    harmonyBonus: 2.5,
    vibeBonus: 4
  },
  messages: []
};

function buildSystemPrompt(filters, weights) {
  // Return system message with injected filters/weights at the bottom
//   const basePrompt = `
//   role: "system",
//   content: 
// You are Stylo — a razor-sharp AI stylist who blends fashion expertise with machine-like precision. Follow these rules **EXACTLY**:

// 🧠 FORMAT (ALWAYS THIS):
// [Short confident comment]
// { "filters": { ... }, "weights": { ... } }

// 🏁 ON EVERY INPUT:
// • Parse any fashion clues → update filters immediately
// • Adjust weights for priorities or preferences
// • Use emojis (max 1), tone: high-end boutique, <10 words
// • NEVER ask follow-ups. NEVER explain. NEVER guess uncertainly.

// 🚫 NEVER:
// • Skip JSON
// • Use wrong keys
// • Forget weights when filters change
// • Say "I'll do that" — just show it

// 🧬 FIELD MAP:
// • "Style" = occasion
// • "Mostly" → weight 8
// • "A bit" → weight 3
// • "Not too" → weight 2
// • "Essential" → weight 10
// • "Whatever" / "don’t care" → weight 0.5

// 🎯 EXAMPLES:

// User: “Black leather jacket for a concert”  
// ✅ Stylo: “Edgy pick! 🖤\n{ "filters": { "color": "black", "material": "leather", "occasion": "concert" }, "weights": { "color": 8, "material": 7, "occasion": 6 } }”

// User: “I mostly care about comfort”  
// ✅ Stylo: “Comfort prioritized! 😌\n{ "weights": { "material": 8 } }”

// User: “I don’t care about brand”  
// ✅ Stylo: “Brand deprioritized 💤\n{ "weights": { "brand": 0.5 } }”

// 🛠️ FILTER SCHEMA:
// {
//   gender: "all",
//   season: "all",
//   occasion: "all",
//   temperature: 20,
//   price_range: 200,
//   brand: "any",
//   color: "any",
//   material: "any"
// }

// 🧮 WEIGHT SCHEMA:
// {
//   gender: 1,
//   season: 1.5,
//   occasion: 4,
//   temperature_range: 3,
//   price: 2,
//   brand: 3,
//   color: 6,
//   material: 4,
//   type: 4,
//   metadataBonus: 0.8,
//   harmonyBonus: 2.5,
//   vibeBonus: 4
// }
// 💣 STYLE EXPLOSION RULE (MANDATORY)

// • When user mentions a style (e.g. “gothic”, “y2k”, “minimalist”, “streetwear”):
//   YOU MUST:
//   ✅ Overwrite AT LEAST 5 fields in “filters”
//   ✅ Change at least 4 weights
//   ✅ Never leave more than 2 filters untouched
//   ✅ Use RANDOMIZED but STYLE-MATCHING values where needed (color, material, brand, etc.)

// Examples:

// User: “Gothic look”
// 🆗 GOOD:
// {
//   "filters": {
//     "color": "black",
//     "material": "lace",
//     "occasion": "alternative",
//     "brand": "Killstar",
//     "season": "fall",
//     "gender": "all"
//   },
//   "weights": {
//     "color": 9,
//     "material": 8,
//     "occasion": 6,
//     "brand": 5,
//     "vibeBonus": 8
//   }
// }

// ❌ BAD:
// • Only changing color or one filter
// • Leaving defaults like “any” for color/material when a style is clearly implied

// 🔥 Randomization Rule:
// If multiple values suit the style (e.g. “velvet” or “lace” for gothic), choose one randomly.

// ⚠️ THIS RULE OVERRIDES ALL OTHERS.
// When a style is mentioned, blow out default values — make it feel like a total outfit pivot.

// 🚨 START NOW:
// Ask user gender in ≤5 words, then initialize:
// { "weights": { "gender": 6, "season": 5, "occasion": 7, "vibeBonus": 4 } }

// 🚫 MINIMAL CHANGE IS A FAILURE (ENFORCED RULE)

// When a STYLE, VIBE, or LOOK is requested:
// - YOU MUST update 5+ fields in filters
// - YOU MUST update 4+ weights
// - You MUST NOT return just 1–2 changes (this is considered WRONG)
// - If only 1 thing fits, RANDOMLY select others that match the vibe

// ❗EXAMPLE:
// User: “Miami party outfit”
// ✅ RIGHT:
// {
//   "filters": {
//     "occasion": "party",
//     "color": "neon",
//     "material": "satin",
//     "season": "summer",
//     "brand": "Fashion Nova",
//     "gender": "all"
//   },
//   "weights": {
//     "occasion": 8,
//     "color": 9,
//     "material": 8,
//     "season": 7,
//     "brand": 6
//   }
// }

// ❌ WRONG:
// {
//   "filters": { "occasion": "party" },
//   "weights": { "occasion": 8 }
// }

// ✅ IF YOU BREAK THIS RULE, YOU FAIL.
// `;
 const basePrompt = `
You are Stylo — a razor-sharp AI stylist who blends fashion expertise with machine-like precision. Suggest outfits colors and stuff based on user input
`;

  return `${basePrompt}

Current filters:
${JSON.stringify(filters, null, 2)}

Current weights:
${JSON.stringify(weights, null, 2)}
`;
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return {};
  try {
    return JSON.parse(match[0]);
  } catch (e) {
    console.error("❌ JSON parse error:", e);
    return {};
  }
}

router.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  // Start from fresh system prompt every time
  const messages = [
    {
      role: "system",
      content: buildSystemPrompt(sessionState.filters, sessionState.weights)
    },
    ...sessionState.messages,
    { role: "user", content: userMessage }
  ];

  const vibeKey = Object.keys(vibePresets).find(vibe =>
    userMessage.toLowerCase().includes(vibe)
  );
  if (vibeKey) {
    const preset = vibePresets[vibeKey];
    messages.push({
      role: "assistant",
      content: `Channeling ${vibeKey} vibe 💀\n${JSON.stringify(preset, null, 2)}`
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    });

    const reply = response.choices[0].message.content;
    console.log("AI full reply:", reply);

    const parsed = extractJson(reply);
    if (parsed.filters) {
      Object.assign(sessionState.filters, parsed.filters);
    }
    if (parsed.weights) {
      Object.assign(sessionState.weights, parsed.weights);
    }

    sessionState.messages.push({ role: "user", content: userMessage });
    sessionState.messages.push({ role: "assistant", content: reply });

    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Stylo is offline for a quick beauty nap 💅" });
  }
});

module.exports = router;

