import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";

function AllowUSDT() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isConnected } = useAccount();

  const [amount, setAmount] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (!amount || isNaN(Number(amount))) return alert("Enter a valid number");

    // Convert amount to smallest unit (USDT has 6 decimals)
    const parsedAmount = BigInt(Math.floor(Number(amount) * 1e6));

    writeContract({
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      abi: [
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "approve",
      // 0x2966473D85A76A190697B5b9b66b769436EFE8e5 this address is allowed to spend parsedAmount from my wallet
      args: ["0x2966473D85A76A190697B5b9b66b769436EFE8e5", parsedAmount],
    });
  }

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white shadow-md rounded-2xl border border-gray-200">
      <form onSubmit={submit} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Approve USDT Spending
        </h2>

        <input
          type="number"
          step="0.000001"
          placeholder="Enter USDT amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isPending || !isConnected}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isPending ? "Approving..." : "Approve"}
        </button>

        {hash && (
          <p className="text-green-600 break-words">
            ✅ Txn Hash:{" "}
            <a
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {hash}
            </a>
          </p>
        )}

        {error && <p className="text-red-600">❌ Error: {error.message}</p>}
      </form>
    </div>
  );
}

export default AllowUSDT;
