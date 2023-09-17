import { useState } from "react";
import styled from "styled-components";
import Debugger from "./components/Debugger";
import ColorPicker from "./components/controls/ColorPicker";
import NetworkVisualization from "./components/visualization/NetworkVisualization";
import { NetworkCtxProvider } from "./context/NetworkCtx";

const Body = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
`;

const Header = styled("h1")``;

export default function App() {
  const [background, setBackground] = useState<string>("");

  return (
    <NetworkCtxProvider>
      <Body>
        <Header>ML Playground</Header>
        <NetworkVisualization />
        <ColorPicker
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
        <Debugger />
      </Body>
    </NetworkCtxProvider>
  );
}
