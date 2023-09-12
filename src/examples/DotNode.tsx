/* eslint-disable */
import { memo } from "react";
import styled from "styled-components";

const Root = styled("div")`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: cyan;
`;

function DotNode() {
  return <Root />;
}

export default memo(DotNode);
