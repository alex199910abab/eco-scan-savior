import React, { useState } from "react";
import { pipeline } from "@huggingface/transformers";
import { Loader2 } from "lucide-react";

interface MaterialDetectionProps {
  imageData: string;
  onResult: (material: string) => void;
}

// Define proper types for the classification results
interface ClassificationResult {
  label: string;
  score: number;
}

type ClassificationOutput = ClassificationResult[] | ClassificationResult;

const MaterialDetection: React.FC<MaterialDetectionProps> = ({ imageData, onResult }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  React.useEffect(() => {
    const analyzeImage = async () => {
      try {
        // Using a more suitable model for material classification
        const classifier = await pipeline(
          "image-classification",
          "microsoft/resnet-50",
          { device: "webgpu" }
        );
        
        const results = await classifier(imageData) as ClassificationOutput;
        console.log("Classification results:", results);
        
        // Get the top result
        const topResult = Array.isArray(results) ? results[0] : results;
        const label = topResult?.label?.toLowerCase() || "";
        const score = topResult?.score || 0;
        
        // More comprehensive material mapping
        const material = getMaterialFromLabel(label, score);
        console.log("Detected material:", material);
        onResult(material);
      } catch (error) {
        console.error("Error analyzing image:", error);
        onResult("general waste");
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeImage();
  }, [imageData, onResult]);

  const getMaterialFromLabel = (label: string, score: number): string => {
    // If confidence is too low, return general waste
    if (score < 0.4) {
      return "general waste";
    }

    // More comprehensive material detection rules
    const materialRules = [
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

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center p-8 animate-fade-up">
        <Loader2 className="h-8 w-8 animate-spin text-eco-primary" />
        <p className="mt-4 text-lg">Analyzing your item...</p>
      </div>
    );
  }

  return null;
};

export default MaterialDetection;