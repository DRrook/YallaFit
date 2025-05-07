import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload, X, Camera } from 'lucide-react';
import { ImageCropper } from './image-cropper';

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  previewUrl?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  circular?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  previewUrl,
  className,
  accept = 'image/*',
  maxSize = 2, // Default 2MB
  circular = true, // Default to circular cropping for profile photos
}) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const [error, setError] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when previewUrl changes
  useEffect(() => {
    if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    // Reset error
    setError(null);

    // Create temporary URL for cropper
    const objectUrl = URL.createObjectURL(file);

    if (circular) {
      // Show cropper for circular images
      setTempImageUrl(objectUrl);
      setShowCropper(true);
    } else {
      // Use directly for non-circular images
      setPreview(objectUrl);
      onChange(file);
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    // Create a File from the Blob
    const croppedFile = new File([croppedBlob], 'profile-photo.jpg', { type: 'image/jpeg' });

    // Create preview URL
    const objectUrl = URL.createObjectURL(croppedBlob);
    setPreview(objectUrl);

    // Call onChange with the cropped file
    onChange(croppedFile);

    // Close cropper
    setShowCropper(false);
    setTempImageUrl(null);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
    setPreview(null);
    setError(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'relative flex flex-col items-center justify-center w-full border-2 border-dashed cursor-pointer',
          circular ? 'h-32 w-32 rounded-full mx-auto' : 'h-32 w-full rounded-lg',
          'bg-yalla-black hover:bg-black/60 transition-colors',
          'border-yalla-light-gray hover:border-yalla-green',
          error && 'border-red-500'
        )}
        onClick={handleClick}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
        />

        {preview ? (
          <div className={cn(
            "relative w-full h-full overflow-hidden",
            circular && "rounded-full"
          )}>
            <img
              src={preview}
              alt="Preview"
              className={cn(
                "object-cover w-full h-full",
                circular ? "rounded-full" : "rounded-lg"
              )}
            />
            <div className={cn(
              "absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100",
              circular ? "rounded-full" : "rounded-lg"
            )}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-300">
              {circular ? "Upload photo" : "Click to upload"}
            </p>
            {!circular && (
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to {maxSize}MB
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Image Cropper Dialog */}
      {tempImageUrl && (
        <ImageCropper
          image={tempImageUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          aspectRatio={1}
          open={showCropper}
        />
      )}
    </div>
  );
};

export { FileUpload };
