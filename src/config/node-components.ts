import { NodeType } from "@/generated/prisma";
import type { NodeTypes } from "@xyflow/react";

import { InitialNode } from "@/components/nodes/initial-node";
import { ManualTrigger } from "@/features/trigger/components/manual-trigger/node";
import { HTTPRequestNode } from "@/features/executions/components/http-requests/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HTTPRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTrigger,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
