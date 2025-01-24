import React from "react";
import { Loader2 } from "lucide-react";
import { MaterialDetectionProps } from "../types/classification";
import { useImageClassification } from "../hooks/useImageClassification";

const MaterialDetection: React.FC<MaterialDetectionProps> = ({ imageData, onResult }) => {
  const { isAnalyzing } = useImageClassification(imageData, onResult);

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