
import React, { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, GIF or WebP image.",
        variant: "destructive"
      });
      return;
    }
    
    onImageUpload(file);
  }, [onImageUpload, toast]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate-fade-in">
      <Card className="w-full max-w-md bg-white editor-shadow">
        <CardContent className="flex flex-col items-center gap-6 pt-6">
          <div className="w-24 h-24 rounded-full bg-editor-light flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-editor-primary" />
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload an Image</h2>
            <p className="text-muted-foreground">
              Upload a JPG, PNG, GIF or WebP to start editing
            </p>
          </div>
          
          <div className="w-full border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <p>
              <span className="text-editor-primary font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              SVG, PNG, JPG or GIF (max. 10MB)
            </p>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
          
          <Button 
            variant="default" 
            className="w-full bg-editor-primary hover:bg-editor-dark"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
