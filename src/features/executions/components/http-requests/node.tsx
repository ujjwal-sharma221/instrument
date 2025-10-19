"use client";

import { memo } from "react";
import { GlobeIcon } from "lucide-react";
import { Node, NodeProps } from "@xyflow/react";

import { BaseExecutionNode } from "../base-execution-node";

type HTTPRequestNodeData = {
  endPoint?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HTTPRequestNodeType = Node<HTTPRequestNodeData>;

export const HTTPRequestNode = memo((props: NodeProps<HTTPRequestNodeType>) => {
  const nodeData = props.data as HTTPRequestNodeData;
  const description = nodeData?.endPoint
    ? `${nodeData.method || "GET"}: ${nodeData.endPoint}`
    : `Not Configured`;

  return (
    <>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      />
    </>
  );
});

HTTPRequestNode.displayName = "HTTPRequestNode";
