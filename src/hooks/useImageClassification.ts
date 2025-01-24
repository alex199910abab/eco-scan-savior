import { useState, useEffect } from "react";
import { pipeline } from "@huggingface/transformers";
import { ClassificationOutput } from "../types/classification";
import { getMaterialFromLabel } from "../utils/materialRules";

export const useImageClassification = (imageData: string, onResult: (material: string) => void) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        const classifier = await pipeline(
          "image-classification",
          "Xenova/resnet-50",
          { device: "wasm" }
        );
        
        const results = await classifier(imageData) as ClassificationOutput;
        console.log("Classification results:", results);
        
        const topResult = Array.isArray(results) ? results[0] : results;
        const label = topResult?.label?.toLowerCase() || "";
        const score = topResult?.score || 0;
        
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

  return { isAnalyzing };
};