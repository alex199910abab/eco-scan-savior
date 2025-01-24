import React, { useState } from "react";
import { pipeline } from "@huggingface/transformers";
import { Loader2 } from "lucide-react";

interface MaterialDetectionProps {
  imageData: string;
  onResult: (material: string) => void;
}

const MaterialDetection: React.FC<MaterialDetectionProps> = ({ imageData, onResult }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  React.useEffect(() => {
    const analyzeImage = async () => {
      try {
        const classifier = await pipeline(
          "image-classification",
          "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
          { device: "webgpu" }
        );
        
        const results = await classifier(imageData);
        const material = getMaterialFromLabel(results[0].score > 0.5 ? results[0].label : "unknown");
        onResult(material);
      } catch (error) {
        console.error("Error analyzing image:", error);
        onResult("unknown");
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeImage();
  }, [imageData, onResult]);

  const getMaterialFromLabel = (label: string): string => {
    if (label.includes("plastic") || label.includes("bottle")) return "plastic";
    if (label.includes("paper") || label.includes("cardboard")) return "paper";
    if (label.includes("metal") || label.includes("can")) return "metal";
    if (label.includes("glass")) return "glass";
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