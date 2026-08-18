"use client"

import "reactflow/dist/style.css"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "reactflow"
import { useCallback, useState } from "react"

const initialNodes: Node[] = [
  {
    id: "trigger",
    position: { x: 0, y: 0 },
    data: { label: "Trigger" },
  },
  {
    id: "action",
    position: { x: 260, y: 120 },
    data: { label: "Run browser action" },
  },
]

const initialEdges: Edge[] = [
  {
    id: "trigger-action",
    source: "trigger",
    target: "action",
  },
]

export function Canvas() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
  }, [])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot))
  }, [])

  const onConnect = useCallback((connection: Connection) => {
    setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot))
  }, [])

  return (
    <div className="h-[600px] w-full bg-slate-900/40 rounded-md">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
