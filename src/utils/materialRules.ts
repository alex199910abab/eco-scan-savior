interface MaterialRule {
  type: string;
  keywords: string[];
}

export const materialRules: MaterialRule[] = [
  {
    type: "plastic",
    keywords: [
      "plastic", "bottle", "container", "polymer", "pet", "hdpe", "pvc",
      "cup", "water bottle", "soda bottle", "packaging"
    ]
  },
  {
    type: "paper",
    keywords: [
      "paper", "cardboard", "box", "carton", "newspaper", "magazine",
      "book", "envelope", "document", "notebook", "tissue"
    ]
  },
  {
    type: "metal",
    keywords: [
      "metal", "can", "aluminum", "tin", "steel", "iron", "copper",
      "soda can", "food can", "foil", "wire", "container"
    ]
  },
  {
    type: "glass",
    keywords: [
      "glass", "bottle", "jar", "window", "mirror", "container",
      "wine bottle", "beer bottle", "drinking glass"
    ]
  },
  {
    type: "organic",
    keywords: [
      "food", "fruit", "vegetable", "meat", "leaf", "plant",
      "wood", "grass", "flower", "garden"
    ]
  }
];

export const getMaterialFromLabel = (label: string, score: number): string => {
  // Require higher confidence for classification
  if (score < 0.3) {
    console.log("Low confidence score:", score);
    return "general waste";
  }

  // Check each material type
  for (const rule of materialRules) {
    if (rule.keywords.some(keyword => label.includes(keyword))) {
      console.log("Matched material:", rule.type, "for label:", label);
      return rule.type;
    }
  }

  // Additional context-based rules
  if (label.includes("drink") || label.includes("beverage")) {
    if (label.includes("plastic") || label.includes("pet")) return "plastic";
    if (label.includes("glass")) return "glass";
    if (label.includes("can") || label.includes("tin")) return "metal";
  }

  console.log("No material match found for label:", label);
  return "general waste";
};