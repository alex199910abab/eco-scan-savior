import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CameraComponent from "@/components/Camera";
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
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-6 w-6"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                Scan Item
              </span>
            </Button>
            
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Sparkles className="h-4 w-4 mr-2" />
              Using AI to identify materials
            </div>
          </div>
        )}

        {showCamera && (
          <CameraComponent
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