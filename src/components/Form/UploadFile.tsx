import { mdiTrashCan } from "@mdi/js";
import { useState } from "react";
import { Grid } from "../Composition/Grid";
import { Button } from "./Button";
import { Label } from "./Label";

type UploadFileProps = {
  inputId: string;
  accept: string;
  filename?: string;
  label?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  name?: string;
  // Mime types (example: "image/png, image/jpeg")
  onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function UploadFile({
  label,
  inputId,
  filename,
  inputRef,
  name,
  accept,
  onChange,
  onDeleteClick,
}: UploadFileProps) {
  const [originalFilename, setOriginalFilename] = useState<string | undefined>();

  const filenameToShow = filename || originalFilename;

  return (
    <Grid>
      {label && <Label text={label} htmlFor={inputId} />}
      <div className="jrc-UploadFile" title={filenameToShow || "Click to choose a file"}>
        <label htmlFor={inputId} className="jrc-UploadFile__label">
          <span className="jrc-UploadFile__label__span-choose-file">Choose File</span>
          <span className="jrc-UploadFile__label__span-filename">{filenameToShow}</span>
        </label>
        <input
          ref={inputRef}
          className="jrc-UploadFile__input"
          type="file"
          name={name}
          accept={accept}
          id={inputId}
          onChange={e => {
            onChange(e);
            setOriginalFilename(e.target.files?.[0].name);
          }}
          onClick={e => {
            (e.target as HTMLInputElement).value = "";
          }}
        />

        {filenameToShow && (
          <Button
            className="jrc-UploadFile__Button-clear-file"
            variant="danger"
            onClick={e => {
              onDeleteClick(e);
              setOriginalFilename(undefined);
            }}
            title="Clear file"
            icon={mdiTrashCan}
          />
        )}
      </div>
    </Grid>
  );
}
