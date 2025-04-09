
import React from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download } from "lucide-react";

interface EditorToolbarProps {
  onBack: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
}

export default function EditorToolbar({
  onBack,
  zoom,
  onZoomIn,
  onZoomOut,
  onDownload
}: EditorToolbarProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between bg-white">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <span className="text-sm font-medium w-16 text-center">
          {Math.round(zoom * 100)}%
        </span>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={onZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="default" 
          onClick={onDownload}
          className="ml-2 bg-editor-primary hover:bg-editor-dark"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
