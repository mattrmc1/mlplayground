import { useNetwork } from "../context/NetworkCtx";

export default function Debugger() {
  const { network } = useNetwork();
  return (
    <>
      <button
        onClick={() => console.log(network.activations.map((a) => a.data))}
      >
        Log activations
      </button>
      <button onClick={() => console.log(network.weights.map((w) => w.data))}>
        Log weights
      </button>
      <button onClick={() => console.log(network.biases.map((w) => w.data))}>
        Log biases
      </button>
    </>
  );
}
