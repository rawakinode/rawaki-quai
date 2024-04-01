import { getShardFromAddress } from "quais/lib/utils";
import { writeWalletConnected } from "./local/walletStorage";
import { getShardAndRPC } from "./Shard";

export const connectPelagus = async () => {
  return window.ethereum
    .request({ method: "quai_requestAccounts" })
    .then(async (accounts) => {
      const shard = getShardFromAddress(accounts[0]);
      console.log(shard);
      const address = {
        shard: shard,
        address: accounts[0],
      };
      await writeWalletConnected(address.address, address.shard, true)
      return address;
    })
    .catch((error) => {
      if (error.code === 4001) {
        return "rejected";
      } else {
        return "failed";
      }
    });
};
