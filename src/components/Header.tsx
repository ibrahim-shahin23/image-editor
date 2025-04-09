
import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { toast } = useToast();
  
  return (
    <header className="border-b bg-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ImageIcon className="h-6 w-6 text-editor-primary" />
        <h1 className="text-xl font-bold">SnapShade Studio</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="outline"
          onClick={() => {
            toast({
              title: "Coming Soon",
              description: "Save to cloud feature will be available soon!",
            });
          }}
        >
          Save Project
        </Button>
        <Button 
          variant="default"
          className="bg-editor-primary hover:bg-editor-dark"
        >
          Export Image
        </Button>
      </div>
    </header>
  );
}
