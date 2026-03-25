import { mdiClose } from "@mdi/js";
import { ReactNode, useEffect, useRef } from "react";
import { Button } from "../Form/Button";
import { Buttons } from "../Form/Buttons";
import { Card } from "./Card";
import { CardTitle } from "./CardTitle";

type ModalProps = {
  title?: string;
  className?: string;
  subtitle?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  closeIcon?: string;
  children: ReactNode;
  onConfirm?: () => void;
  onCancel: () => void;
};

export function Modal({
  title,
  subtitle,
  children,
  className,
  confirmButtonLabel = "Confirm",
  cancelButtonLabel = "Cancel",
  closeIcon,
  onConfirm,
  onCancel,
}: ModalProps) {
  const mouseDownRef = useRef<any>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "Enter":
          onConfirm?.();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const footer = (
    <Buttons>
      {onCancel && <Button variant="outline-only" text={cancelButtonLabel} onClick={onCancel} />}
      {onConfirm && <Button text={confirmButtonLabel} onClick={onConfirm} autoFocus />}
    </Buttons>
  );

  return (
    <div
      className="jrc-Modal jrc-card-modal jrc-glasscard"
      onMouseDown={e => {
        mouseDownRef.current = e.target;
      }}
      onClick={e => {
        if (mouseDownRef.current !== e.currentTarget) {
          return;
        }

        onCancel?.();
      }}
    >
      <div className={"jrc-Modal__card-container"}>
        <Card className={className} footer={footer} noHighlight>
          <CardTitle title={title} subtitle={subtitle}>
            {onCancel && (
              <Button variant="transparent" icon={closeIcon ? closeIcon : mdiClose} onClick={onCancel} small />
            )}
          </CardTitle>
          <div className="max-h-[70vh]">{children}</div>
        </Card>
      </div>
    </div>
  );
}
