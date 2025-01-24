interface MaterialRule {
  type: string;
  keywords: string[];
}

export const materialRules: MaterialRule[] = [
  {
    type: "plastic",
    keywords: ["plastic", "bottle", "container", "polymer", "pet", "hdpe", "pvc", "cup"]
  },
  {
    type: "paper",
    keywords: ["paper", "cardboard", "box", "carton", "newspaper", "magazine", "book"]
  },
  {
    type: "metal",
    keywords: ["metal", "can", "aluminum", "tin", "steel", "iron", "copper"]
  },
  {
    type: "glass",
    keywords: ["glass", "bottle", "jar", "window", "mirror"]
  }
];

export const getMaterialFromLabel = (label: string, score: number): string => {
  // If confidence is too low, return general waste
  if (score < 0.4) {
    return "general waste";
  }

  // Check each material type
  for (const rule of materialRules) {
    if (rule.keywords.some(keyword => label.includes(keyword))) {
      return rule.type;
    }
  }

  // Additional context-based rules
  if (label.includes("drink") || label.includes("beverage")) {
    if (label.includes("plastic") || label.includes("pet")) return "plastic";
    if (label.includes("glass")) return "glass";
    if (label.includes("can") || label.includes("tin")) return "metal";
  }

  return "general waste";
};