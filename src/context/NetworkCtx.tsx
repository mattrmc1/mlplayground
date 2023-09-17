import { NeuralNetwork } from "goddard";
import { NetworkConfig } from "goddard/dist/@types/NetworkConfig";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { createConfig } from "../data/config";
import { training } from "../data/training";

type NetworkContextType = {
  config: NetworkConfig;
  setConfig: (config: Partial<NetworkConfig>) => void;
  network: NeuralNetwork;
};

const NetworkCtx = createContext<NetworkContextType | null>(null);

export const NetworkCtxProvider = ({ children }: PropsWithChildren<{}>) => {
  const [config, setConfig] = useState<Partial<NetworkConfig>>({});

  const network = useMemo(() => {
    const c: NetworkConfig = createConfig(config);
    const network: NeuralNetwork = new NeuralNetwork(c).initialize();
    network.train(training);

    return network;
  }, [config]);

  return (
    <NetworkCtx.Provider value={{ network, config, setConfig }}>
      {children}
    </NetworkCtx.Provider>
  );
};

export const useNetwork = () => {
  const ctx = useContext(NetworkCtx);

  if (ctx === null) {
    throw new Error("Context provider not found");
  }

  return ctx;
};
