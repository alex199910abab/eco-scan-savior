import React, { useState, useRef } from "react";
import { Camera, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import CameraComponent from "@/components/Camera";
import MaterialDetection from "@/components/MaterialDetection";
import Results from "@/components/Results";

const Index = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [material, setMaterial] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setMaterial(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">EcoSort</h1>
          <p className="text-gray-600 mb-4">
            Scan your waste items to learn how to dispose of them properly
          </p>
        </div>

        {!capturedImage && !showCamera && (
          <div className="space-y-4 animate-fade-up">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setShowCamera(true)}
                className="h-16 bg-eco-primary hover:bg-eco-dark text-white text-lg"
              >
                <Camera className="mr-2 h-6 w-6" />
                Camera
              </Button>

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="h-16 bg-eco-primary hover:bg-eco-dark text-white text-lg"
              >
                <Upload className="mr-2 h-6 w-6" />
                Upload
              </Button>
              
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            
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