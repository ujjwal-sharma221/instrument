"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ManualTriggerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManualTriggerDialog({
  onOpenChange,
  open,
}: ManualTriggerDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            Configure settings for the manual trigger node
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p>
            Used for manually executing a workflow, no special configuration
            needed
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
