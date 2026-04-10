export const regions = [
  {
    id: "coxs-bazar-bangladesh",
    name: "Cox's Bazar, Bangladesh",
    country: "Bangladesh",
    countryIso2: "BD",
    countryIso3: "BGD",
    flag: "🇧🇩",
    utility: "Coastal settlements and camp-adjacent water access",
    recordLabel: "Salinity pressure and infrastructure strain",
    coordinates: { lat: 21.4272, lng: 92.0058 },
    status: "caution",
    statusLabel: "Caution",
    qualityIndex: 66,
    metrics: { lead: "3.4", chlorine: "0.5", ph: "7.1", updated: "Apr 10, 8:15 AM" },
    tag: "Coastal resilience",
    oneLiner:
      "Families need clear treatment and storage guidance when storm damage and salinity pressure disrupt reliable drinking water.",
    heroTitle: "Water guidance for high-stress coastal communities.",
    heroDescription:
      "Aqua Guide translates public health and field-response context into plain-language steps households can actually follow.",
    summaryTitle: "What households should know",
    summaryText:
      "Water conditions in and around coastal settlements can shift quickly after storms, flooding, or infrastructure damage. Aqua Guide keeps the response practical: choose treated or bottled water for direct consumption, separate safe water from utility water, and keep updates easy to share with the household.",
    quickSummary:
      "Use treated or bottled water for drinking and cooking, keep safe water covered, and wait for the next trusted update before returning to normal use.",
    highlights: [
      {
        tone: "caution",
        title: "Storm-sensitive supply",
        detail: "Heavy weather and salinity can make water safety conditions change quickly.",
        icon: "alert"
      },
      {
        tone: "info",
        title: "Household-first language",
        detail: "The product converts technical context into actions families can follow immediately.",
        icon: "shield"
      },
      {
        tone: "teal",
        title: "Storage matters",
        detail: "Clean handling after collection is just as important as the source itself.",
        icon: "box"
      }
    ],
    sources: [
      { label: "UNICEF WASH reporting", icon: "globe" },
      { label: "WHO drinking-water guidance", icon: "file" },
      { label: "Regional situation summaries", icon: "monitor" }
    ],
    actionsTitle: "Priority household actions",
    actionsSubtitle: "Keep treatment, storage, and sharing simple enough to repeat under pressure.",
    actions: [
      {
        id: "treat",
        title: "Treat drinking water first",
        description: "Use boiled, chlorinated, or bottled water for drinking, cooking, and brushing teeth.",
        detail:
          "The first action should always be obvious. This card keeps the response focused on the safest immediate step.",
        steps: [
          "Reserve treated or bottled water for drinking and cooking first.",
          "If bottled water is limited, boil or disinfect water using locally trusted guidance.",
          "Keep untreated water physically separate from household drinking water."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "store",
        title: "Store safe water carefully",
        description: "Use a clean covered container and keep safe water separate from washing water.",
        detail:
          "Many contamination problems happen after collection. Clear storage rules reduce avoidable recontamination.",
        steps: [
          "Use a clean container with a cover whenever possible.",
          "Label drinking water if multiple containers are being used.",
          "Use a clean ladle, spout, or cup instead of dipping hands into the container."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "protect",
        title: "Protect vulnerable family members",
        description: "Reserve the safest water for babies, elders, and anyone already sick.",
        detail:
          "Aqua Guide is strongest when it helps families triage quickly, not just understand statistics.",
        steps: [
          "Set aside the safest available water for infants, elders, and sick household members.",
          "Use treated water for medicine, formula, and oral rehydration.",
          "Do not assume clear-looking water is safe enough for vulnerable users."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "share",
        title: "Share one clear summary",
        description: "Copy the household summary so family members and local volunteers use the same next steps.",
        detail:
          "The sharing moment makes the product feel like a communication tool, not only a static status page.",
        steps: [
          "Copy the summary from Aqua Guide.",
          "Send it to the household, group chat, or local support contact.",
          "Replace it when a newer trusted update becomes available."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "What should a family do first?",
      "Can this water be used for baby formula?",
      "How should safe water be stored?",
      "Explain this in Bengali."
    ],
    searchAliases: ["cox's bazar", "camps", "bangladesh coast", "4700", "cxb"]
  },
  {
    id: "turkana-kenya",
    name: "Turkana County, Kenya",
    country: "Kenya",
    countryIso2: "KE",
    countryIso3: "KEN",
    flag: "🇰🇪",
    utility: "Drought-affected communities and long-haul collection routes",
    recordLabel: "Scarcity and untreated source risk",
    coordinates: { lat: 2.7656, lng: 35.5977 },
    status: "advisory",
    statusLabel: "Advisory",
    qualityIndex: 48,
    metrics: { lead: "5.7", chlorine: "0.2", ph: "6.9", updated: "Apr 10, 7:05 AM" },
    tag: "Scarcity response",
    oneLiner:
      "When water is scarce and collection distances are long, families need triage guidance as much as contamination guidance.",
    heroTitle: "Clarity for severe water-stress conditions.",
    heroDescription:
      "Aqua Guide keeps the message simple even when the situation is hard: treat the cleanest supply first and prioritize the highest-risk household needs.",
    summaryTitle: "What households should know",
    summaryText:
      "In severe water-stress settings, the problem is not just whether water is contaminated. It is also whether enough safe water exists for the highest-priority needs. Aqua Guide helps families decide what comes first: treat the cleanest available supply, reserve it for direct consumption and medicine, and keep storage disciplined so precious safe water is not lost to avoidable contamination.",
    quickSummary:
      "Treat the cleanest water first, reserve it for drinking and medicine, and protect the highest-risk people in the household.",
    highlights: [
      {
        tone: "advisory",
        title: "Severe scarcity pressure",
        detail: "Households may depend on distant or untreated sources with little room for error.",
        icon: "alert"
      },
      {
        tone: "info",
        title: "Access and safety overlap",
        detail: "Limited access changes the order of household decisions.",
        icon: "droplet"
      },
      {
        tone: "teal",
        title: "Triage matters",
        detail: "The app helps users decide which water use should happen first.",
        icon: "shield"
      }
    ],
    sources: [
      { label: "UNICEF Kenya water access reporting", icon: "globe" },
      { label: "WHO household water safety guidance", icon: "file" },
      { label: "Regional response updates", icon: "monitor" }
    ],
    actionsTitle: "Priority household actions",
    actionsSubtitle: "Start with the safest possible water and assign it to the highest-value uses first.",
    actions: [
      {
        id: "treat",
        title: "Treat the cleanest supply first",
        description: "Boil, chlorinate, or otherwise disinfect the best available source before any drinking use.",
        detail:
          "Aqua Guide should reduce a high-stakes situation to one unmistakable first action. This is that action.",
        steps: [
          "Identify the cleanest available source before mixing supplies together.",
          "Apply the locally trusted treatment method before any drinking or cooking use.",
          "Use that treated supply for direct consumption before all other needs."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "protect",
        title: "Protect high-risk household members",
        description: "Reserve the safest water for babies, elders, and anyone who is dehydrated or sick.",
        detail:
          "The product becomes more useful when it helps households make a sequence of decisions, not just absorb a status label.",
        steps: [
          "Prioritize infants, elders, and sick household members first.",
          "Use treated water for formula, medicine, and oral rehydration.",
          "Keep one dedicated container for the household's highest-priority use."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "store",
        title: "Prevent recontamination after collection",
        description: "Protect safe water during transport and storage so treatment effort is not wasted.",
        detail:
          "The handoff from collection to use is where many preventable failures happen, so the product keeps storage visible.",
        steps: [
          "Use covered containers whenever possible.",
          "Do not touch stored water with unclean cups or hands.",
          "Keep washing water separate from drinking water."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "share",
        title: "Share the household guidance",
        description: "Use one plain-language summary so everyone in the household is operating from the same plan.",
        detail:
          "This reinforces that Aqua Guide is a coordination product, not only a status monitor.",
        steps: [
          "Copy the summary into the channel or group already used by the household.",
          "Confirm everyone understands which water is reserved for direct consumption.",
          "Replace the summary as soon as conditions change."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "What is the first step in an advisory?",
      "How should we protect children first?",
      "Explain this in Swahili.",
      "What if we only have one clean container?"
    ],
    searchAliases: ["turkana", "lodwar", "kenya drought", "30500"]
  },
  {
    id: "beira-mozambique",
    name: "Beira, Mozambique",
    country: "Mozambique",
    countryIso2: "MZ",
    countryIso3: "MOZ",
    flag: "🇲🇿",
    utility: "Storm recovery corridors and flood-disrupted neighborhoods",
    recordLabel: "Infrastructure disruption after severe weather",
    coordinates: { lat: -19.8333, lng: 34.85 },
    status: "caution",
    statusLabel: "Caution",
    qualityIndex: 61,
    metrics: { lead: "4.2", chlorine: "0.4", ph: "7.0", updated: "Apr 10, 6:40 AM" },
    tag: "Flood recovery",
    oneLiner:
      "Flood recovery scenarios need simple treatment and separation rules while services are stabilizing.",
    heroTitle: "Guidance designed for recovery periods.",
    heroDescription:
      "When services are disrupted after storms or flooding, Aqua Guide keeps the most important household decisions visible and easy to repeat.",
    summaryTitle: "What households should know",
    summaryText:
      "Flood-related disruption can raise contamination risk even when water looks normal. Aqua Guide focuses the response on practical household behavior: use treated water for direct consumption, separate drinking water from cleanup water, and wait for the next verified update before assuming the supply has normalized.",
    quickSummary:
      "Drink only treated or bottled water, separate drinking water from cleanup water, and wait for the next verified update.",
    highlights: [
      {
        tone: "caution",
        title: "Post-storm instability",
        detail: "Damaged infrastructure can affect water safety even after weather improves.",
        icon: "alert"
      },
      {
        tone: "info",
        title: "Recovery-focused guidance",
        detail: "The app helps households act while services are still stabilizing.",
        icon: "clock"
      },
      {
        tone: "teal",
        title: "Clear next steps",
        detail: "Treatment, separation, and updates stay front and center.",
        icon: "shield"
      }
    ],
    sources: [
      { label: "UNICEF Mozambique WASH briefings", icon: "globe" },
      { label: "WHO emergency water guidance", icon: "file" },
      { label: "Operational recovery updates", icon: "monitor" }
    ],
    actionsTitle: "Priority household actions",
    actionsSubtitle: "Make direct-consumption water easy to identify and protect while systems recover.",
    actions: [
      {
        id: "treat",
        title: "Treat water before drinking",
        description: "Use treated or bottled water for drinking, cooking, and brushing teeth until conditions improve.",
        detail:
          "The guidance should still be obvious in the first five seconds. This action provides that anchor.",
        steps: [
          "Use treated or bottled water for all direct consumption.",
          "Do not trust appearance alone after flooding or storm damage.",
          "Wait for a newer verified update before normal use resumes."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "store",
        title: "Separate drinking and cleanup water",
        description: "Keep safe water physically separate from cleaning and sanitation use.",
        detail:
          "A visible separation rule makes the product feel practical and grounded in real household behavior.",
        steps: [
          "Use different containers for drinking water and cleanup water.",
          "Label or color-code containers when possible.",
          "Store drinking water in the cleanest covered container available."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "protect",
        title: "Protect medicine and infant use",
        description: "Reserve the safest water for medication, oral rehydration, and infant feeding first.",
        detail:
          "This keeps the experience family-centered rather than abstract, which is important for trust.",
        steps: [
          "Use only treated water for medicine and infant feeding.",
          "Avoid using uncertain water for oral rehydration or wound cleaning.",
          "Set aside the first safe supply for the most sensitive uses."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "share",
        title: "Coordinate with one message",
        description: "Use the summary to keep family members and volunteers aligned on what is safe right now.",
        detail:
          "The sharing flow adds a product moment that reads well in both a presentation and a real household workflow.",
        steps: [
          "Copy the summary into the group's existing communication channel.",
          "Confirm which container is the protected drinking-water source.",
          "Replace the guidance when a new verified update comes in."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "Why is floodwater risk different?",
      "How should we separate cleanup water?",
      "Explain this in Portuguese.",
      "What should we do with medicine water?"
    ],
    searchAliases: ["beira", "mozambique coast", "2100", "flood recovery"]
  },
  {
    id: "port-au-prince-haiti",
    name: "Port-au-Prince, Haiti",
    country: "Haiti",
    countryIso2: "HT",
    countryIso3: "HTI",
    flag: "🇭🇹",
    utility: "Urban neighborhoods with intermittent service and storage dependence",
    recordLabel: "Intermittent access and household storage pressure",
    coordinates: { lat: 18.5944, lng: -72.3074 },
    status: "caution",
    statusLabel: "Caution",
    qualityIndex: 58,
    metrics: { lead: "4.8", chlorine: "0.3", ph: "7.2", updated: "Apr 10, 9:05 AM" },
    tag: "Urban continuity",
    oneLiner:
      "Intermittent access changes how families store and protect water, so guidance has to focus on continuity as much as purity.",
    heroTitle: "Water guidance for interrupted service.",
    heroDescription:
      "Aqua Guide helps households manage supply interruptions, storage discipline, and safe reuse rules without drowning them in jargon.",
    summaryTitle: "What households should know",
    summaryText:
      "When service is intermittent, the biggest risks often come from how water is stored and reused inside the household. Aqua Guide keeps the response simple: protect the cleanest available water for direct consumption, use separate containers for lower-priority needs, and make sure the household is working from one shared summary of the current plan.",
    quickSummary:
      "Protect the cleanest water for direct consumption, separate containers by use, and keep one shared plan for the household.",
    highlights: [
      {
        tone: "caution",
        title: "Intermittent access pressure",
        detail: "Households may need to store water longer and reuse containers more often.",
        icon: "alert"
      },
      {
        tone: "info",
        title: "Storage is central",
        detail: "Container hygiene and separation rules can shape the real risk profile.",
        icon: "box"
      },
      {
        tone: "teal",
        title: "Shared understanding matters",
        detail: "One clear household plan reduces avoidable mistakes.",
        icon: "share"
      }
    ],
    sources: [
      { label: "UNICEF urban WASH updates", icon: "globe" },
      { label: "WHO drinking-water guidance", icon: "file" },
      { label: "Community service continuity notes", icon: "monitor" }
    ],
    actionsTitle: "Priority household actions",
    actionsSubtitle: "Protect the cleanest water and avoid cross-use between containers.",
    actions: [
      {
        id: "treat",
        title: "Reserve the safest water for direct use",
        description: "Keep the cleanest treated water only for drinking, cooking, and medicine.",
        detail:
          "This action reinforces the product's core value: help households rank water uses when the supply is limited.",
        steps: [
          "Pick the cleanest treated source for drinking and cooking only.",
          "Do not use this protected supply for washing or cleanup.",
          "Refill and protect this container before lower-priority uses."
        ],
        tone: "red",
        icon: "alert"
      },
      {
        id: "store",
        title: "Use separate containers by purpose",
        description: "Label or mentally assign containers so drinking water stays isolated from general use.",
        detail:
          "The product should guide container discipline because that's where households can lose a safe supply quickly.",
        steps: [
          "Dedicate one container to direct consumption only.",
          "Use separate containers for washing, cleaning, or sanitation.",
          "Clean and dry drinking-water containers before refilling."
        ],
        tone: "blue",
        icon: "box"
      },
      {
        id: "protect",
        title: "Prioritize medicine and hydration",
        description: "Use the protected supply first for hydration, medicine, and anyone who is already weak or sick.",
        detail:
          "This keeps the platform practical, not merely informational, by focusing on hard household tradeoffs.",
        steps: [
          "Use protected water first for medicine, rehydration, and infant care.",
          "Do not dilute medicine or formula with uncertain water.",
          "Treat the next batch before the protected supply runs out."
        ],
        tone: "amber",
        icon: "baby"
      },
      {
        id: "share",
        title: "Keep one household plan",
        description: "Share the summary so everyone handling water follows the same rules.",
        detail:
          "A clear plan reduces friction inside the home and gives the product a memorable communication role.",
        steps: [
          "Copy the current summary into the household chat or write it down visibly.",
          "Clarify which container is the protected drinking-water source.",
          "Update the plan when the service pattern changes."
        ],
        tone: "green",
        icon: "share"
      }
    ],
    aiSuggestions: [
      "How should we label stored water?",
      "What should be saved for medicine use?",
      "Explain this in French.",
      "What if service returns for only a few hours?"
    ],
    searchAliases: ["haiti", "port au prince", "pap", "urban storage"]
  }
];

const statusRank = {
  advisory: 3,
  caution: 2,
  safe: 1
};

export function getRegionById(id) {
  return regions.find((region) => region.id === id) ?? regions[0];
}

export function findRegionByQuery(query) {
  const normalized = String(query ?? "").trim().toLowerCase();
  if (!normalized) return null;

  return (
    regions.find((region) => region.id === normalized) ||
    regions.find(
      (region) =>
        region.name.toLowerCase() === normalized ||
        region.country.toLowerCase() === normalized ||
        region.searchAliases.some((alias) => alias.toLowerCase() === normalized)
    ) ||
    regions.find(
      (region) =>
        region.name.toLowerCase().includes(normalized) ||
        region.country.toLowerCase().includes(normalized) ||
        region.searchAliases.some((alias) => alias.toLowerCase().includes(normalized))
    ) ||
    null
  );
}

export function sortRegionsByPriority(items = regions) {
  return [...items].sort((left, right) => {
    const rankGap = (statusRank[right.status] ?? 0) - (statusRank[left.status] ?? 0);
    if (rankGap !== 0) return rankGap;
    return right.qualityIndex - left.qualityIndex;
  });
}

export function getMostCriticalRegion() {
  return sortRegionsByPriority(regions)[0];
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

export function getDistanceKm(from, to) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(dLng / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearestRegion(coords) {
  return regions
    .map((region) => ({
      region,
      distanceKm: getDistanceKm(coords, region.coordinates)
    }))
    .sort((left, right) => left.distanceKm - right.distanceKm)[0];
}
