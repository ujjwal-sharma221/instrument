"use client";

import { memo, useState } from "react";
import { PlusIcon } from "lucide-react";
import { NodeProps } from "@xyflow/react";

import { WorkflowNode } from "../workflow-node";
import { NodeSelector } from "../node-selector";
import { PlaceholderNode } from "./placeholder-node";

export const InitialNode = memo((props: NodeProps) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <NodeSelector onOpenChange={setIsSelectorOpen} open={isSelectorOpen}>
      <WorkflowNode showToolbar={false}>
        <PlaceholderNode {...props} onClick={() => setIsSelectorOpen(true)}>
          <div className="cursor-pointer flex items-center justify-center">
            <PlusIcon />
          </div>
        </PlaceholderNode>
      </WorkflowNode>
    </NodeSelector>
  );
});

InitialNode.displayName = "InitialNode";
