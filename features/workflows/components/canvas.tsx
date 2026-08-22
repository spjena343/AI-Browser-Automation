"use client"

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
  ConnectionLineType,
  ReactFlowProvider,
  type ColorMode,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react"
import { useCallback, useEffect, useState } from "react"
import { Cursors, useLiveblocksFlow } from "@liveblocks/react-flow"
import { useTheme } from "next-themes"
import { StepNode } from "./step-node"
import { StepNodeType } from "../nodes/node-registry"

const initialNodes: StepNodeType[] = [
  {
    id: "trigger",
    type: "step",
    position: { x: 0, y: 0 },
    data: {
      type: "start",
      kind: "trigger",
      title: "Start",
      values: {},
    },
  },
  {
    id: "open-url-1",
    type: "step",
    position: { x: 0, y: 150 },
    data: {
      type: "open-url",
      kind: "action",
      title: "Open URL",
      values: {
        url: "https://example.com"
      },
    },
  }
]

const initialEdges: Edge[] = [
]
const nodeTypes = {
  step: StepNode,
}

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useLiveblocksFlow({
    nodes: { initial: initialNodes as Node[] },
    edges: { initial: initialEdges },
    suspense: true,
  });

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-[600px] w-full bg-slate-900/40 rounded-md">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          colorMode={mounted ? (resolvedTheme as ColorMode) : "dark"}
          fitView
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ stroke: "var(--border)" }}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "var(--border)" },
          }}
          style={{
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": "2px",
            "--xy-connectionline-stroke-width": "2px",
          } as React.CSSProperties}
        >
          <Background />
          <Controls />
          <Cursors style={{ zIndex: 10000 }} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
