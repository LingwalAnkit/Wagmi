import "./App.css";
import {
  WagmiProvider,
  useAccount,
  useConnect,
  useConnectors,
  useDisconnect,
} from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallets />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function ConnectWallets() {
  const { connect } = useConnect();
  const { address } = useAccount();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 text-center">
        <p className="text-lg font-semibold text-gray-700">
          Connected: <span className="text-blue-600">{address}</span>
        </p>
        <button
          onClick={() => disconnect()}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4">
        {connectors.map((c) => (
          <button
            key={c.id}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => connect({ connector: c })}
          >
            Connect via {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
