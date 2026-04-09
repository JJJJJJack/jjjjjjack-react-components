import { mdiClose } from "@mdi/js";
import { ReactNode, useEffect, useRef } from "react";
import { Button } from "../Form/Button";
import { Buttons } from "../Form/Buttons";
import { Card } from "./Card";
import { Title } from "./Title";

type ModalProps = {
  title?: string;
  className?: string;
  subtitle?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  children: ReactNode;
  onConfirm?: () => void;
  onCancel: () => void;
};

export function Modal({
  title,
  subtitle,
  children,
  className = "",
  confirmButtonLabel = "Confirm",
  cancelButtonLabel = "Cancel",
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
      <Card className={` jrc-Modal__Card ${className}`} footer={footer} noHighlight>
        <Title text={title} subtitle={subtitle}>
          {onCancel && <Button variant="transparent" icon={mdiClose} onClick={onCancel} small />}
        </Title>
        <div className="jrc-Modal__children-container">{children}</div>
      </Card>
    </div>
  );
}
