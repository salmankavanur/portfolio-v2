"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onUploadComplete: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

export function ImageUpload({
  onUploadComplete,
  currentImage = "",
  className = ""
}: ImageUploadProps) {
  const [image, setImage] = useState<string>(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, GIF, WebP, or SVG image",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Upload failed');
      }

      // Set image and call the callback
      setImage(result.data.url);
      onUploadComplete(result.data.url);

      toast({
        title: "Upload successful",
        description: "Image has been uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    setImage("");
    onUploadComplete("");
  };

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-medium text-sm">Image</label>
          {image && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          )}
        </div>

        {image ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
            <Image
              src={image}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-36 border-2 border-dashed rounded-md border-muted-foreground/25 p-4">
            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Drag & drop your image here, or click to browse
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            ref={fileInputRef}
            disabled={isUploading}
          />
          <Button
            type="button"
            variant={image ? "outline" : "default"}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" /> {image ? "Change image" : "Upload image"}
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Accepted formats: JPG, PNG, GIF, WebP, SVG (max. 5MB)
        </p>
      </div>
    </div>
  );
}
