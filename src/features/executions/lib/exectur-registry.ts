import { NodeExecutor } from "./types";
import { NodeType } from "@/generated/prisma";
import { httpRequestExecutor } from "../components/http-requests/executor";
import { manualTriggerExecutor } from "@/features/trigger/components/manual-trigger/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type ${type}`);
  }

  return executor;
};
