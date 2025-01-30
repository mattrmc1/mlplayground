import { NetworkConfig } from "goddard/dist/@types/NetworkConfig";
import { ChangeEvent, useState } from "react";
import { Panel, PanelPosition } from "reactflow";
import styled from "styled-components";
import { useNetwork } from "../../context/NetworkCtx";
import { DEFAULT_CONFIG, LAYER_DIFF } from "../../data/config";

const MAX_LAYER_COUNT = 5;

const FlexBox = styled("div")`
  display: flex;
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

  const addLayer = () => {
    if (updateConfig.layerSizes.length < 5) {
      let layerSizes = [...updateConfig.layerSizes];
      layerSizes.push(3);
      setUpdateConfig({ ...updateConfig, layerSizes });
    }
  };

  const removeLayer = () => {
    if (updateConfig.layerSizes.length > 1) {
      let layerSizes = [...updateConfig.layerSizes];
      layerSizes.pop();
      setUpdateConfig({ ...updateConfig, layerSizes });
    }
  };

  const changeLayer = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
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
    <Panel position={position}>
      <p>Input</p>
      <Input type="color" value={input} onChange={onChangeInput} />
      <p>Layers</p>
      {updateConfig.layerSizes.map((layer, i) => {
        return (
          <FlexBox>
            <Input
              type="number"
              value={layer}
              onChange={(e) => changeLayer(i, e)}
              max={DEFAULT_CONFIG.layerSizes[i] + LAYER_DIFF}
              min={DEFAULT_CONFIG.layerSizes[i] - LAYER_DIFF}
            />
            {false && (
              <button onClick={removeLayer} style={{ marginLeft: 4 }}>
                X
              </button>
            )}
          </FlexBox>
        );
      })}
      {updateConfig.layerSizes.length < MAX_LAYER_COUNT && false ? (
        <button onClick={addLayer}>+</button>
      ) : (
        <></>
      )}
      <br />
      <br />
      <button onClick={handleSubmit}>Train</button>
    </Panel>
  );
}
