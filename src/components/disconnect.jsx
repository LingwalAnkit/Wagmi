import { useAccount, useDisconnect } from "wagmi";
import ConnectWallets from "./connect";
import TotalBalance from "./checkBalance";

function DisconnectWallets() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Connected: <span className="text-blue-600">{address}</span>
          </p>
          <TotalBalance></TotalBalance>
          <button
            onClick={() => disconnect()}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Disconnect
          </button>
        </div>
      </>
    );
  }

  return <ConnectWallets></ConnectWallets>;
}

export default DisconnectWallets;
