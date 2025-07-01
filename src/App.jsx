import "./App.css";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DisconnectWallets from "./components/disconnect";
import TotalBalance from "./components/checkBalance";

const client = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <DisconnectWallets />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
