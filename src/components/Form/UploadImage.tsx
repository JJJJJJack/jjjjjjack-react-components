import { uniqueKey } from "@/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { Grid } from "../Composition/Grid";
import { UploadFile } from "./UploadFile";

type UploadImageProps = {
  label?: string;
  previewHeight?: number;
  name?: string;
  inputId?: string;
  mimeTypes: string[];
  onChange: (file: File | null) => void;
};

export function UploadImage({
  label = "Choose Image",
  previewHeight = 200,
  name = "image",
  mimeTypes,
  inputId = `image-upload-input-${uniqueKey()}`,
  onChange,
}: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!mimeTypes.includes(file.type)) {
      e.target.value = "";
      return;
    }

    setFilename(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    onChange(file);
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
    if (file && mimeTypes.includes(file.type)) {
      setFilename(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      onChange(file);
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
          if (file && mimeTypes.includes(file.type)) {
            setFilename(file.name);
            setPreviewUrl(URL.createObjectURL(file));
            onChange(file);
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [onChange]);

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
          accept={mimeTypes.join(", ")}
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
