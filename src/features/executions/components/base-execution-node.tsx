"use client";

import { memo } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";

import {
  NodeStatus,
  NodeStatusIndicator,
} from "@/components/node-status-indicator";
import { BaseHandle } from "../../../components/base-handle";
import { WorkflowNode } from "../../../components/workflow-node";
import { BaseNode, BaseNodeContent } from "../../../components/nodes/base-node";

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  onSettings?: () => void;
  status?: NodeStatus;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    id,
    onDoubleClick,
    status = "initial",
  }: BaseExecutionNodeProps) => {
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
        <NodeStatusIndicator status={status} variant="border">
          <BaseNode status={status} onDoubleClick={onDoubleClick}>
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image src={Icon} alt={name} width={16} height={16} />
              ) : (
                <Icon className="size-4 text-muted-foreground" />
              )}
              {children}
              <BaseHandle
                id="target-1"
                type="target"
                position={Position.Left}
              />
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

BaseExecutionNode.displayName = "BaseExecutionNode";
