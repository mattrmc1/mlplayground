import { CircularProgress } from "@mui/material";
import { NetworkConfig } from "goddard/dist/@types/NetworkConfig";
import { ChangeEvent, useEffect, useState } from "react";
import ReactFlow, {
  Edge,
  Node,
  Panel,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";
import { useNetwork } from "../../context/NetworkCtx";
import { MIN_OPACITY } from "../../data/config";
import { training } from "../../data/training";
import {
  calculateOpacity,
  convertHexToInput,
  convertHexToRGB,
} from "../../util";
import ActivationNode, { ActivationNodeProps } from "./ActivationNode";
import ConfigControls from "../controls/ConfigControls";
import OutputPanel from "./OutputPanel";

const connectionLineStyle = { stroke: "#fff" };
const nodeTypes = {
  activation: ActivationNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const initialX = 0;
const xSpacing = 200;
const initialY = 20;
const ySpacing = 30;

const Root = styled(ReactFlow)`
  background-color: beige;
  flex-grow: 1;
`;

const LoaderRoot = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: beige;
  flex-grow: 1;
`;

export default function NetworkVisualization() {
  const { network, setConfig } = useNetwork();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [textColor, setTextColor] = useState("#000");

  const calculateNodesAndEdges = () => {
    const activations: Node<ActivationNodeProps>[] =
      network.activations.flatMap(({ data }, i) =>
        data.map((a, j) => {
          const bias = network.biases[i - 1]?.data[j][0] ?? 0;
          const val = a[0];
          const x = initialX + i * xSpacing;
          const y = initialY + j * ySpacing;
          return {
            id: `a-${i}-${j}`,
            type: "activation",
            data: {
              isInput: i === 0,
              isOutput: i === network.sizes.length - 1,
              val,
              bias,
            },
            position: { x, y },
          };
        })
      );

    const weights: Edge[] = network.weights.flatMap(({ data }, i) =>
      data.flatMap((w, j) =>
        w.map((val, k) => {
          return {
            id: `w-${i}-${j}-${k}`,
            source: `a-${i}-${k}`,
            target: `a-${i + 1}-${j}`,
            nodeStrokeColor: "#000",
            type: "default",
            style: { opacity: calculateOpacity(MIN_OPACITY, val) },
          };
        })
      )
    );

    setNodes(activations);
    setEdges(weights);

    setIsLoading(false);
  };

  useEffect(
    () => {
      calculateNodesAndEdges();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network.config]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = convertHexToInput(e.target.value);
    if (!input) return;

    const output = network.run(input);
    setBackgroundColor(e.target.value);
    setTextColor(output[0] > output[1] ? "#000" : "#fff");

    const vals = network.activations.flatMap((a) =>
      a.data.flatMap((v) => v[0].toFixed(2))
    );
    setNodes((nds) =>
      nds.map((node, i) => {
        return { ...node, data: { ...node.data, val: vals[i] } };
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeConfig = (config: Partial<NetworkConfig>) => {
    setIsLoading(true);
    setConfig(config);
  };

  if (isLoading) {
    return (
      <LoaderRoot>
        <CircularProgress />
      </LoaderRoot>
    );
  }

  return (
    <Root
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
    >
      <OutputPanel
        position="top-center"
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
      <Panel position="bottom-left">
        <ConfigControls
          input={backgroundColor}
          onChangeInput={onChangeInput}
          onSave={onChangeConfig}
        />
      </Panel>
    </Root>
  );
}
