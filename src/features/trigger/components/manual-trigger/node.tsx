import { memo, useState } from "react";
import { NodeProps } from "@xyflow/react";
import { MousePointerClickIcon } from "lucide-react";

import { BaseTriggerNode } from "../base-trigger-node";
import { ManualTriggerDialog } from "./manual-trigger-dialog";

export const ManualTrigger = memo((props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const nodeStatus = "loading";

  return (
    <>
      <ManualTriggerDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerClickIcon}
        name="When clicking 'Execute Workflow'"
        onSettings={() => setIsDialogOpen(true)}
        onDoubleClick={() => setIsDialogOpen(true)}
        status={nodeStatus}
      />
    </>
  );
});

ManualTrigger.displayName = "ManualTrigger";
