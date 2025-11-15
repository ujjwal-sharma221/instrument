import { ZapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";

export function ExecuteWorkflowButton({ workflowId }: { workflowId: string }) {
  const executeWorkflow = useExecuteWorkflow();

  const handleExecute = () => {
    executeWorkflow.mutate({ id: workflowId });
  };

  return (
    <Button
      size="lg"
      onClick={handleExecute}
      disabled={executeWorkflow.isPending}
    >
      <ZapIcon className="size-4 " />
      Execute Workflow
    </Button>
  );
}
