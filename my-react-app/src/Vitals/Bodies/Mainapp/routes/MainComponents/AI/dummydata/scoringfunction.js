import { vibeMap } from "./vibeMap";
import { colorGroups } from "./colorGroups";
import { namedColors } from "./namedColors";

/**
 * Intelligent Wardrobe Scoring Engine (v3)
 * - Adds hue harmony logic + color groups
 * - Adds outfit compatibility scoring
 * - Logs debug info in dev mode
 */

export function scoreItem(wardrobe, filters = {}, weights = {}) {
  const config = {
    preFilters: ['gender', 'temperature'],
    strictFilters: ['season'],
    defaultWeights: {
      gender: 1,
      season: 1.5,
      occasion: 4,
      temperature: 3,
      price: 2,
      brand: 3,
      color: 6,
      material: 4,
      type: 4,
      style: 3,
      weather: 2,
      sustainability: 1.5,
      fit: 2,
      metadataBonus: 0.8,
      harmonyBonus: 2.5,
      vibeBonus: 4,
      synergyBonus: 3
    }
  };

  const activeWeights = { ...config.defaultWeights, ...weights };

  const preFiltered = wardrobe.filter(item => {
    for (const key of config.preFilters) {
      const fVal = filters[key];
      const iVal = item[key];
      if (!fVal || fVal === "any" || fVal === "all") continue;
      if (iVal === undefined) continue;
      if (key === "temperature") {
        if (!temperatureInRange(iVal, fVal)) return false;
      } else {
        if (flexibleMatch(iVal, fVal) === 0 && iVal !== "unisex") return false;
      }
    }
    return true;
  });

  const strictlyFiltered = preFiltered.filter(item => {
    for (const key of config.strictFilters) {
      const fVal = filters[key];
      const iVal = item[key];
      if (!fVal || fVal === "any" || fVal === "all") continue;
      if (!iVal || exactMatch(iVal, fVal) === false) return false;
    }
    return true;
  });

  const scoreableKeys = Object.keys(filters).filter(
    key => !config.strictFilters.includes(key)
  );

 

  const scoredItems = strictlyFiltered.map((item, _, arr) => {
    const dimensionScores = scoreableKeys.map(key => {
      const scorer = getScorer(key);
      const score = scorer(item[key], filters[key]);
      const weight = activeWeights[key] || 1;
      return { dimension: key, score, weight };
    });

    const totalWeight = dimensionScores.reduce((acc, d) => acc + d.weight, 0);
    const weightedScoreSum = dimensionScores.reduce((acc, d) => acc + d.score * d.weight, 0);
    const baseScore = totalWeight > 0 ? weightedScoreSum / totalWeight : 0;

    let boostedScore = baseScore;

// Boost score if occasion matches exactly
if (item.occasion?.toLowerCase?.() === filters.occasion?.toLowerCase?.()) {
  boostedScore += 2; // You can adjust this value if needed
}

    const bonuses = {
      completeness: calculateCompleteness(item) * (activeWeights.metadataBonus || 0),
      harmony: activeWeights.color > 5 ? 0 : calculateHarmony(item) * (activeWeights.harmonyBonus || 0),
      vibe: calculateVibe(item, filters.occasion) * (activeWeights.vibeBonus || 0),
      synergy: calculateSynergy(item, arr) * (activeWeights.synergyBonus || 0)
    };

    const bonusSum = Object.values(bonuses).reduce((sum, b) => sum + b, 0);

    return {
      ...item,
      score: Math.min(Math.round((boostedScore * 8 + bonusSum) * 100) / 100, 10),

      scoringDetails: process.env.NODE_ENV === "development"
        ? { dimensions: dimensionScores, bonuses }
        : undefined
    };
  });

  return scoredItems.sort((a, b) => {
  const occasionFilter = filters.occasion?.toLowerCase?.();

  const aOccasionMatch = a.occasion?.toLowerCase?.() === occasionFilter ? 1 : 0;
  const bOccasionMatch = b.occasion?.toLowerCase?.() === occasionFilter ? 1 : 0;

  // Prioritize occasion match first, then score
  if (aOccasionMatch !== bOccasionMatch) {
    return bOccasionMatch - aOccasionMatch;
  }

  return b.score - a.score;
});


  function exactMatch(a, b) {
    if (a === undefined || b === undefined) return false;
    if (Array.isArray(b)) return b.some(val => val.toLowerCase() === a.toLowerCase());
    return a.toLowerCase() === b.toLowerCase();
  }

  function flexibleMatch(a, b) {
    if (!b || b === "any" || b === "all") return 1;
    if (!a) return 0;
    if (Array.isArray(b)) return b.some(val => flexibleMatch(a, val)) ? 1 : 0;
    const aStr = a.toString().toLowerCase();
    const bStr = b.toString().toLowerCase();
    if (aStr === bStr) return 1;
    if (aStr.includes(bStr) || bStr.includes(aStr)) return 0.8;
    return 0;
  }

  function temperatureInRange(itemTemp, filterTemp) {
    const [min, max] = Array.isArray(itemTemp)
      ? itemTemp
      : [itemTemp - 5, itemTemp + 5];
    return filterTemp >= min - 5 && filterTemp <= max + 5;
  }

  function getColorGroup(color) {
    if (!color) return null;
    color = color.toLowerCase();
    return Object.entries(colorGroups).find(([, group]) =>
      group.includes(color)
    )?.[0] || null;
  }

  function getScorer(key) {
    if (key === "color") {
      return (itemColor, filterColor) => {
        if (!filterColor || filterColor === "any") return 1;
        if (!itemColor) return 0;

        const itemColorLC = itemColor.toLowerCase();
        const filterColorLC = filterColor.toLowerCase();

        const itemHex = namedColors[itemColorLC];
        const filterHex = namedColors[filterColorLC];

        const itemHue = itemHex ? hexToHSL(itemHex).h : null;
        const filterHue = filterHex ? hexToHSL(filterHex).h : null;

        const hueScore = (itemHue !== null && filterHue !== null)
          ? getHueHarmonyScore(itemHue, filterHue)
          : 0.3;

        let groupScore = 0;
        if (activeWeights.color <= 5) {
          const groupA = getColorGroup(itemColorLC);
          const groupB = getColorGroup(filterColorLC);
          groupScore = (groupA && groupB && groupA === groupB) ? 0.3 : 0;
        }

        const finalColorScore = Math.min(hueScore + groupScore, 1);

        if (process.env.NODE_ENV === "development") {
          console.log("[Color Debug]", {
            itemColor, filterColor,
            itemHex, filterHex,
            itemHue, filterHue,
            hueScore, groupScore, finalColorScore
          });
        }

        return finalColorScore;
      };
    }

    if (key === "price") {
      return (itemPrice, filterPrice) => {
        if (filterPrice === undefined) return 1;
        if (itemPrice === undefined) return 0;
        const diff = itemPrice - filterPrice;
        if (diff <= 0) return 1;
        if (diff <= 15) return 0.7;
        if (diff <= 30) return 0.4;
        return 0;
      };
    }

    if (key === "temperature") {
      return (itemTemp, filterTemp) => {
        if (filterTemp === undefined) return 1;
        if (itemTemp === undefined) return 0;
        const [min, max] = Array.isArray(itemTemp)
          ? itemTemp
          : [itemTemp - 5, itemTemp + 5];
        if (filterTemp >= min && filterTemp <= max) return 1;
        if (filterTemp >= min - 5 && filterTemp <= max + 5) return 0.6;
        return 0.2;
      };
    }

    return flexibleMatch;
  }

  function hexToHSL(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
    const bigint = parseInt(hex, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
        case g: h = ((b - r) / d + 2); break;
        case b: h = ((r - g) / d + 4); break;
      }
      h *= 60;
    }

    return { h, s: s * 100, l: l * 100 };
  }

  function hueDistance(h1, h2) {
    const diff = Math.abs(h1 - h2);
    return Math.min(diff, 360 - diff);
  }

  function getHueHarmonyScore(h1, h2) {
    const dist = hueDistance(h1, h2);
    if (dist <= 30) return 1;
    if (Math.abs(dist - 180) <= 20) return 0.9;
    if (Math.abs(dist - 120) <= 15) return 0.7;
    if (Math.abs(dist - 60) <= 10) return 0.5;
    return 0.2;
  }

  function calculateCompleteness(item) {
    const filled = Object.keys(config.defaultWeights).filter(key => item[key] !== undefined).length;
    return filled / Object.keys(config.defaultWeights).length;
  }

  function calculateHarmony(item) {
    let score = 0;
    // Commented out color harmony to prevent penalizing high-color-importance scenarios
    // if (item.color) {
    //   const neutralColors = ['black', 'white', 'gray', 'navy', 'beige'];
    //   score += neutralColors.includes(item.color.toLowerCase()) ? 0.5 : 0.2;
    // }
    if (item.brand) {
      const premiumBrands = ['Nike', 'Zara', 'Uniqlo', 'Patagonia'];
      score += premiumBrands.includes(item.brand) ? 0.3 : 0.1;
    }
    return score;
  }

  function calculateVibe(item, occasion) {
    if (!occasion || occasion === "any" || occasion === "all" || !vibeMap[occasion]) return 0;
    const searchText = [
      item.type,
      item.itemName,
      item.material,
      item.color,
      item.brand
    ].filter(Boolean).join(" ").toLowerCase();
    const matches = vibeMap[occasion].filter(keyword =>
      searchText.includes(keyword)
    );
    return Math.min(matches.length / 3, 1);
  }

  function calculateSynergy(currentItem, allItems) {
    let synergy = 0;
    let count = 0;
    for (const other of allItems) {
      if (other.id === currentItem.id) continue;
      if (currentItem.color && other.color) {
        const hexA = namedColors[currentItem.color.toLowerCase()];
        const hexB = namedColors[other.color.toLowerCase()];
        if (hexA && hexB) {
          const hueA = hexToHSL(hexA).h;
          const hueB = hexToHSL(hexB).h;
          synergy += getHueHarmonyScore(hueA, hueB);
          count++;
        }
      }
      if (currentItem.material && other.material && currentItem.material === other.material) {
        synergy += 0.5;
        count++;
      }
      if (currentItem.brand && other.brand && currentItem.brand === other.brand) {
        synergy += 0.5;
        count++;
      }
    }
    return count > 0 ? synergy / count : 0;
  }
}