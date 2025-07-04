import { useAccount, useReadContract } from "wagmi";

export function MyUSDTBalance() {
  const { address, isConnected } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT on Ethereum
    abi: [
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  if (!isConnected) return <div>Connect your wallet</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formattedBalance = Number(data?.toString()) / 1e6;

  return <div>My USDT Balance: {formattedBalance.toFixed(2)} USDT</div>;
}

export default MyUSDTBalance;
