/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

import ColorSelectorNode from "./CustomNode";

import "./CustomNodeExample.css";
import styled from "styled-components";
import DotNode from "./DotNode";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const nodeTypes = {
  selectorNode: ColorSelectorNode,
  dot: DotNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const Root = styled(ReactFlow)`
  background-color: beige;
  flex-grow: 1;
`;

export default function CustomNodeFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: "1",
        type: "input",
        data: { label: "An input node" },
        position: { x: 0, y: 50 },
        sourcePosition: "right" as Position,
      },
      {
        id: "2",
        type: "selectorNode",
        data: { onChange: onChange, color: initBgColor },
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: "3",
        type: "output",
        data: { label: "Output A" },
        position: { x: 650, y: 25 },
        targetPosition: "left" as Position,
      },
      {
        id: "4",
        type: "output",
        data: { label: "Output B" },
        position: { x: 650, y: 100 },
        targetPosition: "left" as Position,
      },
      {
        id: "5",
        type: "dot",
        data: {},
        position: { x: 750, y: 150 },
      },
    ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#fff" },
      },
      {
        id: "e2a-3",
        source: "2",
        target: "3",
        sourceHandle: "a",
        animated: true,
        style: { stroke: "#fff" },
      },
      {
        id: "e2b-4",
        source: "2",
        target: "4",
        sourceHandle: "b",
        animated: true,
        style: { stroke: "#fff" },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );
  return (
    <Root
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
    >
      <MiniMap
        nodeStrokeColor={(n: any) => {
          if (n.type === "input") return "#0041d0";
          if (n.type === "selectorNode") return bgColor;
          if (n.type === "output") return "#ff0072";
          return bgColor;
        }}
        nodeColor={(n) => {
          if (n.type === "selectorNode") return bgColor;
          return "#fff";
        }}
      />
      <Controls />
    </Root>
  );
}
