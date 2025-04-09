
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Crop, 
  RotateCcw, 
  Sliders, 
  Type, 
  Wand2 
} from "lucide-react";

type EditToolsProps = {
  activeFilter: string;
  brightness: number;
  contrast: number;
  saturation: number;
  onFilterChange: (filter: string) => void;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
  onRotateLeft: () => void;
  onCrop: () => void;
  onAddText: () => void;
};

export default function EditTools({
  activeFilter,
  brightness,
  contrast,
  saturation,
  onFilterChange,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
  onRotateLeft,
  onCrop,
  onAddText
}: EditToolsProps) {
  return (
    <div className="border-l bg-white p-4 w-64 flex flex-col h-full">
      <Tabs defaultValue="adjust" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="adjust">
            <Sliders className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="filters">
            <Wand2 className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="crop">
            <Crop className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="text">
            <Type className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <div className="space-y-4 py-2" data-tab="adjust">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="brightness">Brightness</Label>
              <span className="text-xs text-muted-foreground">{brightness}%</span>
            </div>
            <Slider
              id="brightness"
              min={0}
              max={200}
              step={1}
              value={[brightness]}
              onValueChange={(value) => onBrightnessChange(value[0])}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="contrast">Contrast</Label>
              <span className="text-xs text-muted-foreground">{contrast}%</span>
            </div>
            <Slider
              id="contrast"
              min={0}
              max={200}
              step={1}
              value={[contrast]}
              onValueChange={(value) => onContrastChange(value[0])}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="saturation">Saturation</Label>
              <span className="text-xs text-muted-foreground">{saturation}%</span>
            </div>
            <Slider
              id="saturation"
              min={0}
              max={200}
              step={1}
              value={[saturation]}
              onValueChange={(value) => onSaturationChange(value[0])}
              className="w-full"
            />
          </div>
          
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full mb-2"
              onClick={onRotateLeft}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Rotate Left
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={onCrop}
            >
              <Crop className="mr-2 h-4 w-4" />
              Crop
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 py-2" data-tab="filters">
          {["None", "Grayscale", "Sepia", "Vintage", "Blur", "Invert"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={activeFilter === filter ? "bg-editor-primary hover:bg-editor-dark" : ""}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        
        <div className="py-2" data-tab="text">
          <Button
            variant="outline"
            className="w-full"
            onClick={onAddText}
          >
            <Type className="mr-2 h-4 w-4" />
            Add Text
          </Button>
        </div>
      </Tabs>
    </div>
  );
}
