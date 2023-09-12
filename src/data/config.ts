import { NetworkConfig } from "goddard/dist/@types/NetworkConfig";

export const DEFAULT_CONFIG: Required<NetworkConfig> = {
  inputSize: 3,
  outputSize: 2,
  layerSizes: [2, 12],
  maxIterations: 10000,
  learningRate: 0.1,
  errorThreshold: 0.001,
};

export const createConfig = (
  partialConfig: Partial<NetworkConfig>
): Required<NetworkConfig> => {
  return {
    ...DEFAULT_CONFIG,
    ...partialConfig,
  };
};
