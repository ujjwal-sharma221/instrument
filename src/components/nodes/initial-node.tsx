"use client";

import { memo } from "react";
import { PlusIcon } from "lucide-react";
import { NodeProps } from "@xyflow/react";

import { WorkflowNode } from "../workflow-node";
import { PlaceholderNode } from "./placeholder-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode showToolbar={false}>
      <PlaceholderNode {...props} onClick={() => {}}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
