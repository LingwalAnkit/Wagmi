import { http, createConfig, injected } from "wagmi";
import { mainnet } from "viem/chains";

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/"),
  },
});
