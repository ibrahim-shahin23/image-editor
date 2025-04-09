
import React, { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import EditTools from "./EditTools";
import EditorToolbar from "./editor/EditorToolbar";
import ImageCanvas from "./editor/ImageCanvas";
import { downloadCanvasImage } from "@/utils/imageUtils";

interface ImageEditorProps {
  image: File;
  onBack: () => void;
}

export default function ImageEditor({ image, onBack }: ImageEditorProps) {
  const { toast } = useToast();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeFilter, setActiveFilter] = useState("None");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const imageUrl = URL.createObjectURL(image);
    imageRef.current = new Image();
    imageRef.current.src = imageUrl;
    
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [image]);
  
  const handleDownload = () => {
    downloadCanvasImage(
      document.querySelector('canvas'),
      () => {
        toast({
          title: "Image Downloaded",
          description: "Your edited image has been downloaded.",
        });
      },
      () => {
        toast({
          title: "Download Failed",
          description: "There was an error downloading your image.",
          variant: "destructive"
        });
      }
    );
  };
  
  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360);
  };
  
  const handleCrop = () => {
    toast({
      title: "Coming Soon",
      description: "Crop functionality will be available in the next update!",
    });
  };
  
  const handleAddText = () => {
    toast({
      title: "Coming Soon",
      description: "Text overlay will be available in the next update!",
    });
  };
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div className="flex flex-1 h-full animate-fade-in">
      <div className="flex-1 flex flex-col">
        <EditorToolbar 
          onBack={onBack}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onDownload={handleDownload}
        />
        
        <div className="flex-1 flex items-center justify-center bg-secondary/50 overflow-auto p-8">
          <ImageCanvas
            imageRef={imageRef}
            activeFilter={activeFilter}
            brightness={brightness}
            contrast={contrast}
            saturation={saturation}
            rotation={rotation}
            zoom={zoom}
          />
        </div>
      </div>
      
      <EditTools
        activeFilter={activeFilter}
        brightness={brightness}
        contrast={contrast}
        saturation={saturation}
        onFilterChange={setActiveFilter}
        onBrightnessChange={setBrightness}
        onContrastChange={setContrast}
        onSaturationChange={setSaturation}
        onRotateLeft={handleRotateLeft}
        onCrop={handleCrop}
        onAddText={handleAddText}
      />
    </div>
  );
}
