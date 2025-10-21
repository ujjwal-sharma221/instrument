"use client";

import { memo, useState } from "react";
import { GlobeIcon } from "lucide-react";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";

import { BaseExecutionNode } from "../base-execution-node";
import { HTTPNodeFormValues, HTTPRequestDialog } from "./http-request-dialog";

type HTTPRequestNodeData = {
  endPoint?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HTTPRequestNodeType = Node<HTTPRequestNodeData>;

export const HTTPRequestNode = memo((props: NodeProps<HTTPRequestNodeType>) => {
  const nodeData = props.data;
  const description = nodeData?.endPoint
    ? `${nodeData.method || "GET"}: ${nodeData.endPoint}`
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
              endPoint: values.endpoint,
              method: values.method,
              body: values.body,
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
        defaultEndpoint={nodeData.endPoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
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
