import { Panel, PanelPosition } from "reactflow";

type OutputPanelProps = {
  position: PanelPosition;
  backgroundColor: string;
  textColor: string;
};
export default function OutputPanel({
  position,
  backgroundColor,
  textColor,
}: OutputPanelProps) {
  return (
    <Panel position={position}>
      <div
        style={{
          fontWeight: 700,
          backgroundColor,
          color: textColor,
          padding: 24,
        }}
      >
        Text Color
      </div>
    </Panel>
  );
}
