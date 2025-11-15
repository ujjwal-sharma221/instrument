import toposort from "toposort";

import { type Node, type Connection } from "@/generated/prisma";

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[],
): Node[] => {
  if (connections.length === 0) return nodes;

  const edges: [string, string][] = connections.map((conn) => [
    conn.fromNodeId,
    conn.toNodeId,
  ]);

  const connectedNodeIds = new Set<string>();
  for (const con of connections) {
    connectedNodeIds.add(con.fromNodeId);
    connectedNodeIds.add(con.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  let sortedNodeIds: string[];

  try {
    sortedNodeIds = toposort(edges);
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (err) {
    if (err instanceof Error && err.message.includes("Cyclic")) {
      throw new Error("workflow contains a cycle");
    }
    throw err;
  }

  const nodesMap = new Map(nodes.map((n) => [n.id, n]));
  return sortedNodeIds.map((id) => nodesMap.get(id)!).filter(Boolean);
};
