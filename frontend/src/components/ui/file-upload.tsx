import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  previewUrl?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  previewUrl,
  className,
  accept = 'image/*',
  maxSize = 2, // Default 2MB
}) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) {
      onChange(null);
      setPreview(null);
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }
    
    // Reset error
    setError(null);
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Call onChange
    onChange(file);
    
    // Clean up preview URL when component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
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
          'relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer',
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
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-300">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export { FileUpload };
