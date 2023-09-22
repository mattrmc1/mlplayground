import styled from "styled-components";
import Debugger from "./components/Debugger";
import NetworkVisualization from "./components/NetworkVisualization";
import { NetworkCtxProvider } from "./context/NetworkCtx";

const Body = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
`;

const Header = styled("h1")``;

export default function App() {
  return (
    <NetworkCtxProvider>
      <Body>
        <Header>ML Playground</Header>
        <NetworkVisualization />
        <Debugger />
      </Body>
    </NetworkCtxProvider>
  );
}
