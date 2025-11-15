import { NodeExecutor } from "@/features/executions/lib/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
}) => {
  const res = await step.run("manual-trigger", async () => context);
  return res;
};
