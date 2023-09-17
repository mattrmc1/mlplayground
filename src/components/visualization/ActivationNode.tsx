/* eslint-disable */
import { memo } from "react";
import { Handle as RFHandle, Position } from "reactflow";
import styled from "styled-components";
import { calculateOpacity } from "../../util";
import { MIN_OPACITY } from "../../data/config";

const Root = styled("div")<{ opacity: number }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000;
  opacity: ${(props) => calculateOpacity(MIN_OPACITY, props.opacity)};
`;

const Handle = styled(RFHandle)<{ bias: number }>`
  background-color: color-mix(in lch, blue, red);
`;

export type ActivationNodeProps = {
  isInput: boolean;
  isOutput: boolean;
  val: number;
  bias: number;
};
function ActivationNode({ data }: { data: ActivationNodeProps }) {
  return (
    <Root opacity={data.val}>
      {!data.isOutput && (
        <Handle type="source" position={Position.Right} bias={data.bias} />
      )}
      {!data.isInput && (
        <Handle type="target" position={Position.Left} bias={data.bias} />
      )}
    </Root>
  );
}

export default memo(ActivationNode);
