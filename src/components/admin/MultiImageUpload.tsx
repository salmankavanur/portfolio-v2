"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface MultiImageUploadProps {
  onImagesChange: (imageUrls: string[]) => void;
  initialImages?: string[];
  className?: string;
  maxImages?: number;
}

export function MultiImageUpload({
  onImagesChange,
  initialImages = [],
  className = "",
  maxImages = 10
}: MultiImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the maximum
    if (images.length + files.length > maxImages) {
      toast({
        title: "Too many images",
        description: `You can upload a maximum of ${maxImages} images`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];
    let hasError = false;

    // Upload each file one by one
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 5MB and was skipped`,
          variant: "destructive",
        });
        continue;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported image format and was skipped`,
          variant: "destructive",
        });
        continue;
      }

      try {
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

        uploadedUrls.push(result.data.url);
      } catch (error) {
        hasError = true;
        console.error('Error uploading image:', error);
      }
    }

    if (uploadedUrls.length > 0) {
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesChange(newImages);

      toast({
        title: "Upload successful",
        description: `Successfully uploaded ${uploadedUrls.length} ${uploadedUrls.length === 1 ? 'image' : 'images'}`,
      });
    }

    if (hasError) {
      toast({
        title: "Some uploads failed",
        description: "One or more images couldn't be uploaded",
        variant: "destructive",
      });
    }

    setIsUploading(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleClearAll = () => {
    setImages([]);
    onImagesChange([]);
  };

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium text-sm">Images</label>
            <p className="text-xs text-muted-foreground">
              {images.length} of {maxImages} images
            </p>
          </div>
          {images.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-1" /> Clear All
            </Button>
          )}
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6 absolute top-2 right-2"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {images.length < maxImages && (
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              ref={fileInputRef}
              disabled={isUploading}
              multiple
            />
            <Button
              type="button"
              variant={images.length > 0 ? "outline" : "default"}
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
                  <Plus className="h-4 w-4 mr-2" /> Add Images
                </>
              )}
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-2">
          Accepted formats: JPG, PNG, GIF, WebP, SVG (max. 5MB each)
        </p>
      </div>
    </div>
  );
}
