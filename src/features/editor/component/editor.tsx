"use client";

import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
import { useSetAtom } from "jotai";
import { useState, useCallback } from "react";

import { editorAtom } from "../store/atoms";
import { AddNodeButton } from "./add-node-button";
import {
  ErrorView,
  LoadingView,
} from "@/components/entity-components/entity-state";
import { nodeComponents } from "@/config/node-components";
import { useSuspsenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import { NodeType } from "@/generated/prisma";

import "@xyflow/react/dist/style.css";

export function Editor({ workflowId }: { workflowId: string }) {
  const { data: workflow } = useSuspsenseWorkflow(workflowId);

  const setEditor = useSetAtom(editorAtom);

  const initialNodes =
    workflow.nodes.length > 0
      ? workflow.nodes
      : [
          {
            id: "initial",
            type: NodeType.INITIAL,
            position: { x: 250, y: 250 },
            data: {},
          },
        ];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setEditor}
        nodeTypes={nodeComponents}
        fitView
        snapToGrid
        snapGrid={[10, 10]}
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
      >
        <Controls />
        <MiniMap />
        <Background />
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export const EditorLoading = () => {
  return <LoadingView message="Loading editor" />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};
