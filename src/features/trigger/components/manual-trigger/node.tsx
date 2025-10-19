import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerClickIcon } from "lucide-react";

export const ManualTrigger = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerClickIcon}
        name="When clicking 'Execute Workflow'"
      />
    </>
  );
});

ManualTrigger.displayName = "ManualTrigger";
