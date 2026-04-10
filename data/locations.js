export const locations = [
  {
    id: "stony-brook",
    name: "Stony Brook, NY",
    zip: "11794",
    utility: "Suffolk County Water Authority",
    recordLabel: "Campus District demo record",
    coordinates: { lat: 40.9143, lng: -73.1239 },
    status: "safe",
    statusLabel: "Safe",
    qualityIndex: 92,
    metrics: { lead: "2.1", chlorine: "0.8", ph: "7.3", updated: "Apr 10, 8:40 AM" },
    heroTitle: "Know your water.<br><span>Protect your home.</span>",
    heroDescription:
      "Plain-language water quality reports for your address. We translate EPA data, local advisories, and contaminant records into guidance you can act on today.",
    summaryTitle: "What you need to know",
    summaryText:
      "This demo scenario shows water quality that meets everyday use standards. Lead remains well below the EPA action limit, chlorine is within the expected disinfection range, and no boil or do-not-use advisories are active. For most households, the tap is fine for drinking, cooking, showering, and pets.",
    quickSummary:
      "This demo location is safe for normal daily use. No active advisory is shown, and the core water metrics are within a normal range for the prototype.",
    highlights: [
      { tone: "safe", title: "Meets standards", detail: "No active boil or do-not-use notice.", icon: "check" },
      { tone: "info", title: "Low lead reading", detail: "Demo lead level remains far below the action limit.", icon: "droplet" },
      { tone: "teal", title: "Household-ready", detail: "Fine for drinking, cooking, showering, pets, and laundry.", icon: "shield" }
    ],
    sources: [
      { label: "EPA SDWIS database", icon: "home" },
      { label: "2025 utility confidence report", icon: "file" },
      { label: "State health department guidance", icon: "globe" },
      { label: "Local utility portal", icon: "monitor" }
    ],
    actionsTitle: "What to do at home",
    actionsSubtitle: "Everyday guidance for a normal-use scenario",
    actions: [
      {
        id: "drink",
        title: "Drink from the tap",
        description: "The demo reading supports normal tap use. A simple carbon filter is optional for taste.",
        detail:
          "The prototype scenario shows no active restriction on drinking water use. For sensitive households, a taste-focused carbon filter is an optional comfort choice rather than a required safety measure.",
        steps: [
          "Use cold water for drinking and cooking.",
          "Run the faucet briefly after long overnight stagnation.",
          "Keep a filter only if you want better taste or odor control."
        ],
        tone: "blue",
        icon: "cup"
      },
      {
        id: "cook",
        title: "Cook with cold water",
        description: "For the prototype, regular meal prep is fine. Start with cold tap water instead of hot.",
        detail:
          "Cold water is preferred for cooking because hot water can pick up more metal from plumbing. The demo scenario assumes no active restriction on food preparation.",
        steps: [
          "Start cooking water from the cold tap.",
          "Let it run for 20 to 30 seconds in the morning.",
          "Use hot water only after it has already been heated separately."
        ],
        tone: "amber",
        icon: "pot"
      },
      {
        id: "filter",
        title: "Filter for peace of mind",
        description: "A certified pitcher or faucet filter can improve confidence and taste for cautious households.",
        detail:
          "The MVP keeps this recommendation visible because many users want a plain-language answer to whether a filter helps, even when the water is currently safe.",
        steps: [
          "Choose a filter certified for the contaminant you care about.",
          "Track cartridge replacement dates visibly.",
          "Do not rely on an expired filter."
        ],
        tone: "teal",
        icon: "filter"
      },
      {
        id: "alerts",
        title: "Set up alerts",
        description: "Save this location so you can quickly compare future changes during the demo.",
        detail:
          "Saved locations are part of the MVP story: households do not want to search from scratch every time a utility update appears.",
        steps: [
          "Click Save location in the status card.",
          "Use the saved chip to jump back later in the demo.",
          "Pitch this as MongoDB-ready or cloud-persisted in a fuller build."
        ],
        tone: "green",
        icon: "bell"
      }
    ],
    aiSuggestions: [
      "Is this okay for a newborn?",
      "Do I need a filter?",
      "What does the pH number mean?",
      "Can I trust this if my building is older?"
    ],
    pitchPoints: [
      "The problem is instantly understandable: people want a yes-or-no style answer about their water.",
      "The page makes technical records feel approachable without flattening the credibility story.",
      "This default state shows the product can be useful even before there is a crisis."
    ]
  },
  {
    id: "suffolk-county",
    name: "Suffolk County, NY",
    zip: "11790",
    utility: "Suffolk County Water Authority",
    recordLabel: "Pressure-loss advisory demo",
    coordinates: { lat: 40.8823, lng: -72.6371 },
    status: "caution",
    statusLabel: "Caution",
    qualityIndex: 74,
    metrics: { lead: "4.8", chlorine: "1.1", ph: "7.0", updated: "Apr 10, 9:05 AM" },
    heroTitle: "Know your water.<br><span>Respond with confidence.</span>",
    heroDescription:
      "Aqua Guide turns a cautious utility notice into direct household guidance so people know what to do immediately.",
    summaryTitle: "What the data means for you",
    summaryText:
      "This demo scenario reflects a precautionary utility notice after a pressure loss in part of the system. The current prototype recommends caution because contamination risk is being evaluated, not because a confirmed health event has been declared. For drinking, cooking, baby formula, and medication, the safer recommendation is to use boiled or bottled water until the follow-up reading clears.",
    quickSummary:
      "This demo location is in a caution state. Use boiled or bottled water for drinking and cooking until the follow-up notice clears.",
    highlights: [
      { tone: "caution", title: "Precautionary notice", detail: "A pressure event triggered a temporary caution scenario.", icon: "alert" },
      { tone: "info", title: "Follow-up sampling pending", detail: "The status is driven by caution while more records are verified.", icon: "clock" },
      { tone: "teal", title: "Plain-language guidance", detail: "Boil or bottle for drinking, formula, and meds until cleared.", icon: "shield" }
    ],
    sources: [
      { label: "County utility advisory feed", icon: "monitor" },
      { label: "EPA emergency guidance", icon: "home" },
      { label: "County public health bulletin", icon: "globe" },
      { label: "Latest operations memo", icon: "file" }
    ],
    actionsTitle: "What to do right now",
    actionsSubtitle: "Recommended household actions for a caution scenario",
    actions: [
      {
        id: "boil",
        title: "Boil before you drink",
        description: "Use boiled or bottled water for drinking, cooking, brushing teeth, and ice.",
        detail:
          "This caution-state recommendation is the clearest moment in the pitch because the user instantly understands the problem and the product response.",
        steps: [
          "Bring water to a full rolling boil for at least one minute.",
          "Let it cool in a clean covered container.",
          "Use bottled water if boiling is not practical."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "formula",
        title: "Protect baby formula and meds",
        description: "Use only boiled or bottled water for infant formula, medication, and sensitive households.",
        detail:
          "The MVP keeps this card prominent because judges respond well to practical, family-centered action guidance.",
        steps: [
          "Set aside bottled or boiled water for babies and medication.",
          "Do not rely on taste or smell to judge safety.",
          "Keep a separate container ready for sensitive household members."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "store",
        title: "Store backup water",
        description: "Keep at least one gallon per person ready while the notice is active.",
        detail:
          "A simple preparedness step makes the app feel useful to both everyday households and emergency-minded judges.",
        steps: [
          "Store one gallon per person per day if possible.",
          "Use clean covered containers.",
          "Label the container with the date."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "alerts",
        title: "Watch for the clear notice",
        description: "Save the location and check back for the next utility update.",
        detail:
          "This is where Aqua Guide demonstrates repeat utility: not just advice once, but a clearer place to revisit updates.",
        steps: [
          "Save the current location in the app.",
          "Check the updated timestamp before taking action.",
          "Treat the caution status as active until the next clear notice is shown."
        ],
        tone: "green",
        icon: "bell"
      }
    ],
    aiSuggestions: [
      "Can I shower during this notice?",
      "How long should I boil water?",
      "Is a Brita enough here?",
      "What should I do for baby formula?"
    ],
    pitchPoints: [
      "This is the strongest live-demo scenario because the problem and solution are both obvious.",
      "The app reduces panic by converting utility language into concrete next steps.",
      "The interaction feels valuable to households, not just technically impressive."
    ]
  },
  {
    id: "brooklyn",
    name: "Brooklyn, NY",
    zip: "11201",
    utility: "NYC DEP",
    recordLabel: "Dense urban household demo",
    coordinates: { lat: 40.6957, lng: -73.9918 },
    status: "safe",
    statusLabel: "Safe",
    qualityIndex: 88,
    metrics: { lead: "3.2", chlorine: "0.6", ph: "7.4", updated: "Apr 10, 7:50 AM" },
    heroTitle: "Know your water.<br><span>Plan for city living.</span>",
    heroDescription:
      "Aqua Guide also helps in normal urban settings by translating plumbing risk, hardness, and household decisions into something faster to understand.",
    summaryTitle: "What you need to know",
    summaryText:
      "This demo urban scenario is currently safe, but it highlights a common question: the water itself reads well while older building plumbing still creates uncertainty for some renters. Aqua Guide keeps the household context visible so users know when a certified filter or a short faucet flush makes sense.",
    quickSummary:
      "This demo location is safe overall. The main household concern is older building plumbing, not an active water-system advisory.",
    highlights: [
      { tone: "safe", title: "Safe system status", detail: "The utility-level reading in this demo remains normal.", icon: "check" },
      { tone: "info", title: "Older building caveat", detail: "Aging plumbing can still change the household decision.", icon: "home" },
      { tone: "teal", title: "Renter-friendly guidance", detail: "A short flush and a certified filter are the main takeaways.", icon: "filter" }
    ],
    sources: [
      { label: "NYC DEP report", icon: "file" },
      { label: "EPA guidance library", icon: "home" },
      { label: "City housing resources", icon: "globe" },
      { label: "Tap Water database", icon: "monitor" }
    ],
    actionsTitle: "What to do at home",
    actionsSubtitle: "Contextual guidance for renters and apartment buildings",
    actions: [
      {
        id: "flush",
        title: "Run cold water first",
        description: "A brief flush helps if the tap has been sitting overnight in older plumbing.",
        detail:
          "This is a small but memorable habit, and it demonstrates Aqua Guide's value in situations where the system is safe but the home context still matters.",
        steps: [
          "Run the cold tap 20 to 30 seconds in the morning.",
          "Use fresh cold water for drinking and cooking.",
          "Repeat after long absences or low-use periods."
        ],
        tone: "blue",
        icon: "droplet"
      },
      {
        id: "filter",
        title: "Use a certified filter",
        description: "A certified filter can help households in older buildings feel more confident.",
        detail:
          "Aqua Guide makes this recommendation without implying the utility feed itself is unsafe, which is an important communication nuance.",
        steps: [
          "Choose a filter certified for lead if that is your concern.",
          "Register a replacement reminder.",
          "Replace cartridges on schedule."
        ],
        tone: "teal",
        icon: "filter"
      },
      {
        id: "test",
        title: "Request a building test",
        description: "If you rent in an older building, a home or building-level test can resolve doubt quickly.",
        detail:
          "This card broadens the product beyond alerts and shows it can also guide proactive household care.",
        steps: [
          "Ask the landlord or super about prior lead testing.",
          "Use a local test kit or utility program if available.",
          "Keep the result in a household safety folder."
        ],
        tone: "green",
        icon: "clipboard"
      },
      {
        id: "save",
        title: "Save for repeat checks",
        description: "Keep this location handy so you can compare future utility or building updates.",
        detail:
          "Saved locations are part of the MVP's stickiness story and make the product feel practical beyond one session.",
        steps: [
          "Save the location in Aqua Guide.",
          "Use the favorite chip to revisit quickly.",
          "Compare this scenario with a higher-alert location in the demo."
        ],
        tone: "amber",
        icon: "star"
      }
    ],
    aiSuggestions: [
      "Is this different in an old building?",
      "Should renters still filter?",
      "What if I taste chlorine?",
      "How often should I test?"
    ],
    pitchPoints: [
      "The product is still useful even when the answer is mostly reassuring.",
      "It handles household context, not just utility-level data.",
      "This makes the audience broader than emergency-only tools."
    ]
  },
  {
    id: "miami-beach",
    name: "Miami Beach, FL",
    zip: "33139",
    utility: "Coastal Utilities demo feed",
    recordLabel: "Storm runoff advisory demo",
    coordinates: { lat: 25.7907, lng: -80.13 },
    status: "advisory",
    statusLabel: "Advisory",
    qualityIndex: 58,
    metrics: { lead: "6.4", chlorine: "1.5", ph: "6.8", updated: "Apr 10, 6:20 AM" },
    heroTitle: "Know your water.<br><span>Move fast when conditions change.</span>",
    heroDescription:
      "For severe scenarios, Aqua Guide keeps the interface simple enough to understand in seconds while still surfacing the reason behind the warning.",
    summaryTitle: "What the data means for you",
    summaryText:
      "This demo advisory scenario represents a stronger risk state tied to storm-related system disruption. Aqua Guide treats this as an active household warning: avoid untreated tap water for drinking or cooking until the utility posts a clear notice, and keep bottled or boiled supplies available for vulnerable household members.",
    quickSummary:
      "This demo location is in an advisory state. Avoid untreated tap water for drinking or cooking until the warning clears.",
    highlights: [
      { tone: "advisory", title: "Active advisory", detail: "Storm-related disruption creates a higher-risk household scenario.", icon: "alert" },
      { tone: "caution", title: "Bottled or boiled preferred", detail: "The prototype recommends alternate drinking water until cleared.", icon: "box" },
      { tone: "info", title: "Check the timestamp", detail: "This is the kind of situation where the latest update matters most.", icon: "clock" }
    ],
    sources: [
      { label: "Utility incident feed", icon: "monitor" },
      { label: "County health notice", icon: "globe" },
      { label: "EPA emergency guidance", icon: "home" },
      { label: "System operations update", icon: "file" }
    ],
    actionsTitle: "What to do right now",
    actionsSubtitle: "Immediate guidance for an advisory state",
    actions: [
      {
        id: "avoid",
        title: "Avoid untreated tap water",
        description: "Use bottled or properly boiled water for drinking, cooking, brushing teeth, and ice.",
        detail:
          "This is the clearest expression of Aqua Guide's core value: compressing complicated warning language into direct household action.",
        steps: [
          "Switch to bottled or properly boiled water immediately.",
          "Do not make ice or infant formula with untreated tap water.",
          "Treat the warning as active until the next clear update."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "separate",
        title: "Separate vulnerable household use",
        description: "Set aside clean water for babies, medications, and immunocompromised residents first.",
        detail:
          "This gives the demo a strong human-centered angle and makes the problem feel obviously important to judges.",
        steps: [
          "Reserve the safest water source for high-risk household members.",
          "Label containers so they are not mixed up.",
          "Recheck the advisory before normal tap use resumes."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "save",
        title: "Save the location for updates",
        description: "Use the saved-location shortcut so you can check the next utility notice instantly.",
        detail:
          "The app is most compelling when it acts like an ongoing household guide rather than a one-time alert page.",
        steps: [
          "Save the location in Aqua Guide.",
          "Reopen it from the favorites row.",
          "Confirm the timestamp before changing behavior."
        ],
        tone: "blue",
        icon: "star"
      },
      {
        id: "share",
        title: "Share the summary",
        description: "Copy the summary so housemates or family members all see the same plain-language guidance.",
        detail:
          "This is a small feature, but it is presentation-friendly and reinforces the broad household audience.",
        steps: [
          "Use the Copy summary button.",
          "Send the plain-language version to housemates or family.",
          "Keep the next update in the same thread."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "Can I wash dishes with this?",
      "What should I do for pets?",
      "How long does an advisory usually last?",
      "What do I show my roommates?"
    ],
    pitchPoints: [
      "This scenario is visually strong for the judges because the stakes are obvious.",
      "The product still stays calm and usable instead of looking like a panic dashboard.",
      "It demonstrates why plain-language explanation matters during fast-changing conditions."
    ]
  }
];
