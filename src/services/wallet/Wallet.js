// src/services/requestAccounts.js
import { getShardFromAddress } from "quais/lib/utils";
import variables from '../../variables/variable'
import { getShardAndRPC } from "../Shard";
import { setTokenListByShard } from "../Tokenlist";

const store = variables

const updateGlobalVariable = async (a, b, c, d, e, f) => {
  try {
    store.commit("updateGlobal", {
      address: a,
      shard: b,
      zone_index: c,
      zone_name: d,
      rpc: e,
      explorer: f
    })
  } catch (error) {
    console.log(error);
  }
}

const connectWallet = () => {
  return window.ethereum;
};

const checkWalletProvider = () => {
  if (connectWallet()) {
    if (window.ethereum.isMetamask) {
      console.log("metamask detected");
      return "metamask";
    } else {
      console.log("pelagus detected");
      return "pelagus";
    }
  } else {
    return null;
  }
};

const getAccount = async () => {
  try {
    if (checkWalletProvider() == "pelagus") {
      const accountsx = await ethereum.request({
        method: "quai_requestAccounts",
      });
      const currentAccount = accountsx[0];
      const shard = getShardFromAddress(currentAccount);
      const zone = await getShardAndRPC(shard)
      await updateGlobalVariable(currentAccount, shard, zone.zone_index , zone.zone_name, zone.rpc, zone.explorer)
      await setTokenListByShard(zone.zone_name)
      store.commit("updateGlobal", { get_account: true })
      return {
        address: currentAccount,
        shard: shard
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const detectAccountChange = async () => {
  ethereum.on("accountsChanged", async (accounts) => {
     await getAccount()
  })
}

const disconnectWallet = async () => {
  try {
    store.commit("updateGlobal", {
        address: null,
        token_amount_1: '',
        token_amount_2: ''
      })
    console.log("Wallet disconnect.");
  } catch (error) {
    console.error("Failed disconnect:", error);
  }
};

export {
  getAccount,
  checkWalletProvider,
  detectAccountChange,
  disconnectWallet,
}
