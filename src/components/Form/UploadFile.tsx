import { mdiTrashCan } from "@mdi/js";
import { Grid } from "../Composition/Grid";
import { Button } from "./Button";
import { Label } from "./Label";

type UploadFileProps = {
  label?: string;
  inputId: string;
  filename: string;
  inputRef?: React.Ref<HTMLInputElement>;
  name: string;
  accept: string;
  onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function UploadFile({
  label,
  inputId,
  filename,
  inputRef,
  name,
  accept,
  onChange,
  onButtonClick,
}: UploadFileProps) {
  const hasFile = Boolean(filename);

  return (
    <Grid>
      {label && <Label text={label} htmlFor={inputId} />}
      <div className="jrc-UploadFile">
        <label htmlFor={inputId} className="jrc-UploadFile__label">
          <span className="jrc-UploadFile__label__span-choose-file">Choose File</span>
          <span className="jrc-UploadFile__label__span-filename" title={filename}>
            {filename}
          </span>
        </label>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          name={name}
          accept={accept}
          id={inputId}
          onChange={onChange}
          onClick={e => {
            (e.target as HTMLInputElement).value = "";
          }}
        />

        {hasFile && (
          <Button
            className="jrc-UploadFile__Button-clear-file"
            variant="danger"
            onClick={onButtonClick}
            title="Clear file"
            icon={mdiTrashCan}
          />
        )}
      </div>
    </Grid>
  );
}
