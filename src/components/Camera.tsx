import React, { useRef, useState } from "react";
import { Camera as CameraIcon, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(prev => (prev === "user" ? "environment" : "user"));
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        onCapture(imageData);
        stopCamera();
      }
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  return (
    <div className="fixed inset-0 bg-black z-50 animate-fade-up">
      <div className="relative h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="h-full w-full object-cover"
          onPlay={() => setIsStreaming(true)}
        />
        
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70"
            onClick={switchCamera}
          >
            <RotateCw className="h-6 w-6" />
          </Button>
          
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-white hover:bg-gray-200"
            onClick={captureImage}
          >
            <CameraIcon className="h-8 w-8 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Camera;