import { NetworkConfig } from "goddard/dist/@types/NetworkConfig";
import { ChangeEvent, useState } from "react";
import { Panel, PanelPosition } from "reactflow";
import styled from "styled-components";
import { useNetwork } from "../../context/NetworkCtx";
import { DEFAULT_CONFIG, LAYER_DIFF } from "../../data/config";
import { Button, Paper, TextField } from "@mui/material";

const FlexBox = styled("div")`
  display: flex;
  gap: 8px;
  padding-bottom: 16px;
`;
const Input = styled("input")`
  display: block;
`;

export type ConfigControlsProps = {
  position: PanelPosition;
  input: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: (
    config: Pick<
      NetworkConfig,
      "layerSizes" | "maxIterations" | "learningRate" | "errorThreshold"
    >
  ) => void;
};
export default function ConfigControls({
  position,
  input,
  onChangeInput,
  onSave,
}: ConfigControlsProps) {
  const { network } = useNetwork();
  const [updateConfig, setUpdateConfig] = useState<Required<NetworkConfig>>(
    network.config as Required<NetworkConfig>
  );

  const changeLayer = (i: number, size: number) => {
    if (isNaN(size) || size < 2 || size > 15 || !updateConfig.layerSizes[i])
      return;

    let layerSizes = [...updateConfig.layerSizes];
    layerSizes[i] = size;
    setUpdateConfig({ ...updateConfig, layerSizes });
  };

  const handleSubmit = () => {
    onSave(updateConfig);
  };

  return (
    <Panel
      position={position}
      // style={{ backgroundColor: "#fcfcfc", padding: 12, borderRadius: 5 }}
    >
      <Paper elevation={3} style={{ padding: 12 }}>
        <p>Input</p>
        <Input type="color" value={input} onChange={onChangeInput} />
        <p>Layers</p>
        <FlexBox>
          <TextField
            id="input-layer"
            label="Input layer"
            type="number"
            variant="filled"
            value={network.sizes[0]}
            disabled
            fullWidth
          />
          {updateConfig.layerSizes.map((layer, i) => {
            return (
              <TextField
                id={`inner-layer-${i}`}
                label={`Inner layer ${i + 1}`}
                type="number"
                variant="filled"
                value={layer}
                onChange={(e) => changeLayer(i, parseInt(e.target.value))}
                inputProps={{
                  max: DEFAULT_CONFIG.layerSizes[i] + LAYER_DIFF,
                  min: DEFAULT_CONFIG.layerSizes[i] - LAYER_DIFF,
                }}
                fullWidth
              />
            );
          })}
          <TextField
            id="output-layer"
            label="Output layer"
            type="number"
            variant="filled"
            value={network.sizes[network.sizes.length - 1]}
            disabled
            fullWidth
          />
        </FlexBox>
        <Button variant="outlined" onClick={handleSubmit}>
          Rebuild network
        </Button>
      </Paper>
    </Panel>
  );
}
