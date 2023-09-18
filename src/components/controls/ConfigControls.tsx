import { NetworkConfig } from "goddard/dist/@types/NetworkConfig";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useNetwork } from "../../context/NetworkCtx";

const MAX_LAYER_COUNT = 5;

const Input = styled("input")`
  display: block;
`;

export type ConfigControlsProps = {
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
      layerSizes.push(2);
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
    <>
      <p>Input</p>
      <Input type="color" value={input} onChange={onChangeInput} />
      <p>Layers</p>
      {updateConfig.layerSizes.map((layer, i) => {
        return (
          <>
            <Input
              type="number"
              value={layer}
              onChange={(e) => changeLayer(i, e)}
            />
            <button onClick={removeLayer}>Remove layer</button>
          </>
        );
      })}
      <br />
      {updateConfig.layerSizes.length < MAX_LAYER_COUNT ? (
        <button onClick={addLayer}>Add layer</button>
      ) : (
        <></>
      )}
      <button onClick={handleSubmit}>Save</button>
    </>
  );
}
