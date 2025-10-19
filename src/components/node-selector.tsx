"use client";

import { toast } from "sonner";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { createId } from "@paralleldrive/cuid2";
import { GlobeIcon, MousePointerClickIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { NodeType } from "@/generated/prisma";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger Manually",
    description:
      "Runs the flow on clicking a button. Good for getting started quickly",
    icon: MousePointerClickIcon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "HTTP Request",
    description: "Makes an HTTP request",
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function NodeSelector({
  onOpenChange,
  open,
  children,
}: NodeSelectorProps) {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (node: NodeTypeOption) => {
      if (node.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const existingManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER,
        );

        if (existingManualTrigger) {
          toast.error("Only one manual trigger is allowed per workflow");
          return;
        }
      }

      setNodes((nodes) => {
        const initialNode = nodes.find(
          (node) => node.type === NodeType.INITIAL,
        );

        if (initialNode) {
          const newNode = {
            id: createId(),
            data: {},
            position: initialNode.position,
            type: node.type,
          };
          return [newNode];
        }

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX,
          y: centerY,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: flowPosition,
          type: node.type,
        };

        return [...nodes, newNode];
      });

      onOpenChange(false);
    },
    [setNodes, getNodes, onOpenChange, screenToFlowPosition],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>What triggers this workflow?</SheetTitle>
          <SheetDescription>
            A trigger is a step that starts your workflow
          </SheetDescription>
        </SheetHeader>

        <div>
          {triggerNodes.map((node) => {
            const Icon = node.icon;

            return (
              <div
                key={node.type}
                className="w-full justify-start rounded-none cursor-pointer h-auto px-4 py-5 border-l-2 border-transparent hover:border-l-primary"
                onClick={() => handleNodeSelect(node)}
              >
                <div className="flex items-center gap-6 w-full overflow-hidden ">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={node.label}
                      className="size-5 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}

                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">{node.label}</span>
                    <span className="font-medium text-muted-foreground text-xs">
                      {node.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Separator decorative className="flex-1" />
          <span className="text-xs">Executions</span>
          <Separator decorative className="flex-1" />
        </div>

        <div>
          {executionNodes.map((node) => {
            const Icon = node.icon;

            return (
              <div
                key={node.type}
                className="w-full justify-start rounded-none cursor-pointer h-auto px-4 py-5 border-l-2 border-transparent hover:border-l-primary"
                onClick={() => handleNodeSelect(node)}
              >
                <div className="flex items-center gap-6 w-full overflow-hidden ">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={node.label}
                      className="size-5 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}

                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">{node.label}</span>
                    <span className="font-medium text-muted-foreground text-xs">
                      {node.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
