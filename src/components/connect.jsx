import { useConnect, useConnectors } from "wagmi";
function ConnectWallets() {
  const { connect } = useConnect();
  const connectors = useConnectors();

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

export default ConnectWallets;
