import { useEffect } from "react";
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
import { calculateOpacity } from "../../util";
import ActivationNode, { ActivationNodeProps } from "./ActivationNode";

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

export default function NetworkVisualization() {
  const { network } = useNetwork();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
  };

  useEffect(
    () => {
      calculateNodesAndEdges();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

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
      <Panel position="bottom-center">
        <button onClick={() => calculateNodesAndEdges()}>Draw network</button>
      </Panel>
    </Root>
  );
}
