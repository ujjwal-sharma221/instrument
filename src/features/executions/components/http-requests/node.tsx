"use client";

import { memo, useState } from "react";
import { GlobeIcon } from "lucide-react";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";

import { BaseExecutionNode } from "../base-execution-node";
import { HTTPNodeFormValues, HTTPRequestDialog } from "./http-request-dialog";

type HTTPRequestNodeData = {
  endpoint?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
};

type HTTPRequestNodeType = Node<HTTPRequestNodeData>;

export const HTTPRequestNode = memo((props: NodeProps<HTTPRequestNodeType>) => {
  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : `Not Configured`;

  const nodeStatus = "loading";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleSubmit = (values: HTTPNodeFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }

        return node;
      }),
    );
  };

  return (
    <>
      <HTTPRequestDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />

      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        status={nodeStatus}
        name="HTTP Request"
        description={description}
        onSettings={() => setIsDialogOpen(true)}
        onDoubleClick={() => setIsDialogOpen(true)}
      />
    </>
  );
});

HTTPRequestNode.displayName = "HTTPRequestNode";
