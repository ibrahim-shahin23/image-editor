
import React, { useRef, useEffect } from "react";

interface ImageCanvasProps {
  imageRef: React.MutableRefObject<HTMLImageElement | null>;
  activeFilter: string;
  brightness: number;
  contrast: number;
  saturation: number;
  rotation: number;
  zoom: number;
}

export default function ImageCanvas({
  imageRef,
  activeFilter,
  brightness,
  contrast,
  saturation,
  rotation,
  zoom
}: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    renderImage();
  }, [imageRef.current, activeFilter, brightness, contrast, saturation, rotation, zoom]);
  
  const renderImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !imageRef.current) return;
    
    // Calculate canvas size based on image dimensions
    const imgWidth = imageRef.current.width;
    const imgHeight = imageRef.current.height;
    
    // Set canvas dimensions
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Apply rotation if needed
    if (rotation !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }
    
    // Apply zoom
    ctx.scale(zoom, zoom);
    
    // Draw the image
    ctx.drawImage(
      imageRef.current,
      0,
      0,
      imgWidth,
      imgHeight
    );
    
    // Apply filters
    if (activeFilter !== "None" || brightness !== 100 || contrast !== 100 || saturation !== 100) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Apply brightness
        const brightnessValue = brightness / 100;
        data[i] *= brightnessValue; // red
        data[i + 1] *= brightnessValue; // green
        data[i + 2] *= brightnessValue; // blue
        
        // Apply filters
        if (activeFilter === "Grayscale") {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg; // red
          data[i + 1] = avg; // green
          data[i + 2] = avg; // blue
        } else if (activeFilter === "Sepia") {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
        
        // More filters can be added here
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
    
    // Restore context state
    ctx.restore();
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="max-w-full max-h-full editor-shadow bg-white"
    />
  );
}
