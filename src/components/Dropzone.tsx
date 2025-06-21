"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DropzoneProps {
  label: string;
  accept: { [mimeType: string]: string[] };
  onFilesSelected: (files: FileList) => void;
}

export default function Dropzone({ label, accept, onFilesSelected }: DropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...files, ...acceptedFiles];
      const dt = new DataTransfer();
      updatedFiles.forEach((file) => dt.items.add(file));
      setFiles(updatedFiles);
      onFilesSelected(dt.files);
    },
    [files, onFilesSelected]
  );

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(updatedFiles);

    const dt = new DataTransfer();
    updatedFiles.forEach((file) => dt.items.add(file));
    onFilesSelected(dt.files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: true,
  });

  const renderPreview = (file: File, index: number) => {
    const url = URL.createObjectURL(file);

    return (
      <div
        key={index}
        className="relative w-24 h-28 border-2 rounded-md overflow-hidden bg-muted flex-shrink-0 p-1 border-black"
      >
        {file.type === "application/pdf" ? (
          <iframe src={url} title={file.name} className="w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            HTML
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // ✅ prevent dropzone click
            removeFile(index);
          }}
          className="absolute top-1 right-1 bg-red-500 hover:bg-destructive text-destructive hover:text-white rounded-full p-0.5 cursor-pointer"
        >
          <X size={12} className="text-white"/>
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div
        {...getRootProps()}
        className={cn(
          "border border-dashed border-muted-foreground rounded-xl px-4 py-6 text-center cursor-pointer transition-colors",
          isDragActive ? "bg-muted" : "bg-background"
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-muted-foreground">
          {isDragActive ? "Drop files here..." : "Drag & drop or click to browse"}
        </p>

        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 max-w-full overflow-x-auto">
            {files.map((file, index) => renderPreview(file, index))}
          </div>
        )}
      </div>
    </div>
  );
}
