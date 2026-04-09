import { uniqueKey } from "@/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { Grid } from "../Composition/Grid";
import { UploadFile } from "./UploadFile";

type UploadImageProps = {
  label?: string;
  previewHeight?: number;
  name?: string;
  inputId?: string;
  accept: string;
  onChange: (file: File | null) => void;
};

function matchesMimeType(fileType: string, accept: string): boolean {
  const patterns = accept.split(",").map(s => s.trim());
  return patterns.some(pattern => {
    if (pattern === fileType) return true;
    if (pattern.endsWith("/*")) {
      const category = pattern.slice(0, -2);
      return fileType.startsWith(`${category}/`);
    }
    return false;
  });
}

export function UploadImage({
  label = "Choose Image",
  previewHeight = 200,
  name = "image",
  accept,
  inputId = `image-upload-input-${uniqueKey()}`,
  onChange,
}: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>();

  const applyFile = (file: File) => {
    setFilename(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    onChange(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!matchesMimeType(file.type, accept)) {
      e.target.value = "";
      return;
    }
    applyFile(file);
  };

  const clearImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (inputRef.current) inputRef.current.value = "";
    setFilename("");
    setPreviewUrl(undefined);
    onChange(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && matchesMimeType(file.type, accept)) {
      applyFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file && matchesMimeType(file.type, accept)) {
            applyFile(file);
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [onChange, accept]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <Grid>
        <UploadFile
          label={label}
          inputId={inputId}
          filename={filename}
          inputRef={inputRef}
          name={name}
          accept={accept}
          onChange={handleFileChange}
          onDeleteClick={clearImage}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Selected image preview"
            className="jrc-UploadImage__preview"
            style={{ maxHeight: `${previewHeight}px` }}
          />
        )}
      </Grid>
    </div>
  );
}
