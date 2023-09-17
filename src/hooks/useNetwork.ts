import { NeuralNetwork } from "goddard";
import { NetworkConfig } from "goddard/dist/@types/NetworkConfig";
import { useMemo } from "react";
import { createConfig } from "../data/config";
import { training } from "../data/training";

export default function useNetwork() {
  return useMemo(() => {
    const config: NetworkConfig = createConfig({ inputSize: 3, outputSize: 2 });
    const network: NeuralNetwork = new NeuralNetwork(config).initialize();
    network.train(training);

    return network;
  }, []);
}
