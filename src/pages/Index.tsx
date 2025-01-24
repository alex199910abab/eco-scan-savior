import React, { useState } from "react";
import { Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Camera from "@/components/Camera";
import MaterialDetection from "@/components/MaterialDetection";
import Results from "@/components/Results";

const Index = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [material, setMaterial] = useState<string | null>(null);

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setMaterial(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">EcoSort</h1>
          <p className="text-gray-600">
            Scan your waste items to learn how to dispose of them properly
          </p>
        </div>

        {!capturedImage && !showCamera && (
          <div className="space-y-4 animate-fade-up">
            <Button
              onClick={() => setShowCamera(true)}
              className="w-full h-16 bg-eco-primary hover:bg-eco-dark text-white text-lg"
            >
              <Camera className="mr-2 h-6 w-6" />
              Scan Item
            </Button>
            
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Sparkles className="h-4 w-4 mr-2" />
              Using AI to identify materials
            </div>
          </div>
        )}

        {showCamera && (
          <Camera
            onCapture={handleCapture}
            onClose={() => setShowCamera(false)}
          />
        )}

        {capturedImage && !material && (
          <MaterialDetection
            imageData={capturedImage}
            onResult={setMaterial}
          />
        )}

        {material && (
          <Results
            material={material}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default Index;