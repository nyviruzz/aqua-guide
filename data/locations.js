export const locations = [
  {
    id: "coxs-bazar-bangladesh",
    name: "Cox's Bazar, Bangladesh",
    zip: "4700",
    utility: "UNICEF / local WASH response demo",
    recordLabel: "Coastal camp resilience demo",
    coordinates: { lat: 21.4272, lng: 92.0058 },
    status: "caution",
    statusLabel: "Caution",
    qualityIndex: 66,
    metrics: { lead: "3.4", chlorine: "0.5", ph: "7.1", updated: "Apr 10, 8:15 AM" },
    heroTitle: "Global water guidance.<br><span>Localized for families.</span>",
    heroDescription:
      "Aqua Guide is now framed as a global water-access and safety product for communities facing climate stress, contamination, displacement, and fragile infrastructure.",
    summaryTitle: "What this means for households",
    summaryText:
      "This demo scenario is inspired by coastal and camp-based water challenges where salinity, storm damage, and contamination risk can make safe drinking water harder to access consistently. The product response is to simplify the situation for families: use treated or bottled water for drinking, store safe water carefully, and check for the latest trusted notice before returning to normal use.",
    quickSummary:
      "This demo location is in a caution state. Families should use treated or bottled water for drinking and cooking until the next trusted update.",
    highlights: [
      { tone: "caution", title: "Climate-sensitive supply", detail: "Storms and salinity can quickly change water safety conditions.", icon: "alert" },
      { tone: "info", title: "Family-first guidance", detail: "The app turns technical updates into steps that households can follow immediately.", icon: "shield" },
      { tone: "teal", title: "Storage matters", detail: "Safe handling and storage are as important as the source itself.", icon: "box" }
    ],
    sources: [
      { label: "UNICEF WASH reporting", icon: "globe" },
      { label: "WHO drinking-water guidance", icon: "home" },
      { label: "Local response partner brief", icon: "file" },
      { label: "Field operations dashboard", icon: "monitor" }
    ],
    actionsTitle: "What families should do next",
    actionsSubtitle: "Priority steps for a high-stress but still manageable scenario",
    actions: [
      {
        id: "boil",
        title: "Treat drinking water first",
        description: "Use boiled, chlorinated, or bottled water for drinking, cooking, and brushing teeth.",
        detail:
          "This card is the clearest hook for judges: Aqua Guide takes a complicated context and immediately tells a family what the first safe action should be.",
        steps: [
          "Reserve treated or bottled water for drinking and cooking first.",
          "Boil or disinfect water according to local guidance if bottled water is limited.",
          "Keep untreated water separate from safe household water."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "store",
        title: "Store water safely",
        description: "Keep safe water in a clean covered container and separate it from washing water.",
        detail:
          "A lot of public-health risk comes after collection. The demo keeps storage visible because it is practical, memorable, and easy to explain in the video.",
        steps: [
          "Use a clean covered container.",
          "Label safe water clearly if multiple people share the space.",
          "Use a clean cup or spout instead of dipping hands into the container."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "protect",
        title: "Prioritize children and elders",
        description: "Set aside the safest water for babies, older adults, and anyone already sick.",
        detail:
          "This helps the product feel humane instead of technical, which is important when the judges are deciding whether the project matters.",
        steps: [
          "Reserve the first safe water for babies and vulnerable household members.",
          "Use only treated water for formula, medicine, and oral rehydration.",
          "Do not rely on taste, smell, or appearance alone."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "share",
        title: "Share the plain-language summary",
        description: "Copy the summary so families, volunteers, or neighbors see the same next steps.",
        detail:
          "This is a simple product moment that plays well in the presentation because the value is obvious even without a complex backend.",
        steps: [
          "Copy the summary directly from Aqua Guide.",
          "Share it with family, community groups, or volunteers.",
          "Replace it when a newer trusted update appears."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "What should a family do first?",
      "Can this water be used for baby formula?",
      "How should we store safe water?",
      "Can you explain this in French?"
    ],
    pitchPoints: [
      "The product now addresses a globally recognizable water problem, not just a comfortable local context.",
      "The interface stays calm even when the scenario is serious, which makes the demo feel credible and usable.",
      "The sharing and multilingual assistant features make the product feel inclusive and practical for diverse communities."
    ]
  },
  {
    id: "turkana-kenya",
    name: "Turkana County, Kenya",
    zip: "30500",
    utility: "UNICEF Kenya drought-response demo",
    recordLabel: "Drought and long-haul collection demo",
    coordinates: { lat: 3.3122, lng: 35.5658 },
    status: "advisory",
    statusLabel: "Advisory",
    qualityIndex: 48,
    metrics: { lead: "5.7", chlorine: "0.2", ph: "6.9", updated: "Apr 10, 7:05 AM" },
    heroTitle: "Water guidance for crisis conditions.<br><span>Still understandable in seconds.</span>",
    heroDescription:
      "This scenario represents drought pressure, long collection distances, and unsafe untreated sources. Aqua Guide focuses on the first decisions a household should make.",
    summaryTitle: "What this means for households",
    summaryText:
      "This demo advisory scenario is built around severe water stress, where households may depend on distant or unreliable sources and safe treatment becomes urgent. The product response is intentionally simple: do not assume collected water is safe, treat the highest-priority drinking supply first, and conserve the cleanest water for infants, elders, and anyone already ill.",
    quickSummary:
      "This demo location is in an advisory state. Treat all drinking water first and reserve the safest water for the most vulnerable people.",
    highlights: [
      { tone: "advisory", title: "Severe scarcity pressure", detail: "Households may rely on distant or untreated sources.", icon: "alert" },
      { tone: "info", title: "Access and safety overlap", detail: "The problem is not only contamination but also limited safe supply.", icon: "droplet" },
      { tone: "teal", title: "Triage matters", detail: "The product helps families decide what water use comes first.", icon: "shield" }
    ],
    sources: [
      { label: "UNICEF Kenya water access reporting", icon: "globe" },
      { label: "WHO household water safety guidance", icon: "home" },
      { label: "Regional emergency operations note", icon: "file" },
      { label: "Response coordination dashboard", icon: "monitor" }
    ],
    actionsTitle: "What families should do immediately",
    actionsSubtitle: "Highest-priority steps for a severe water-stress scenario",
    actions: [
      {
        id: "boil",
        title: "Treat the cleanest supply first",
        description: "Use boiling, chlorine, or another trusted treatment method before any drinking or cooking use.",
        detail:
          "This keeps the core message direct. Aqua Guide is strongest when it reduces a hard situation to one clear first move that families and judges both understand immediately.",
        steps: [
          "Set aside the cleanest available water source first.",
          "Boil or disinfect it using the locally trusted method.",
          "Use that treated supply for drinking, cooking, and medicine before all other uses."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "protect",
        title: "Protect high-risk household members",
        description: "Use the safest available water for babies, elders, and anyone who is dehydrated or sick.",
        detail:
          "A triage-style recommendation makes the problem feel real and also shows that the product is built around actual household decisions.",
        steps: [
          "Prioritize infants, elders, and sick family members.",
          "Use safe water for oral rehydration, medicine, and formula only.",
          "Keep one dedicated container for the highest-priority household use."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "store",
        title: "Reduce contamination after collection",
        description: "Safe water can become unsafe again if it is carried or stored poorly.",
        detail:
          "This is important because the demo is about more than test results. It is about what happens between collection and use.",
        steps: [
          "Use a covered container whenever possible.",
          "Avoid touching stored safe water with unclean cups or hands.",
          "Separate water for washing from water for drinking."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "share",
        title: "Share the update quickly",
        description: "Use the plain-language summary to coordinate with family, volunteers, and community workers.",
        detail:
          "This gives the app a communication role, which is stronger in a hackathon demo than positioning it as only a static dashboard.",
        steps: [
          "Copy the summary from Aqua Guide.",
          "Share it in the group or household channel already in use.",
          "Replace it with the next verified update when conditions change."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "What is the first step in an advisory?",
      "How should we protect children first?",
      "Can you explain this in Swahili?",
      "What if we only have one clean container?"
    ],
    pitchPoints: [
      "This is the strongest high-stakes demo state because the need is obvious in seconds.",
      "The product is not just reporting risk; it is organizing household decisions under pressure.",
      "The global framing makes the project feel more meaningful and less like a local convenience app."
    ]
  },
  {
    id: "beira-mozambique",
    name: "Beira, Mozambique",
    zip: "2100",
    utility: "UNICEF Mozambique flood-resilience demo",
    recordLabel: "Storm and flood disruption demo",
    coordinates: { lat: -19.8333, lng: 34.85 },
    status: "caution",
    statusLabel: "Caution",
    qualityIndex: 61,
    metrics: { lead: "4.2", chlorine: "0.4", ph: "7.0", updated: "Apr 10, 6:40 AM" },
    heroTitle: "Designed for recovery conditions.<br><span>Not just everyday monitoring.</span>",
    heroDescription:
      "This scenario represents communities dealing with flood disruption and fragile water systems after severe weather.",
    summaryTitle: "What this means for households",
    summaryText:
      "This demo caution state reflects flooding or storm-related disruption where contamination risk rises because infrastructure is under stress. Aqua Guide keeps the response focused: use treated water for drinking, keep storage clean, and wait for the next verified update before assuming the supply has stabilized.",
    quickSummary:
      "This demo location is in a caution state after flood-related disruption. Drink only treated or bottled water until the next verified update.",
    highlights: [
      { tone: "caution", title: "Flood-disruption risk", detail: "Damaged systems can make contamination more likely after storms.", icon: "alert" },
      { tone: "info", title: "Recovery-focused guidance", detail: "The app helps families make better decisions while services are stabilizing.", icon: "clock" },
      { tone: "teal", title: "Clear next steps", detail: "Treatment, storage, and updates are kept front and center.", icon: "shield" }
    ],
    sources: [
      { label: "UNICEF Mozambique WASH brief", icon: "globe" },
      { label: "WHO emergency water guidance", icon: "home" },
      { label: "Post-storm response memo", icon: "file" },
      { label: "Operations coordination feed", icon: "monitor" }
    ],
    actionsTitle: "What families should do next",
    actionsSubtitle: "Recovery-oriented steps during a caution period",
    actions: [
      {
        id: "boil",
        title: "Treat water before drinking",
        description: "Use treated or bottled water for drinking, cooking, and brushing teeth until recovery notices improve.",
        detail:
          "This gives the presentation a clear before-and-after decision point and reinforces that Aqua Guide is about action, not just awareness.",
        steps: [
          "Use treated or bottled water for all direct consumption.",
          "Do not assume clear-looking water is safe after flooding.",
          "Check for the next trusted update before normal use resumes."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "store",
        title: "Separate safe water from cleanup water",
        description: "Keep drinking water separate from washing, cleanup, and sanitation use.",
        detail:
          "The distinction matters in recovery settings and helps the demo feel grounded in real household behavior.",
        steps: [
          "Use different containers for safe water and cleanup water.",
          "Keep lids on safe-water containers whenever possible.",
          "Rewash containers if floodwater has touched them."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "protect",
        title: "Support multilingual communication",
        description: "Use the assistant to restate the advice in another language for mixed-language families or volunteers.",
        detail:
          "This ties directly into the new AI angle and helps the product feel inclusive rather than one-language-only.",
        steps: [
          "Choose a response language in the assistant panel.",
          "Ask Aqua to explain the guidance again in that language.",
          "Share the translated explanation with the household or team."
        ],
        tone: "teal",
        icon: "globe"
      },
      {
        id: "share",
        title: "Share one trusted update",
        description: "Avoid mixed messaging by sharing a single plain-language summary.",
        detail:
          "Judges usually like products that reduce confusion. This feature demonstrates that clearly without needing a heavy backend.",
        steps: [
          "Copy the latest summary from Aqua Guide.",
          "Share it with the people you are coordinating with.",
          "Replace it if the timestamp changes."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "Can you explain this in Arabic?",
      "What should volunteers tell families first?",
      "How do we store safe water after flooding?",
      "What if there are children in the household?"
    ],
    pitchPoints: [
      "This scenario shows climate-resilience relevance, not just contamination monitoring.",
      "The multilingual assistant supports inclusion in mixed-language communities and relief settings.",
      "The interface remains easy to present because each state change has a visible meaning."
    ]
  },
  {
    id: "port-au-prince-haiti",
    name: "Port-au-Prince, Haiti",
    zip: "HT6110",
    utility: "WHO / humanitarian coordination demo",
    recordLabel: "Urban emergency water-safety demo",
    coordinates: { lat: 18.5944, lng: -72.3074 },
    status: "advisory",
    statusLabel: "Advisory",
    qualityIndex: 43,
    metrics: { lead: "6.1", chlorine: "0.1", ph: "6.7", updated: "Apr 10, 9:10 AM" },
    heroTitle: "Clear guidance for fragile systems.<br><span>Built for urgency, not panic.</span>",
    heroDescription:
      "This scenario is designed around dense urban emergency conditions where clean water access is inconsistent and communication has to stay simple.",
    summaryTitle: "What this means for households",
    summaryText:
      "This demo advisory scenario reflects a fragile urban context where safe water access may be disrupted and untreated sources can create serious household risk. Aqua Guide treats this as an urgent communication problem: identify the safest available supply, reserve it for essential use, and explain the guidance clearly enough that every household member can follow it.",
    quickSummary:
      "This demo location is in an advisory state. Use the safest treated water for essential needs only and do not rely on untreated sources.",
    highlights: [
      { tone: "advisory", title: "Fragile urban conditions", detail: "Water access and safe storage can both be unstable.", icon: "alert" },
      { tone: "info", title: "Communication is critical", detail: "Simple language prevents dangerous misunderstandings in a fast-moving situation.", icon: "monitor" },
      { tone: "teal", title: "Essential-use focus", detail: "The product helps households decide how to use limited safe water first.", icon: "shield" }
    ],
    sources: [
      { label: "WHO public health guidance", icon: "home" },
      { label: "Humanitarian response brief", icon: "file" },
      { label: "UNICEF WASH reporting", icon: "globe" },
      { label: "Coordination update feed", icon: "monitor" }
    ],
    actionsTitle: "What families should do immediately",
    actionsSubtitle: "Essential-use actions for an urban emergency scenario",
    actions: [
      {
        id: "boil",
        title: "Reserve safe water for essentials",
        description: "Use treated or bottled water only for drinking, cooking, medicine, and infant care first.",
        detail:
          "This is a strong presentation moment because the audience immediately understands the problem and the value of the guidance.",
        steps: [
          "Reserve the safest water available for drinking and cooking.",
          "Use only treated water for medicine and infant care.",
          "Delay non-essential uses if safe supply is limited."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "protect",
        title: "Repeat the guidance in another language",
        description: "Use the assistant to restate the key steps for different family members or volunteers.",
        detail:
          "This directly supports the AI-judge angle by making the model feature obviously useful instead of decorative.",
        steps: [
          "Choose the response language in the assistant panel.",
          "Ask Aqua to repeat the essential-use guidance.",
          "Share the translated response with the people who need it."
        ],
        tone: "teal",
        icon: "globe"
      },
      {
        id: "store",
        title: "Keep the clean supply protected",
        description: "Store safe water separately and avoid recontaminating it during use.",
        detail:
          "The product is stronger when it helps after collection too, not just at the moment of warning.",
        steps: [
          "Use a covered clean container for safe water.",
          "Do not mix treated and untreated water.",
          "Use a clean ladle or spout to serve water."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "share",
        title: "Send one shared summary",
        description: "Copy the update so the whole household sees the same instructions.",
        detail:
          "This keeps the demo practical and shows how the app supports coordination, not just reading.",
        steps: [
          "Copy the plain-language summary.",
          "Send it in the family or neighborhood chat.",
          "Replace it when a fresher trusted update appears."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "Explain this in Bengali.",
      "What are the essential uses for safe water?",
      "How should a parent explain this to a child?",
      "What if we have very little safe water?"
    ],
    pitchPoints: [
      "This scenario makes the AI feature feel truly useful because translation and simplification are part of the core problem.",
      "The product has a broader humanitarian and public-health story than a local utility dashboard.",
      "It still demos cleanly because each step on screen maps to a real household decision."
    ]
  }
];
