import { useReadContract } from "wagmi";

export function TotalBalance() {
  const { data, isLoading } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "totalSupply",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>Total supply - {JSON.stringify(data?.toString())}</div>;
}

export default TotalBalance;
