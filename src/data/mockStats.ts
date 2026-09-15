// This file generates deterministic mock community stats based on a skin's name and edition.

export type Tier = "S" | "A" | "B" | "C";

export interface MockSkinStats {
  tier: Tier;
  pickRate: number; // Percentage (0-100)
  avgEquipTimeDays: number;
  rating: number; // 0-5
}

// Simple hash function for deterministic randomness
function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash);
}

export function generateMockStats(skinName: string, edition: string): MockSkinStats {
  const hash = hashStr(skinName);
  const editionLower = edition.toLowerCase();
  
  // Base stats based on edition
  let basePickRate = 5;
  let baseTierScore = 2; // C=0, B=1, A=2, S=3

  if (editionLower.includes("exclusive") || editionLower.includes("ultra")) {
    basePickRate = 20;
    baseTierScore = 3; 
  } else if (editionLower.includes("premium")) {
    basePickRate = 12;
    baseTierScore = Math.random() > 0.3 ? 2 : 3; 
  } else if (editionLower.includes("deluxe")) {
    basePickRate = 5;
    baseTierScore = 1; 
  } else if (editionLower.includes("select")) {
    basePickRate = 2;
    baseTierScore = 0;
  }

  // Add deterministic variance based on skin name hash
  const pickRateVariance = (hash % 100) / 10; // 0 to 9.9
  let finalPickRate = basePickRate + pickRateVariance;
  
  // Some skins are just inherently popular regardless of tier (e.g. Kuronami, Reaver, Prime)
  const popularKeywords = ["reaver", "prime", "kuronami", "rgx", "glitchpop", "ion", "oni"];
  const isPopular = popularKeywords.some(kw => skinName.toLowerCase().includes(kw));
  if (isPopular) {
    finalPickRate += 15;
    baseTierScore = 3;
  }

  // Cap pick rate
  finalPickRate = Math.min(finalPickRate, 45.0);

  // Determine tier
  let finalTierScore = baseTierScore;
  if (hash % 10 > 7 && finalTierScore < 3) finalTierScore++; // 30% chance to bump up a tier
  
  let tier: Tier = "C";
  if (finalTierScore === 3) tier = "S";
  else if (finalTierScore === 2) tier = "A";
  else if (finalTierScore === 1) tier = "B";

  const rating = 2 + (hash % 30) / 10 + (finalTierScore * 0.5); // 2.0 to 5.0
  const avgEquipTimeDays = 1 + (hash % 14) + (finalTierScore * 2);

  return {
    tier,
    pickRate: parseFloat(finalPickRate.toFixed(1)),
    avgEquipTimeDays,
    rating: Math.min(parseFloat(rating.toFixed(1)), 5.0)
  };
}
