import styled from "styled-components";
import CustomNodeFlow from "./examples/CustomNodeExample";

const Body = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background-color: red;
`;

const Header = styled("h1")``;

export default function App() {
  return (
    <Body>
      <Header>Hello ML Playground</Header>
      <CustomNodeFlow />
      <Header>Controls and color picker here</Header>
    </Body>
  );
}
