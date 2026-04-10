import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = resolve(root, "data");
const worldAtlasPath = resolve(root, "node_modules", "world-atlas", "countries-110m.json");
const currentYear = new Date().getUTCFullYear();

const COUNTRY_URL =
  "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,ccn3,flag,latlng,region,subregion,population,capital";

const indicatorIds = {
  drinkingWater: "SH.H2O.BASW.ZS",
  sanitation: "SH.STA.BASS.ZS",
  population: "SP.POP.TOTL"
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(Number(value || 0));
}

function formatPercent(value) {
  return Number.isFinite(value) ? `${Math.round(value)}%` : "";
}

function normalizeName(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("&", "and")
    .replaceAll("st.", "saint")
    .replaceAll("u.s.", "united states")
    .replace(/[()'.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }
  return response.json();
}

function parseSeriesRows(series) {
  return (Array.isArray(series?.[1]) ? series[1] : [])
    .map((row) => ({
      iso3: String(row?.countryiso3code || "").trim().toUpperCase(),
      value: Number(row?.value),
      year: Number(row?.date)
    }))
    .filter((row) => row.iso3.length === 3 && Number.isFinite(row.value) && Number.isFinite(row.year))
    .sort((left, right) => right.year - left.year);
}

function pickBestIndicatorPoint(rows, options = {}) {
  const { min = -Infinity, max = Infinity, preferPositive = false } = options;
  const plausible = rows.filter((row) => row.year <= currentYear && row.value >= min && row.value <= max);
  if (!plausible.length) return null;

  if (preferPositive) {
    const positive = plausible.find((row) => row.value > 0);
    if (positive) return positive;
  }

  return plausible[0];
}

async function fetchWorldBankIndicator(indicatorId, options = {}) {
  const payload = await fetchJson(`https://api.worldbank.org/v2/country/all/indicator/${indicatorId}?format=json&per_page=20000`);
  const rows = parseSeriesRows(payload);
  const byIso3 = new Map();

  for (const row of rows) {
    if (byIso3.has(row.iso3)) continue;

    const sameCountryRows = rows.filter((candidate) => candidate.iso3 === row.iso3);
    const best = pickBestIndicatorPoint(sameCountryRows, options);
    if (best) {
      byIso3.set(row.iso3, best);
    }
  }

  return byIso3;
}

function deriveRiskProfile(drinkingWaterValue, sanitationValue) {
  let baseline = 62;
  if (Number.isFinite(drinkingWaterValue) && Number.isFinite(sanitationValue)) {
    baseline = drinkingWaterValue * 0.62 + sanitationValue * 0.38;
  } else if (Number.isFinite(drinkingWaterValue)) {
    baseline = drinkingWaterValue;
  } else if (Number.isFinite(sanitationValue)) {
    baseline = sanitationValue;
  }

  const qualityIndex = clamp(Math.round(baseline), 28, 96);
  const status = qualityIndex < 55 ? "advisory" : qualityIndex < 75 ? "caution" : "safe";
  const statusLabel = status === "advisory" ? "Advisory" : status === "caution" ? "Caution" : "Safer";
  const riskScore = 100 - qualityIndex;
  return {
    qualityIndex,
    qualityIndexLabel: `${qualityIndex}/100`,
    status,
    statusLabel,
    riskScore,
    riskLabel: `${riskScore}/100`
  };
}

function buildSummary(country, drinkingWaterValue, sanitationValue, statusLabel) {
  if (!Number.isFinite(drinkingWaterValue) && !Number.isFinite(sanitationValue)) {
    return `Country-level access metrics for ${country} were limited in the latest public pull. Aqua Guide can still open guidance and assistant support for this country.`;
  }

  return `${country} is currently tagged ${statusLabel.toLowerCase()} based on the latest plausible country-level drinking water and sanitation access data available in Aqua Guide.`;
}

async function build() {
  const [countries, atlasJson, drinkingWaterMap, sanitationMap, populationMap] = await Promise.all([
    fetchJson(COUNTRY_URL),
    readFile(worldAtlasPath, "utf8").then(JSON.parse),
    fetchWorldBankIndicator(indicatorIds.drinkingWater, { min: 0, max: 100, preferPositive: true }),
    fetchWorldBankIndicator(indicatorIds.sanitation, { min: 0, max: 100, preferPositive: true }),
    fetchWorldBankIndicator(indicatorIds.population, { min: 1, max: Number.MAX_SAFE_INTEGER, preferPositive: true })
  ]);

  const allCountries = Array.isArray(countries) ? countries : [];
  const records = allCountries
    .filter((country) => String(country?.cca3 || "").trim().length === 3)
    .map((country) => {
      const iso3 = String(country.cca3).toUpperCase();
      const iso2 = String(country.cca2 || "").toUpperCase();
      const numericCode = String(country?.ccn3 || "").padStart(3, "0");
      const drinkingWater = drinkingWaterMap.get(iso3) || null;
      const sanitation = sanitationMap.get(iso3) || null;
      const population = populationMap.get(iso3) || null;
      const lat = Number(country?.latlng?.[0]);
      const lng = Number(country?.latlng?.[1]);
      const risk = deriveRiskProfile(drinkingWater?.value, sanitation?.value);

      return {
        iso2,
        iso3,
        numericCode,
        country: country?.name?.common || iso3,
        normalizedName: normalizeName(country?.name?.common || iso3),
        flag: country?.flag || "🌍",
        capital: Array.isArray(country?.capital) ? country.capital[0] || "" : "",
        lat: Number.isFinite(lat) ? lat : null,
        lng: Number.isFinite(lng) ? lng : null,
        region: country?.region || "",
        subregion: country?.subregion || "",
        drinkingWaterValue: Number.isFinite(drinkingWater?.value) ? Number(drinkingWater.value.toFixed(1)) : null,
        drinkingWaterYear: drinkingWater?.year || null,
        drinkingWaterDisplay: Number.isFinite(drinkingWater?.value) ? formatPercent(drinkingWater.value) : "",
        sanitationValue: Number.isFinite(sanitation?.value) ? Number(sanitation.value.toFixed(1)) : null,
        sanitationYear: sanitation?.year || null,
        sanitationDisplay: Number.isFinite(sanitation?.value) ? formatPercent(sanitation.value) : "",
        populationValue: Number.isFinite(population?.value) ? population.value : Number(country?.population || 0) || null,
        populationYear: population?.year || null,
        populationDisplay: Number.isFinite(population?.value)
          ? formatCompactNumber(population.value)
          : Number(country?.population || 0)
            ? formatCompactNumber(country.population)
            : "",
        ...risk,
        summary: buildSummary(country?.name?.common || iso3, drinkingWater?.value, sanitation?.value, risk.statusLabel)
      };
    })
    .sort((left, right) => left.country.localeCompare(right.country));

  await mkdir(dataDir, { recursive: true });
  await writeFile(
    resolve(dataDir, "country-water-index.js"),
    `export const countryWaterIndex = ${JSON.stringify(records, null, 2)};\n\n` +
      `const countryWaterIndexMap = new Map(countryWaterIndex.map((country) => [country.iso3, country]));\n` +
      `const countryWaterIndexNumericMap = new Map(countryWaterIndex.map((country) => [country.numericCode, country]));\n\n` +
      `export function getCountryWaterRecord(iso3) {\n` +
      `  return countryWaterIndexMap.get(String(iso3 || "").toUpperCase()) || null;\n` +
      `}\n\n` +
      `export function getCountryWaterRecordByNumericCode(numericCode) {\n` +
      `  return countryWaterIndexNumericMap.get(String(numericCode || "").padStart(3, "0")) || null;\n` +
      `}\n\n` +
      `export function getCountryHotspots(limit = 10) {\n` +
      `  return [...countryWaterIndex]\n` +
      `    .filter((country) => Number.isFinite(country.riskScore))\n` +
      `    .sort((left, right) => right.riskScore - left.riskScore)\n` +
      `    .slice(0, limit);\n` +
      `}\n`,
    "utf8"
  );
  await writeFile(resolve(dataDir, "world-countries.topo.json"), JSON.stringify(atlasJson), "utf8");

  console.log(`Wrote ${records.length} countries and compact world topology.`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
