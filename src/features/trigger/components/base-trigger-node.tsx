"use client";

import { memo } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";

import {
  type NodeStatus,
  NodeStatusIndicator,
} from "@/components/node-status-indicator";
import { BaseHandle } from "../../../components/base-handle";
import { WorkflowNode } from "../../../components/workflow-node";
import { BaseNode, BaseNodeContent } from "../../../components/nodes/base-node";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  status?: NodeStatus;
}

export const BaseTriggerNode = memo(
  ({
    icon: Icon,
    name,
    id,
    description,
    children,
    onSettings,
    onDoubleClick,
    status = "initial",
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      setNodes((currentNodes) => {
        const updatedNode = currentNodes.filter((node) => node.id !== id);
        return updatedNode;
      });

      setEdges((currentEdges) => {
        const updatedEdges = currentEdges.filter(
          (edge) => edge.source !== id && edge.target !== id,
        );
        return updatedEdges;
      });
    };

    return (
      <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSettings}
      >
        <NodeStatusIndicator
          status={status}
          variant="border"
          className="rounded-l -2xl"
        >
          <BaseNode
            status={status}
            onDoubleClick={onDoubleClick}
            className="rounded-l-2xl relative group"
          >
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image src={Icon} alt={name} width={16} height={16} />
              ) : (
                <Icon className="size-4 text-muted-foreground" />
              )}
              {children}
              <BaseHandle
                id="source-1"
                type="source"
                position={Position.Right}
              />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  },
);

BaseTriggerNode.displayName = "BaseTriggerNode";
